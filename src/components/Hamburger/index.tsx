/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './styles.module.scss';

type Props = {
  open?: boolean;
  setOpen?: any;
};

export const Hamburger: React.FC<Props> = ({ open, setOpen }) => (

  <div id={styles.hamburger_icon} className={`${open ? styles.active : ''}`} onClick={() => { setOpen(!open); }} key="menu">
    <span className={`${styles.line} ${styles.line_1} `} />
    <span className={`${styles.line} ${styles.line_2} `} />
    <span className={`${styles.line} ${styles.line_3} `} />
  </div>
);
