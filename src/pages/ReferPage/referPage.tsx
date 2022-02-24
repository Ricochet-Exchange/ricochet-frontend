import React, { FC } from 'react';
import { ReferContainer } from 'containers/main/ReferContainer';
import styles from './stylesReferPage.module.scss';

interface IProps {}

const ReferPage: FC<IProps> = () => (
  <div className={styles.content}>
    <ReferContainer />
  </div>
);

export default ReferPage;
