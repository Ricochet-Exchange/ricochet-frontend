import React, { FC } from 'react';
// import { useTranslation } from 'i18n';
// import { generateDate } from 'utils/generateDate';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import { format } from 'date-fns';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.scss';
import { Distribution } from '../../../store/distributions/types';
import { truncateAddr } from '../../../utils/helpers';
import { AddressLink } from '../../../components/common/AddressLink';
import { getAddressLink } from '../../../utils/getAddressLink';
import { Coin, iconsCoin } from '../../../constants/coins';
import calculatePoolPercentage from '../utils/calculatePoolPercentage';
import calculateAmountReceived from '../utils/calculateAmountReceived';
import subscribe from '../utils/subscribe';
import unsubscribe from '../utils/unsubscribe';
import { useShallowSelector } from '../../../hooks/useShallowSelector';
import { selectMain } from '../../../store/main/selectors';
import { useLang } from '../../../hooks/useLang';
import { showErrorToast, showSuccessToast, showToast } from '../../../components/common/Toaster';

TimeAgo.addDefaultLocale(en);

interface IProps {
  distribution?:Distribution
  coingeckoPrice?: number
  isLoading: boolean
}

export const DistributionPanel: FC<IProps> = ({ distribution, coingeckoPrice = 0, isLoading }) => {
  const {
    web3,
  } = useShallowSelector(selectMain);
  const { t } = useLang();

  const transformError = (e?: any) => {
    if (e?.data?.error) {
      return e.data.error;
    }
    if (e.code === 4001) {
      return e?.message;
    }
    if (e.code === -32603) {
      return e.data?.message;
    }
    return t('Operation failed. Refresh the page or try again later.');
  };

  const getSubscribeLinkComponent = (_distribution: Distribution, isMobile:boolean) => (
    <div
      tabIndex={0}
      role="button"
      className={isMobile ? styles.subscribedSmallDevice : styles.subscribed}
      onClick={() => _distribution && subscribe(web3,
        _distribution.token,
        _distribution.indexId,
        _distribution.publisher,
        _distribution.subscriber,
        (args:string) => showToast(args, 'info'),
        (args:string) => showSuccessToast(args, 'Success'),
        (args:any) => showErrorToast(args.message, 'Error'))}
      onKeyDown={() => 0}
    >
      {t('Subscribe')}
    </div>
  );

  const getUnsubscribeLinkComponent = (_distribution: Distribution, isMobile:boolean) => (
    <div
      className={isMobile ? styles.unsubscribedSmallDevice : styles.unsubscribed}
      tabIndex={0}
      role="button"
      onClick={() => _distribution && unsubscribe(web3,
        _distribution?.token,
        _distribution?.indexId,
        _distribution?.publisher,
        _distribution?.subscriber,
        (args:string) => showToast(args, 'info'),
        (args:string) => showSuccessToast(args, 'Success'),
        (args:any) => showErrorToast(transformError(args), 'Error'))}
      onKeyDown={() => 0}
    >
      {t('Unsubscribe')}
    </div>
  );

  return (
    <>
      <section className={styles.panel}>
        <div role="presentation">
          <div className={styles.container}>
            <div className={styles.mobile}>
              <div className={styles.columns}>
                <div className={styles.column}>
                  <div className={styles.header}>
                    {t('PUBLISHER')}
                    {' '}
                    :
                  </div>
                  {isLoading ? <Skeleton width={100} /> : (
                    <div>
                      <div className={styles.column}>
                        <span className={styles.contract}>
                          {distribution?.publisher && truncateAddr(distribution?.publisher)}
                        </span>
                        <span className={styles.externalLink}>
                          <AddressLink
                            size={14}
                            addressLink={
                            distribution?.publisher && getAddressLink(distribution?.publisher)
}
                          />
                        </span>
                      </div>
                      {!distribution?.approved ? (
                        distribution && getSubscribeLinkComponent(distribution, false)
                      ) : (
                        distribution && getUnsubscribeLinkComponent(distribution, false)
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.column}>
                  <div className={styles.header}>
                    {t('TOKEN')}
                    {' '}
                    :
                  </div>
                  {isLoading ? <Skeleton width={100} /> : (
                    <>
                      <img
                        src={
                        iconsCoin[distribution?.symbol as Coin]
}
                        alt={distribution?.symbol}
                      />
                      <span className={styles.contract}>
                        {distribution?.symbol}
                      </span>
                    </>
                  )}
                </div>
                <div className={styles.column}>
                  <div className={styles.header}>
                    {t('STARTED ON')}
                    {' '}
                    :
                  </div>
                  {isLoading ? <Skeleton width={100} /> : (
                    <span className={styles.contract}>
                      {distribution && format(new Date(distribution?.createdAtTimestamp * 1000), 'dd MMM yyyy')}
                    </span>
                  )}
                </div>
                <div className={styles.column}>
                  <div className={styles.header}>
                    {t('POOL %')}
                    {' '}
                    :
                  </div>
                  {isLoading || !distribution ? <Skeleton width={100} /> : (
                    <span className={styles.contract}>
                      {`${calculatePoolPercentage(
                        new Decimal(distribution?.indexTotalUnits),
                        new Decimal(distribution?.units),
                      ).toFixed(2)}%`}
                    </span>
                  )}
                </div>
                <div className={styles.column}>
                  <div className={styles.header}>
                    {t('LAST DISTRIBUTION DATE')}
                    {' '}
                    :
                  </div>
                  {isLoading || !distribution ? <Skeleton width={100} /> : (
                    <span className={styles.contract}>
                      <ReactTimeAgo date={new Date(distribution?.updatedAtTimestamp * 1000)} />
                    </span>
                  )}
                </div>
                <div className={styles.column}>
                  <div className={styles.header}>
                    {t('DISTRIBUTION RECEIVED SO FAR')}
                    {' '}
                    :
                  </div>
                  {isLoading || !distribution ? <Skeleton width={100} /> : (
                    <div>
                      <div className={styles.column}>
                        <span className={styles.contract}>
                          {new Decimal(calculateAmountReceived(
                            BigNumber.from(distribution?.indexValueCurrent),
                            BigNumber.from(distribution?.totalAmountReceivedUntilUpdatedAt),
                            BigNumber.from(distribution?.indexValueUntilUpdatedAt),
                            BigNumber.from(distribution?.units),
                          )).toFixed(8)}
                        </span>
                        <span>
                          {distribution?.symbol}
                        </span>
                      </div>

                      <div>
                        { `$${new Decimal((parseFloat(calculateAmountReceived(
                          BigNumber.from(distribution?.indexValueCurrent),
                          BigNumber.from(distribution?.totalAmountReceivedUntilUpdatedAt),
                          BigNumber.from(distribution?.indexValueUntilUpdatedAt),
                          BigNumber.from(distribution?.units),
                        ) as string) * coingeckoPrice)).toFixed(8)}`}
                      </div>
                    </div>
                  )}

                </div>
                {!isLoading && (
                <div className={styles.columnMobile}>
                  <span className={styles.contract}>
                    {!distribution?.approved ? (
                      distribution && getSubscribeLinkComponent(distribution, true)
                    ) : (
                      distribution && getUnsubscribeLinkComponent(distribution, true)
                    )}
                  </span>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
