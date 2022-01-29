import { RICAddress } from 'constants/polygon_config';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { MainLayout } from 'containers/MainLayout';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { useCookies } from 'react-cookie';
import React, {
  FC, 
  useEffect,
  useState,
} from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { selectMain } from 'store/main/selectors';
import { Routes } from 'constants/routes';
import { Loader } from '../../components/common/Loader';
import styles from './stylesReferralValidationRedirectPage.module.scss';

interface IProps {}

const thirtyDaysDuration = 30 * 24 * 60 * 60 * 1000;

enum ReferrerValidationStatusTypes {
  Loading,
  Error,
  Valid,
}

const pathnameWithoutReferral = (pathname: string) => {
  const referralWord = Routes.Referral.split('/')[1];
  const pathnameParts = pathname.split('/');
  const index = pathnameParts.findIndex((each) => each === referralWord);
  return pathnameParts.slice(0, index).join('/');
};

const ReferralValidationRedirectPage: FC<IProps> = () => {
  const {
    address,
    balances,
    isReadOnly,
  } = useShallowSelector(selectMain);

  const [
    referrerVilidationStatus, 
    setRererrerValidationStatus,
  ] = useState(ReferrerValidationStatusTypes.Loading);
  const { referralId } = useParams<{ referralId: string }>();
  const referralIdMax32Bytes = new Blob([referralId]).size <= 32;
  const location = useLocation();
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['referralId']);
  useEffect(() => {
    // check contract that this referralId is valid and redirect
    if (referralId && referralIdMax32Bytes) {
      setTimeout(() => {
        setRererrerValidationStatus(ReferrerValidationStatusTypes.Valid);
        const expires = new Date(new Date().getTime() + thirtyDaysDuration);
        setCookie('referralId', referralId, { path: '/', expires });
        history.push(pathnameWithoutReferral(location.pathname));
      }, 5000);
    } else {
      setRererrerValidationStatus(ReferrerValidationStatusTypes.Error);
    }
  }, [referralId]);

  return (
    <MainLayout>
      <div className={styles.header}>
        <HeaderContainer isReadOnly={isReadOnly} balance={balances && balances[RICAddress]} address={address || 'Connecting'} />
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
        </div>
      </div>
      
    </MainLayout>
  );
};

export default ReferralValidationRedirectPage;
