import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { NavLink } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import currency from 'assets/images/coins/currency.svg';
import styles from './styles.module.scss';

const TUTORIAL_LINK = 'https://docs.ricochet.exchange/tutorial/using-the-dapp';
const RICOCHET_V1_LINK = 'https://v1.ricochet.exchange/';
const SUPPORT = 'https://discord.com/channels/862796510604296263/864667072357597185';

export const InvestNav = () => {
	const { t } = useTranslation();
	return (
		<div className={styles.nav_container}>
			<div className={styles.navscroller}>
				<NavLink to={Routes.SuperSwap} className={styles.nav_link} activeClassName={styles.nav_link_active}>
					<FontIcon name={FontIconName.Loop} size={16} />
					<div className={styles.nav_text}>{t('Swap')}</div>
				</NavLink>

				<NavLink to={Routes.Wallet} className={styles.nav_link} activeClassName={styles.nav_link_active}>
					<FontIcon name={FontIconName.Wallet} size={16} />
					<div className={styles.nav_text}>{t('Wallet')}</div>
				</NavLink>

				<NavLink className={styles.nav_link} exact activeClassName={styles.nav_link_active} to={Routes.Invest}>
					<FontIcon name={FontIconName.Swap} size={16} />
					<div className={styles.nav_text}>{t('Market')}</div>
				</NavLink>

				<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to={Routes.Payments}>
					<img src={currency} alt="currency" width="16" height="16" style={{ filter: 'invert(1)' }} />
					<div className={styles.nav_text}>{t('Payments')}</div>
				</NavLink>

				<NavLink
					className={styles.nav_link}
					activeClassName={styles.nav_link_active}
					to={Routes.InvestLaunchpads}
				>
					<FontIcon name={FontIconName.Shuttle} size={16} />
					<div className={styles.nav_text}>{t('Launchpad')}</div>
				</NavLink>

				<NavLink
					className={styles.nav_link}
					exact
					activeClassName={styles.nav_link_active}
					to={Routes.InvestStreams}
				>
					<FontIcon name={FontIconName.RicoUser} size={16} />
					<div className={styles.nav_text}>{t('Active Streams')}</div>
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

				<NavLink to={Routes.Refer} className={styles.nav_link} activeClassName={styles.nav_link_active}>
					<FontIcon name={FontIconName.Refer} size={16} />
					<div className={styles.nav_text}>{t('Refer')}</div>
				</NavLink>

				<a href={SUPPORT} className={styles.nav_link} target="_blank" rel={'noreferrer'}>
					<div className={styles.nav_text_tutorial}>{t('Support')}</div>
					<FontIcon name={FontIconName.External} size={16} />
				</a>

				<a className={styles.nav_link} href={TUTORIAL_LINK} target="_blank" rel="noreferrer">
					<div className={styles.nav_text_tutorial}>{t('Tutorial')}</div>
					<FontIcon name={FontIconName.External} size={16} />
				</a>

				<a href={RICOCHET_V1_LINK} className={styles.nav_link} target="_blank" rel={'noreferrer'}>
					<div className={styles.nav_text_tutorial}>{t('Ricochet V1')}</div>
					<FontIcon name={FontIconName.External} size={16} />
				</a>
			</div>
		</div>
	);
};
