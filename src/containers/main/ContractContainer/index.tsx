import React from "react";
import { ContractTableRow } from "components/layout/ContractTableRow";
import styles from './styles.module.scss';

export const ContractContainer = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.main_header}>Network Directory</h1>
            <h5 className={styles.small_header}>Contract addresses on Polygon and more</h5>
            <hr />
            <ContractTableRow />
        </div>
    )
}