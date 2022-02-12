import { rexReferralAddress, RICAddress } from 'constants/polygon_config';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { MainLayout } from 'containers/MainLayout';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { useCookies } from 'react-cookie';
import React, { FC, useEffect, useState } from 'react';
import { getContract } from 'utils/getContract';
import { referralABI } from 'constants/abis';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { selectMain } from 'store/main/selectors';
import { REFERRAL_URL_PREFIX } from 'constants/routes';
import { Loader } from '../../components/common/Loader';
import styles from './stylesReferralValidationRedirectPage.module.scss';

interface IProps {}

const thirtyDaysDuration = 30 * 24 * 60 * 60 * 1000;

enum ReferrerValidationStatusTypes {
  Loading,
  Error,
  NotExisting,
  Valid,
}

const pathnameWithoutReferral = (pathname: string) => {
  const referralWord = REFERRAL_URL_PREFIX;
  const pathnameParts = pathname.split('/');
  const index = pathnameParts.findIndex((each) => each === referralWord);
  return pathnameParts.slice(0, index).join('/');
};

const ReferralValidationRedirectPage: FC<IProps> = () => {
  const {
    address,
    balances,
    web3,
  } = useShallowSelector(selectMain);

  const [
    referrerVilidationStatus, 
    setRererrerValidationStatus,
  ] = useState(ReferrerValidationStatusTypes.Loading);
  const { referralId } = useParams<{ referralId: string }>();
  const referralIdMax32Bytes = new Blob([referralId]).size <= 32;
  const location = useLocation();
  const history = useHistory();
  const contract = getContract(rexReferralAddress, referralABI, web3);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['referralId']);
  useEffect(() => {
    // check contract that this referralId is valid and redirect
    if (referralId && referralIdMax32Bytes && web3 && web3.currentProvider) {
      contract.methods.affiliateIdToAffiliate(referralId).call()
        .then((affiliateId: string) => contract.methods.affiliates(affiliateId).call())
        .then((res: any) => {
          if (web3.utils.toBN(res.addr).isZero()) {
            setRererrerValidationStatus(ReferrerValidationStatusTypes.NotExisting);
            return;
          } 
          
          if (res.enabled === false) {
            setRererrerValidationStatus(ReferrerValidationStatusTypes.Error);
            return;
          }

          setRererrerValidationStatus(ReferrerValidationStatusTypes.Valid);
          const expires = new Date(new Date().getTime() + thirtyDaysDuration);
          setCookie('referralId', referralId, { path: '/', expires });
          history.push(pathnameWithoutReferral(location.pathname));
        })
        .catch(() => {
          setRererrerValidationStatus(ReferrerValidationStatusTypes.Error);
        });
    }
  }, [referralId, web3]);

  return (
    <MainLayout>
      <div className={styles.header}>
        <HeaderContainer balance={balances && balances[RICAddress]} address={address || 'Connecting'} />
      </div>
      <div className={styles.content}>
        <div className={styles.inner_content}>
          {referrerVilidationStatus === ReferrerValidationStatusTypes.Loading && (
          <>
            <Loader size={128} loaderColor="#363B55" />
            <div>Validating this referral</div>
          </>
          )}
          {referrerVilidationStatus === ReferrerValidationStatusTypes.Error && (
          <>
            <div>Error during validation of this referral id</div>
          </>
          )}
          {referrerVilidationStatus === ReferrerValidationStatusTypes.NotExisting && (
          <>
            <div>This referral id does not exist</div>
          </>
          )}
        </div>
      </div>
      
    </MainLayout>
  );
};

export default ReferralValidationRedirectPage;
