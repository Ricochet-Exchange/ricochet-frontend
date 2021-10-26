import { TextInput } from 'components/common/TextInput';
import React, {
  ChangeEvent,
  FC,
} from 'react';
import { useTranslation } from 'i18n';
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
          <ButtonNew color="primary" onClick={onClickStart} className={styles.start} disabled={isLoading}>
            {t('Start')}
            /
            {t('Edit')}
          </ButtonNew>
        </div>
        <div className={styles.stop_wrap}>
          <ButtonNew color="secondary" onClick={onClickStop} className={styles.stop} disabled={isLoading}>{t('Stop')}</ButtonNew>
        </div>
      </div>
    </div>
  );
};
