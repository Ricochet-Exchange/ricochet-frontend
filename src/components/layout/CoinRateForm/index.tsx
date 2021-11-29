import { TextInput } from 'components/common/TextInput';
import React, {
  ChangeEvent,
  FC,
} from 'react';
import { useTranslation } from 'i18n';
import ReactTooltip from 'react-tooltip';
import ButtonNew from '../../common/ButtonNew';
import { Coin } from '../../../constants/coins';
import styles from './styles.module.scss';

interface IProps {
  value: string,
  placeholder?: string,
  onChange: (e:ChangeEvent<HTMLInputElement>) => void,
  onClickStart: () => void,
  onClickStop: () => void,
  coin: Coin;
  isLoading?: boolean;
}

export const CoinRateForm: FC<IProps> = ({
  value, onChange, onClickStart, onClickStop, placeholder, coin, isLoading,
}) => {
  const { t } = useTranslation('main');
  // Security Deposit is 4 hours worth of stream, so (4*60*60)/(30*24*60*60) = 1/180
  return (
    <div className={styles.input_container}>
      <div className={styles.input_wrap}>
        <TextInput
          value={value}
          className={styles.input}
          onChange={onChange} 
          containerClassName={styles.container_input} 
          placeholder={placeholder}
          right={<div className={styles.right}>{`${coin}x/mo.`}</div>}
          type="number"
        />
      </div>
      <div className={styles.buttons}>
        <div className={styles.start_wrap}>
          <ButtonNew color="primary" onClick={onClickStart} className={styles.start} disabled={isLoading} data-tip data-for="depositTooltip">
            {t('Start')}
            /
            {t('Edit')}
          </ButtonNew>
        </div>
        <div className={styles.stop_wrap}>
          <ButtonNew color="secondary" onClick={onClickStop} className={styles.stop} disabled={isLoading}>{t('Stop')}</ButtonNew>
        </div>
        <div style={{ flexBasis: '100%', height: '0' }}> </div>

        { parseFloat(value) > 0 ? (
          <ReactTooltip 
            id="depositTooltip" 
            place="right" 
            effect="solid" 
            multiline
            className={styles.depositTooltip}
          >
            <span
              className={styles.depositTooltip_span}
            >
              Starting this stream will take a security deposit of 
              <span style={{ fontWeight: 700 }}> 
                {` ${(parseFloat(value) / 180.0).toFixed(2)} ${coin} `}
              </span>
              from your balance. 
              The Deposit will be refunded in full when you close the stream or lost if 
              your balance hits zero with the stream still open.

            </span> 
          </ReactTooltip>
        )
          : null }
        <div />
      </div>
    </div>
  );
};
