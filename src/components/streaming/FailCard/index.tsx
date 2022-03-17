import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { Routes } from 'constants/routes';
import styles from './styles.module.scss';

export default function FailCard() {
  return (
    <div className={styles.fail_wrapper}>
      <h3 className={styles.result}>
        Your stream could not be created, 
        you can check if you have an open stream in the Activity Page.
      </h3>
      <NavLink
        className={styles.nav_link}
        exact
        to={Routes.RecentActivity}
      >
        <FontIcon name={FontIconName.Activity} size={16} />
        <div className={styles.nav_text}>Activity</div>
      </NavLink>
     
    </div>
  );
}
