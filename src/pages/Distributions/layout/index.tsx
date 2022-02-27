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
import { transformError } from '../../../utils/transformError';
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
                        <div
                          tabIndex={0}
                          role="button"
                          className={styles.subscribed}
                          onClick={() => distribution && subscribe(web3,
                            distribution?.token,
                            distribution?.indexId,
                            distribution?.publisher,
                            distribution?.subscriber,
                            (args:any) => showToast(args, 'info'),
                            () => showSuccessToast('Successfully completed', 'success'),
                            (args:any) => showErrorToast(transformError(args), 'Error'))}
                          onKeyDown={() =>
                            distribution && subscribe(web3,
                              distribution?.token,
                              distribution?.indexId,
                              distribution?.publisher,
                              distribution?.subscriber,
                              (args:any) => showToast(args, 'info'),
                              () => showSuccessToast('Successfully completed', 'success'),
                              (args:any) => showErrorToast(transformError(args), 'Error'))}
                        >
                          {t('Subscribe')}
                        </div>
                      ) : (
                        <div
                          className={styles.unsubscribed}
                          tabIndex={0}
                          role="button"
                          onClick={() =>
                            distribution && unsubscribe(web3,
                              distribution?.token,
                              distribution?.indexId,
                              distribution?.publisher,
                              distribution?.subscriber,
                              (args:any) => showToast(args, 'info'),
                              () => showSuccessToast('Successfully completed', 'success'),
                              (args:any) => showErrorToast(transformError(args), 'Error'))}
                          onKeyDown={() => distribution && unsubscribe(
                            web3,
                            distribution?.token,
                            distribution?.indexId,
                            distribution?.publisher,
                            distribution?.subscriber,
                            (args:any) => showToast(args, 'info'),
                            () => showSuccessToast('Successfully completed', 'success'),
                            (args:any) => showErrorToast(transformError(args), 'Error'),
                          )}
                        >
                          {t('Unsubscribe')}
                        </div>
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
                      <div
                        tabIndex={0}
                        role="button"
                        className={styles.subscribedSmallDevice}
                        onClick={() => distribution && subscribe(web3,
                          distribution?.token,
                          distribution?.indexId,
                          distribution?.publisher,
                          distribution?.subscriber,
                          (args:any) => showToast(args, 'info'),
                          () => showSuccessToast('Successfully completed', 'success'),
                          (args:any) => showErrorToast(transformError(args), 'Error'))}
                        onKeyDown={() => distribution && subscribe(web3,
                          distribution?.token,
                          distribution?.indexId,
                          distribution?.publisher,
                          distribution?.subscriber,
                          (args:any) => showToast(args, 'info'),
                          () => showSuccessToast('Successfully completed', 'success'),
                          (args:any) => showErrorToast(transformError(args), 'Error'))}
                      >
                        {t('Subscribe')}
                      </div>
                    ) : (
                      <div
                        className={styles.unsubscribedSmallDevice}
                        tabIndex={0}
                        role="button"
                        onClick={() => distribution && unsubscribe(web3,
                          distribution?.token,
                          distribution?.indexId,
                          distribution?.publisher,
                          distribution?.subscriber,
                          (args:any) => showToast(args, 'info'),
                          () => showSuccessToast('Successfully completed', 'success'),
                          (args:any) => showErrorToast(transformError(args), 'Error'))}
                        onKeyDown={() => distribution && unsubscribe(web3,
                          distribution?.token,
                          distribution?.indexId,
                          distribution?.publisher,
                          distribution?.subscriber,
                          (args:any) => showToast(args, 'info'),
                          () => showSuccessToast('Successfully completed', 'success'),
                          (args:any) => showErrorToast(transformError(args), 'Error'))}
                      >
                        {t('Unsubscribe')}
                      </div>
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
