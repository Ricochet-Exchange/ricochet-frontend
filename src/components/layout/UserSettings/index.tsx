import React, { FC } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { Dropdown } from 'components/common/Dropdown';
import { WalletButton } from 'components/common/WalletButton';
import styles from './styles.module.scss';
import { DISCORD_LINK } from 'utils/helpers';

interface IProps {
	account: string;
	ricBalance?: string;
	className?: string;
}

export const UserSettings: FC<IProps> = ({ ricBalance = '', account, className }) => {
	return (
		<div className={styles.user_settings}>
			<WalletButton ricBalance={ricBalance} account={account} />

			<div className={styles.dot_wrap}>
				<div className={styles.button}>
					<Dropdown
						placement="bottom-end"
						popupClassName={styles.settings_dropdown}
						buttonClassName={styles.settings_button}
						label={<FontIcon className={className} name={FontIconName.Dot} size={16} />}
					>
						<div className={styles.settings_wrap}>
							<ul className={styles.list}>
								<li className={styles.docs}>
									<a
										className={styles.head}
										href="https://docs.ricochet.exchange/"
										target="_blank"
										rel="noreferrer"
									>
										<div>{'Docs'}</div>
										<FontIcon name={FontIconName.Book} size={16} />
									</a>
								</li>
								<li className={styles.discord}>
									<a className={styles.head} href={DISCORD_LINK} target="_blank" rel="noreferrer">
										<div>{'Discord'}</div>
										<FontIcon name={FontIconName.Chat} size={16} />
									</a>
								</li>
								<li className={styles.github}>
									<a
										className={styles.head}
										href="https://github.com/Ricochet-Exchange"
										target="_blank"
										rel="noreferrer"
									>
										<div>{'GitHub'}</div>
										<FontIcon name={FontIconName.GitHub} size={16} />
									</a>
								</li>
								<li className={styles.discord}>
									<a
										className={styles.head}
										href="https://twitter.com/ricochetxchange"
										target="_blank"
										rel="noreferrer"
									>
										<div>{'Twitter'}</div>
										<FontIcon name={FontIconName.Twitter} size={16} />
									</a>
								</li>
								<li className={styles.terms}>
									<a
										className={styles.head}
										href="https://github.com/Ricochet-Exchange/ricochet-frontend/blob/main/TERMS.md"
										target="_blank"
										rel="noreferrer"
									>
										<div>{'Terms'}</div>
										<FontIcon name={FontIconName.Lock} size={16} />
									</a>
								</li>
							</ul>
						</div>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};
