import React from "react";
import styles from './styles.module.scss';
import { DisplayContracts } from 'constants/DisplayContracts';


export const ContractTableRow = () => {
    return (
        <div className={styles.contract_table_container}>
            {DisplayContracts.map((subject, i) => {
                return <div className={styles.table}>
                    <h2 className={styles.main_header}>{subject.main_header}</h2>

                    <div className={styles.contract_table}>
                        <div className={styles.contract_row}> 
                            <h3 className={styles.column_title}>{subject.column1}</h3> 
                            <h3 className={styles.column_title}>{subject.column2}</h3>
                        </div>
                        {subject.contracts.map((contract, n) => {
                            return <div className={styles.contract_row}> 
                                <h3 className={styles.column_title}>{contract[0]}</h3> 
                                <a className={styles.contract_link_wrapper} href={`https://www.polygonscan.com/address/${contract[1]}`} target="_blank"><h3>{contract[1]}</h3></a>
                            </div>
                        })}
                    </div>
                
                </div>
            })}
        </div>
    )
}

