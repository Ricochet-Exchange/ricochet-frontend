import React from 'react';
import { ContractTables } from 'components/layout/ContractTables';
import styles from './styles.module.scss';

export const ContractContainer = () => (
  (
    <div className={styles.cont_container}>
      <h1 className={styles.main_header}>Network Directory</h1>
      <h5 className={styles.small_header}>Contract addresses on Polygon and more</h5>
      <hr />
      <ContractTables />
    </div>
  )
);
