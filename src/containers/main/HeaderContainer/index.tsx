import React, { FC, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { UserSettings } from 'components/layout/UserSettings';
import Link from 'components/common/Link';
import { MobileMenu } from 'components/layout/MobileMenu';
import { Hamburger } from 'components/Hamburger';
import { useTranslation } from 'i18n';
import styles from './styles.module.scss';
import logo from '../../../assets/images/logo.svg';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';

interface IProps {
	address: string;
	balance?: string;
}

export const HeaderContainer: FC<IProps> = ({ address, balance }) => {
	const location = useLocation();
	const { t } = useTranslation();
	const { aggregatedRICRewards } = useShallowSelector(selectMain);

	const [open, setOpen] = useState(false);

	const toggleHamburger = useCallback(() => {
		setOpen(!open);
	}, [open, setOpen]);

	React.useEffect(() => {
		console.log(aggregatedRICRewards);
	}, [aggregatedRICRewards]);

	const HeaderText = () => {
		switch (location.pathname) {
			case Routes.Wallet:
				return (
					<>
						<div>{t('Wallet')}</div>
					</>
				);
			case Routes.Invest:
				return (
					<>
						<div>{t('Invest')}</div>
					</>
				);
			case Routes.Distributions:
				return (
					<>
						<div>{t('Distributions')}</div>
					</>
				);
			case Routes.Banks:
				return (
					<>
						<div>{t('Banks')}</div>
					</>
				);
			case Routes.Vaults:
				return (
					<>
						<div>{t('Vaults')}</div>
					</>
				);
			case Routes.InvestLaunchpads:
				return (
					<>
						<div>{t('Launchpad')}</div>
					</>
				);
			case Routes.RecentActivity:
				return (
					<>
						<div>{t('Activity')}</div>
					</>
				);
			case Routes.Refer:
				return (
					<>
						<div>{t('Refer')}</div>
					</>
				);
			default:
				return <></>;
		}
	};

	return (
		<div>
			<div className={styles.header_wrap}>
				<div className={styles.mob_panel}>
					<div className={styles.brand}>
						<Link to={Routes.Invest}>
							<img className={styles.logo} src={logo} alt="Ricochet" />
						</Link>
						<h4>Ricochet Exchange</h4>
					</div>

					<div className={styles.links}>
						<Link to={Routes.Invest} className={styles.dca_link} activeClassName={styles.active}>
							<div>{t('Invest')}</div>
						</Link>
						<Link to={Routes.Wallet} className={styles.upgrade_link} activeClassName={styles.active}>
							<div>{t('Wallet')}</div>
						</Link>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<div className={styles.reward}>
							<h5>Rewards: {aggregatedRICRewards && Number(aggregatedRICRewards).toFixed(2)} RIC/mo</h5>
						</div>
						<div style={{ width: '20px' }} />
						<div className={styles.settings_wrap}>
							<UserSettings className={styles.dot} ricBalance={balance} account={address} />
						</div>
					</div>

					<div className={styles.mob_head}>
						<HeaderText />
					</div>
					<div className={styles.hamburger_container}>
						<Hamburger open={open} setOpen={setOpen} />
						{open && <MobileMenu closeMenu={toggleHamburger} />}
					</div>
				</div>
			</div>
			<div className={styles.header_spacer} />
		</div>
	);
};
