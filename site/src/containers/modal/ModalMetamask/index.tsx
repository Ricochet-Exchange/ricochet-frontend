import React from 'react';
import styles from './styles.module.scss';

export const ModalMetamask:React.FC = () => (
  <div className={styles.wrap}>
    <p className={styles.title}>You should install Metamask</p>
    <a 
      href="https://metamask.io/"
      rel="noopener noreferrer"
      className={styles.link}
    >
      https://metamask.io/
    </a>
  </div>
);
