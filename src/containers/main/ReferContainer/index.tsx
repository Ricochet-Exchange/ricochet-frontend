import React, { ChangeEvent, useState, useEffect } from 'react';
import { TextInput } from 'components/common/TextInput';
import { useLang } from 'hooks/useLang';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { InvestNav } from 'components/layout/InvestNav';
import {
  rexReferralAddress,
} from 'constants/polygon_config';
import { getContract } from 'utils/getContract';
import { referralABI } from 'constants/abis';
import ButtonNew from '../../../components/common/ButtonNew';
import styles from './styles.module.scss';

interface IProps { }

const AFFILIATE_URL_PREFIX = 'app.ricochet.exchange/ref/';

export const ReferContainer: React.FC<IProps> = () => {
  const { t } = useLang();
  const { address, isReadOnly } = useShallowSelector(selectMain);
  const {
    web3,
  } = useShallowSelector(selectMain);
  const contract = getContract(rexReferralAddress, referralABI, web3);

  const validations = (input: string) => {
    const criteria: [boolean, string][] = [
      [new Blob([input]).size <= 32, t('Cannot be larger than 32 characters (Some characters count as 2)')],
      [input.length > 1, t('Must be at least 2 characters')],
    ];
    return criteria;
  };

  const filterValidationErrors = (validationResults: [boolean, string][]): string[] => 
    validationResults.reduce<string[]>((acc: string[], each) => {
      if (each[0] === false) {
        return [...acc, each[1]];
      }
      return acc;
    }, []);

  type Status = 'inactive' | 'registering' | 'awaitingVerification' | 'enabled' | undefined;

  const [currentReferralId, setCurrentReferralId] = useState<string | undefined>();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [referredBy, setReferredBy] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    setCurrentReferralId(address.toLowerCase().slice(0, 10));
  }, [address]);

  useEffect(() => {
    if (address && contract) {
      contract.methods
        .customerToAffiliate(address.toLowerCase())
        .call().then((affiliate: string) => {
          if (affiliate !== '0') {
            setReferredBy(affiliate);
          }
        });
    }
  }, [address, contract]);

  useEffect(() => {
    if (address && contract) {
      contract.methods.addressToAffiliate(address.toLowerCase()).call()
        .then((affiliateId: string) => contract.methods.affiliates(affiliateId).call())
        .then((res: any) => {
          if (web3.utils.toBN(res.addr).isZero()) {
            setStatus('inactive');
            return;
          } 
          
          if (res.enabled === false) {
            setStatus('awaitingVerification');
            return;
          }

          if (filterValidationErrors(validations(res.id)).length === 0) {
            setCurrentReferralId(res.id);
            setStatus('enabled');
          }
        });
    }
  }, [address]);

  useEffect(() => {
    if (status === 'registering' && address && contract) {
      const interval = setInterval(() => {
        contract.methods.addressToAffiliate(address.toLowerCase()).call()
          .then((affiliateId: string) => contract.methods.affiliates(affiliateId).call())
          .then((res: any) => {
            if (web3.utils.toBN(res.addr).isZero()) {
              return;
            }

            if (res.enabled === false) {
              setStatus('awaitingVerification');
              return;
            }

            if (filterValidationErrors(validations(res.id)).length === 0) {
              setCurrentReferralId(res.id);
              setStatus('enabled');
            }
          });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleReferralId = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentReferralId(value);
    const validationResults = validations(value);
    setValidationErrors(
      filterValidationErrors(validationResults),
    );
  };

  const handleRegister = () => {
    contract.methods
      .applyForAffiliate(currentReferralId, currentReferralId)
      .call()
      .then(() => setStatus('registering'))
      .then(() => contract.methods
        .applyForAffiliate(currentReferralId, currentReferralId)
        .send({ from: address }))
      .catch((err: Error) => { 
        setStatus('inactive');
        setValidationErrors([
          'Error registering this url: possible duplicate. Please try another url',
        ]);
        console.error(err);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${AFFILIATE_URL_PREFIX}${currentReferralId}`).catch();
  };

  if (isReadOnly || !address) {
    return (
      <div className={styles.container}>
        <div>{t('You have to connect your wallet to be able to create referrals')}</div>
      </div>
    );
  }

  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.container}>
        <div>
          {referredBy ? (
            <span>
              {t('You have been referred with ❤️ by ')} 
              {referredBy}
            </span>
          ) : (
            <span>
              {t('You haven\'t been referred by anyone. 🥒 Organic FTW!')} 
            </span>
          )}
          <div className={styles.explainer_container}>
            <p>
              <strong>V0 BETA</strong>
              {' '}
              Ricochet Referral system is in BETA. Apply to refer your friends and receive a % 
              of fees that Ricochet Exchange charges. 
              Becoming an affiliate currently requires manual verification.
              Any links you register can stop working suddenly and without any 
              prior notice when we upgrade versions. 
              We cannot guarantee that referrals will be applied correctly.
            </p>
          </div>
        </div>
        {(status === 'inactive' || status === 'registering') && (
        <div className={styles.input_wrap}>
          <p>Customise your referral url</p>
          <TextInput
            value={currentReferralId}
            placeholder={t('Your new referral id')}
            onChange={handleReferralId}
            className={styles.input}
            containerClassName={styles.container_input}
            left={(
              <div className={styles.hint}>
                {AFFILIATE_URL_PREFIX}
              </div>
            )}
          />
          <div className={styles.validation_errors}>
            {validationErrors.map((each) => <p key={each}>{each}</p>)}
          </div>
          <div className={styles.register_wrap}>
            <ButtonNew
              color="primary"
              loaderColor="#363B55"
              disabled={validationErrors.length > 0}
              isLoading={status === 'registering'}
              onClick={handleRegister}
              className={styles.register}
            >
              {t('Register')}
            </ButtonNew>
          </div>
        </div>
        )}

        {status === 'awaitingVerification' && (
        <div>
          <p>
            {t('Awaiting verification. Come back later or ping us on our discord: ')}
            <a className={styles.black} href="https://discord.gg/mss4t2ED3y" target="_blank" rel="noreferrer">https://discord.gg/mss4t2ED3y</a>
          </p>
        </div>
        )}

        {status === 'enabled' && (
        <div className={styles.input_wrap}>
          <TextInput
            readOnly
            value={`${AFFILIATE_URL_PREFIX}${currentReferralId}`}
            className={styles.input_static}
            containerClassName={styles.container_input}
            right={<button className={styles.button_as_text} onClick={handleCopy}>copy</button>}
          />
        </div>
        )}
      </div>
    </div>
  );
};
