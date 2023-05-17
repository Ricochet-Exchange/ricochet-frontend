import React, { FC } from 'react';
import Link from 'components/common/Link';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../../constants/routes';
import styles from './styles.module.scss';
import { RICOCHET_LEGACY_LINK } from 'utils/helpers';

interface IProps {
	closeMenu?: () => void;
}

export const MobileMenu: FC<IProps> = ({ closeMenu }) => {
	return (
		<nav
			className={styles.styled_menu}
			style={closeMenu ? { transform: 'translateX(0)' } : { transform: 'translateX(100%)' }}
		>
			<div className={styles.mobile_links}>
				<div className={styles.mobile_container}>
					<div className={styles.mobile_styled_link}>
						<div className={styles.anchor_container}>
							<Link to={Routes.Invest} opacityFull>
								<div>{'Invest'}</div>
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.mobile_container}>
					<div className={styles.mobile_styled_link}>
						<div className={styles.anchor_container}>
							<Link to={Routes.Refer}>
								<div>{'Refer'}</div>
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.mobile_container}>
					<div className={styles.mobile_styled_link}>
						<div className={styles.anchor_container}>
							<Link to={Routes.Wallet}>
								<div>{'Wallet'}</div>
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.mobile_container}>
					<div className={styles.mobile_styled_link}>
						<div className={styles.anchor_container}>
							<NavLink to={{ pathname: RICOCHET_LEGACY_LINK }}>
								<div>{'Ricochet V1'}</div>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
