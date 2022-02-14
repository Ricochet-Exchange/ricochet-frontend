import React from 'react';
import { truncateAddr } from 'utils/helpers';
import leavePage from '../../../assets/images/leavePage.png';
import styles from './styles.module.scss';

type Props = {
  addressLink?: string;
  address: string;
};

export const AddressLink: React.FC<Props> = ({
  addressLink,
  address,
}) => (
  <a href={addressLink} target="_blank" rel="noreferrer" className={(styles.wrap)}>
    <div className={styles.address_headers}>
      <h4 className={styles.contract_head}>Contract:</h4>
      <h6 className={styles.contract}>{truncateAddr(address)}</h6>
    </div>
    <img src={leavePage} alt="contract-address-button" className={styles.address_link_btn} />
  </a>
);
