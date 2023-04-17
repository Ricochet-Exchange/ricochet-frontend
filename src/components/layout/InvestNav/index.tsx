import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { NavLink } from 'react-router-dom';
import { Routes } from 'constants/routes';
import currency from 'assets/images/coins/currency.svg';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectUserStreams } from 'store/main/selectors';
import gift from 'assets/images/gift.svg';
import styles from './styles.module.scss';
import { RICOCHET_LEGACY_LINK, SUPPORT, TUTORIAL_LINK } from 'utils/helpers';

export const InvestNav = () => {
	const userStreams = useShallowSelector(selectUserStreams);

	return (
		<div className={styles.nav_container}>
			<div className={styles.navscroller}>
				{userStreams.length !== 0 ? (
					<NavLink
						className={styles.nav_link}
						exact
						activeClassName={styles.nav_link_active}
						to={Routes.InvestStreams}
					>
						<FontIcon name={FontIconName.RicoUser} size={16} />
						<div className={styles.nav_text}>{`${'Active Streams'} (${userStreams.length})`} </div>
					</NavLink>
				) : null}

				<NavLink to={Routes.Wallet} className={styles.nav_link} activeClassName={styles.nav_link_active}>
					<FontIcon name={FontIconName.Wallet} size={16} />
					<div className={styles.nav_text}>{'Wallet'}</div>
				</NavLink>

				<NavLink className={styles.nav_link} exact activeClassName={styles.nav_link_active} to={Routes.Invest}>
					<FontIcon name={FontIconName.Swap} size={16} />
					<div className={styles.nav_text}>{'Market'}</div>
				</NavLink>

				<NavLink to={Routes.Swap} className={styles.nav_link} activeClassName={styles.nav_link_active}>
					<FontIcon name={FontIconName.Loop} size={16} />
					<div className={styles.nav_text}>{'Swap'}</div>
				</NavLink>

				<NavLink to={Routes.Claim} className={styles.nav_link} activeClassName={styles.nav_link_active}>
					<img
						alt="logo for claim route"
						src={gift}
						width="16"
						height="16"
						style={{ filter: 'invert(1)', marginRight: '3px' }}
					/>
					<div className={styles.nav_text}>{'Gifts'}</div>
				</NavLink>

				<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to={Routes.Payments}>
					<img src={currency} alt="currency" width="16" height="16" style={{ filter: 'invert(1)' }} />
					<div className={styles.nav_text}>{'Payments'}</div>
				</NavLink>
				<NavLink
					className={styles.nav_link}
					activeClassName={styles.nav_link_active}
					to={Routes.InvestLaunchpads}
				>
					<FontIcon name={FontIconName.Shuttle} size={16} />
					<div className={styles.nav_text}>{'Launchpad'}</div>
				</NavLink>

				<NavLink
					className={styles.nav_link}
					exact
					to={Routes.RecentActivity}
					activeClassName={styles.nav_link_active}
				>
					<FontIcon name={FontIconName.Activity} size={16} />
					<div className={styles.nav_text}>{'Activity'}</div>
				</NavLink>

				<NavLink to={Routes.Refer} className={styles.nav_link} activeClassName={styles.nav_link_active}>
					<FontIcon name={FontIconName.Refer} size={16} />
					<div className={styles.nav_text}>{'Refer'}</div>
				</NavLink>

				<a href={SUPPORT} className={styles.nav_link} target="_blank" rel={'noreferrer'}>
					<div className={styles.nav_text_tutorial}>{'Support'}</div>
					<FontIcon name={FontIconName.External} size={16} />
				</a>

				<a className={styles.nav_link} href={TUTORIAL_LINK} target="_blank" rel="noreferrer">
					<div className={styles.nav_text_tutorial}>{'Tutorial'}</div>
					<FontIcon name={FontIconName.External} size={16} />
				</a>

				<a href={RICOCHET_LEGACY_LINK} className={styles.nav_link} target="_blank" rel={'noreferrer'}>
					<div className={styles.nav_text_tutorial}>{'Ricochet V2'}</div>
					<FontIcon name={FontIconName.External} size={16} />
				</a>
			</div>
		</div>
	);
};
