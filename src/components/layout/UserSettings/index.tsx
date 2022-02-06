import React, { FC } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { Dropdown } from 'components/common/Dropdown';
import { useTranslation } from 'i18n';
import { WalletButton } from 'components/common/WalletButton';
import useENS from 'hooks/useENS';
import styles from './styles.module.scss';

interface IProps {
  account: string;
  ricBalance?: string;
  className?: string;
}

export const UserSettings: FC<IProps> = ({
  ricBalance = '',
  account,
  className,
}) => {
  const { ensName, ensAvatar } = useENS(account);
  const { t } = useTranslation('main');

  return (
    <div className={styles.user_settings}>
      <WalletButton ricBalance={ricBalance} account={ensName || account} avatar={ensAvatar} />
      <div className={styles.dot_wrap}>
        <div className={styles.button}>
          <Dropdown
            placement="bottom-end"
            popupClassName={styles.settings_dropdown}
            buttonClassName={styles.settings_button}
            label={(
              <FontIcon
                className={className}
                name={FontIconName.Dot}
                size={16}
              />
            )}
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
                    {t('Docs')}
                  </a>
                  <span className={styles.description}>
                    {t('Documentations for users of Ricochet')}
                  </span>
                </li>
                <li className={styles.paper}>
                  <a
                    className={styles.head}
                    href={`${process.env.PUBLIC_URL}/RicochetExchangeWhitepaper.pdf`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('White Paper')}
                  </a>
                  <span className={styles.description}>
                    {t('Check out our fundamental ideas')}
                  </span>
                </li>
                <li className={styles.discord}>
                  <a
                    className={styles.head}
                    href="https://discord.gg/mss4t2ED3y"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('Discord')}
                  </a>
                  <span className={styles.description}>
                    {t('Join the community on Discord')}
                  </span>
                </li>
                <li className={styles.terms}>
                  <a
                    className={styles.head}
                    href="https://github.com/Ricochet-Exchange/ricochet-frontend/blob/main/TERMS.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('Terms')}
                  </a>
                  <span className={styles.description}>
                    {t('Read our terms of service')}
                  </span>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
