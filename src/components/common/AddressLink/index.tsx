import React from 'react';
import leavePage from '../../../assets/images/leavePage.png';
import styles from './styles.module.scss';

type Props = {
  addressLink?: string;
};

export const AddressLink: React.FC<Props> = ({
  addressLink,
}) => (
  <a href={addressLink} target="_blank" rel="noreferrer" className={(styles.wrap)}>
    <img src={leavePage} alt="contract-address-button" className={styles.address_link_btn} />
  </a>
);
