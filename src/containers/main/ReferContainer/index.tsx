import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

interface IProps { }

export const ReferContainer: React.FC<IProps> = () => (
  <div className={styles.container}>
    <div>
      <span>You have been referred with</span>
      <FontIcon name={FontIconName.User} className={styles.crimson} size={16} />
      <span>by 0xFA453...</span>
    </div>
    <div>Input</div>
  </div>
);
