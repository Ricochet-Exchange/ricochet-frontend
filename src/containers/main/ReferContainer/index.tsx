import React, { ChangeEvent, useState, useEffect } from 'react';
import { TextInput } from 'components/common/TextInput';
import { useLang } from 'hooks/useLang';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import {
  rexReferralAddress,
} from 'constants/polygon_config';
import { getContract } from 'utils/getContract';
import { referralABI } from 'constants/abis';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import ButtonNew from '../../../components/common/ButtonNew';
import styles from './styles.module.scss';

interface IProps { }

export const ReferContainer: React.FC<IProps> = () => {
  const { t } = useLang();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address, isReadOnly } = useShallowSelector(selectMain);
  // we could prefill this for the user either trying to fit 
  // their ENS name or trim their address utoo 32 chars.
  const [currentReferralId, setCurrentReferralId] = useState<string | undefined>();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    console.log(address);
    setCurrentReferralId(address.toLowerCase().slice(0, 10));
  }, [address]);

  useEffect(() => {
    // getting the affilitae that has referred current account
    // const contract = getContract(rexReferralAddress, referralABI);
    // contract.methods.getAffiliateAddress(address).call().then(console.log());
  }, [address]);

  const validations = (input: string) => {
    const criteria: [boolean, string][] = [
      [new Blob([input]).size <= 32, t('Cannot be larger than 32 characters (Some characters count as 2)')],
      [input.length > 1, t('Must be at least 2 characters')],
    ];
    return criteria;
  };

  const handleReferralId = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentReferralId(value);
    const validationResults = validations(value);
    setValidationErrors(
      validationResults.reduce<string[]>((acc: string[], each) => {
        if (each[0] === false) {
          return [...acc, each[1]];
        }
        return acc;
      }, []),
    );
  };

  if (isReadOnly || !address) {
    return (
      <div className={styles.container}>
        <div>{t('You have to connect your wallet to be able to create and see your referrals')}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <span>{t('You have been referred with ❤️')}</span>
        {/* <FontIcon name={FontIconName.User} className={styles.crimson} size={16} /> */}
        <span>by 0xFA453...</span>
      </div>
      <div className={styles.input_wrap}>
        <TextInput
          value={currentReferralId}
          placeholder={t('Your new referral id')}
          onChange={handleReferralId}
          className={styles.input}
          containerClassName={styles.container_input}
          left={(
            <div className={styles.hint}>
              app.ricochet.exchange/ref/
            </div>
)}
        />
        <div>
          Validation errors go here
          {' '}
          {JSON.stringify(validationErrors)}
        </div>
        <p>Explainer about how referring works</p>
        <div className={styles.register_wrap}>
          <ButtonNew
            color="primary"
            loaderColor="#363B55"
            disabled={validationErrors.length > 0}
            isLoading={false}
            onClick={console.log}
            className={styles.register}
          >
            {t('Register')}
          </ButtonNew>
        </div>
      </div>
      
    </div>
  );
};
