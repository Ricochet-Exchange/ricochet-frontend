import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { NavLink } from 'react-router-dom';
import { Routes } from 'constants/routes';
import Link from 'components/common/Link';
import { useTranslation } from 'react-i18next';
import currency from 'assets/images/coins/currency.svg';
import styles from './styles.module.scss';

const TUTORIAL_LINK = 'https://docs.ricochet.exchange/tutorial/using-the-dapp';
const RICOCHET_V1_LINK = 'https://v1.ricochet.exchange/';

export const InvestNav = () => {
	const { t } = useTranslation();
	return (
		<div className={styles.nav_container}>
			<NavLink
				className={styles.nav_link}
				exact
				activeClassName={styles.nav_link_active}
				to={Routes.InvestStreams}
			>
				<FontIcon name={FontIconName.RicoUser} size={16} />
				<div className={styles.nav_text}>{t('Streams')}</div>
			</NavLink>

			<Link to={Routes.Wallet} className={styles.nav_link_desktop_only} activeClassName={styles.nav_link_active}>
				<FontIcon name={FontIconName.Wallet} size={16} />
				<div className={styles.nav_text}>{t('Wallet')}</div>
			</Link>

			<NavLink className={styles.nav_link} exact activeClassName={styles.nav_link_active} to={Routes.Invest}>
				<FontIcon name={FontIconName.Swap} size={16} />
				<div className={styles.nav_text}>{t('Market')}</div>
			</NavLink>

			{/* <NavLink */}
			{/*  className={styles.nav_link} */}
			{/*  activeClassName={styles.nav_link_active} */}
			{/*  to={Routes.InvestLiquidityMarkets} */}
			{/* > */}
			{/*  <FontIcon name={FontIconName.Loop} size={16} /> */}
			{/*  <div className={styles.nav_text}>LP</div> */}
			{/* </NavLink> */}

			<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to={Routes.InvestLaunchpads}>
				<FontIcon name={FontIconName.Shuttle} size={16} />
				<div className={styles.nav_text}>{t('Launchpad')}</div>
			</NavLink>
			<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to={Routes.Distributions}>
				<FontIcon name={FontIconName.Distribution} size={16} />
				<div className={styles.nav_text}>{t('Distributions')}</div>
			</NavLink>

			{/*<NavLink
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
        to={Routes.Banks}
      >
        <FontIcon name={FontIconName.Bank} size={16} />
        <div className={styles.nav_text}>{t('Banks')}</div>
      </NavLink>*/}

			{/*<NavLink
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
        to={Routes.Vaults}
      >
        <FontIcon name={FontIconName.Lock} size={16} />
        <div className={styles.nav_text}>{t('Vault')}</div>
    </NavLink>*/}

			<NavLink
				to={Routes.Refer}
				className={styles.nav_link_desktop_only}
				activeClassName={styles.nav_link_active}
			>
				<FontIcon name={FontIconName.Refer} size={16} />
				<div className={styles.nav_text}>{t('Refer')}</div>
			</NavLink>

			<NavLink
				className={styles.nav_link}
				exact
				to={Routes.RecentActivity}
				activeClassName={styles.nav_link_active}
			>
				<FontIcon name={FontIconName.Activity} size={16} />
				<div className={styles.nav_text}>{t('Activity')}</div>
			</NavLink>

			<NavLink className={styles.nav_link} to={Routes.Payments}>
				<img src={currency} alt="currency" width="16" height="16" style={{ filter: 'invert(1)' }} />
				<div className={styles.nav_text}>{t('Payments')}</div>
			</NavLink>

			<a className={styles.nav_link} href={TUTORIAL_LINK} target="_blank">
				<div className={styles.nav_text_tutorial}>{t('Tutorial')}</div>
				<FontIcon name={FontIconName.External} size={16} />
			</a>

			<a href={RICOCHET_V1_LINK} className={styles.nav_link_desktop_only} target="_blank" rel={'noreferrer'}>
				<div className={styles.nav_text_tutorial}>{t('Ricochet V1')}</div>
				<FontIcon name={FontIconName.External} size={16} />
			</a>
		</div>
	);
};
