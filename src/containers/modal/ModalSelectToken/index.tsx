import ButtonNew from 'components/common/ButtonNew';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { TextInput } from 'components/common/TextInput';
import { UpgradeTokenConfig } from 'containers/main/ModalContainer';
import { useTranslation } from 'i18n';
import React, {
  ChangeEvent,
  FC,
} from 'react';
import { Coin, iconsCoin } from '../../../constants/coins';
import styles from './styles.module.scss';

interface IProps {
  value: string,
  tokensList: UpgradeTokenConfig[],
  filteredList: UpgradeTokenConfig[],
  balances?: { [key:string]: string },
  onSelectCoin: (value: Coin) => void,
  onChange: (e:ChangeEvent<HTMLInputElement>) => void,
  onCloseModal: () => void
}

export const ModalSelectToken: FC<IProps> = ({
  onSelectCoin, value, onChange, onCloseModal, tokensList, filteredList, balances,
}) => {
  const { t } = useTranslation('main');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.select}>
            <div className={styles.select_token_wrap}>
              {t('Select a token')}
            </div>
            <div className={styles.close_wrap}>
              <button className={styles.close_btn} onClick={onCloseModal}>
                <FontIcon name={FontIconName.Close} className={styles.close} size={14} />
              </button>
            </div>
          </div>
          <div className={styles.input_wrap}>
            <TextInput
              value={value}
              className={styles.input}
              onChange={onChange} 
              containerClassName={styles.container_input} 
              placeholder={t('Search name or paste address')}
              left={<FontIcon name={FontIconName.Search} className={styles.search} size={16} />}
            />
          </div>
          <div className={styles.common_wrap}>
            <div className={styles.common}>Common bases</div>
          </div>    
          <div className={styles.icon_wrap}>
            {tokensList.map(({ coin }) => (
              <span key={coin}>
                <ButtonNew
                  className={styles.icon_button}
                  onClick={() => onSelectCoin(coin)}
                >
                  <img src={iconsCoin[coin]} alt={coin} />
                  <div className={styles.icon_name}>{coin}</div>
                </ButtonNew>
              </span>
            ))}
          </div>
          {(filteredList.length > 0) 
            ? (
              <div className={styles.table_wrap}>
                <div className={styles.table}>
                  {filteredList.map(({ coin, tokenAddress }) => (
                    <div key={coin} className={styles.row_wrap}>
              
                      <ButtonNew className={styles.coin_wrap} onClick={() => onSelectCoin(coin)}>
                        <img src={iconsCoin[coin]} alt={coin} />
                        <div className={styles.coin_name_wrap}>
                          <div className={styles.coin_name}>
                            {coin}
                          </div>
                          <div className={styles.description}>
                            {t('Ethereum')}
                          </div>
                        </div>
                      </ButtonNew>

                      <div className={styles.rate_wrap}>
                        <div className={styles.rate}>
                          {balances && (+balances[tokenAddress]).toFixed(6)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
            : <div className={styles.results}>{t('Results not found')}</div>}
        </div>
      </div>
      <div className={styles.backdrop} onClick={onCloseModal} role="presentation" />
    </>
  );
};
