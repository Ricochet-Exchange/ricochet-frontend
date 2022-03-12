import React, { FC } from 'react';
import styles from './styles.module.scss';

export const EmptyPage: FC<{}> = () => <div className={styles.empty_page}>No Result Found</div>;
