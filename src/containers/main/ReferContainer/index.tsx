import React, { ChangeEvent } from 'react';
import { TextInput } from 'components/common/TextInput';
import { useLang } from 'hooks/useLang';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import ButtonNew from '../../../components/common/ButtonNew';
import styles from './styles.module.scss';

interface IProps { }

export const ReferContainer: React.FC<IProps> = () => {
  const { t } = useLang();
  const handleReferralId = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  };
  return (
    <div className={styles.container}>
      <div>
        <span>You have been referred with ❤️</span>
        {/* <FontIcon name={FontIconName.User} className={styles.crimson} size={16} /> */}
        <span>by 0xFA453...</span>
      </div>
      <div className={styles.input_wrap}>
        <TextInput
          placeholder={t('Create referral id')}
          onChange={handleReferralId}
          className={styles.input}
          containerClassName={styles.container_input}
          left={<div className={styles.hint}>app.ricochet.exchange/ref/</div>}
        />
        <p>Explainer about how referring works</p>
        <div className={styles.register_wrap}>
          <ButtonNew
            color="primary"
            loaderColor="#363B55"
            disabled={false}
            isLoading={false}
            onClick={console.log}
            className={styles.register}
          >
            Register
          </ButtonNew>
        </div>
      </div>
      
    </div>
  );
};
