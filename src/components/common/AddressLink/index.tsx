import React from 'react';
import { FontIcon, FontIconName } from '../FontIcon';
import styles from './styles.module.scss';

type Props = {
  addressLink?: string;
};

export const AddressLink: React.FC<Props> = ({
  addressLink,
}) => (
  <a href={addressLink} target="_blank" rel="noreferrer" className={styles.wrap}>
    <FontIcon name={FontIconName.External} size={16} />
  </a>
);
