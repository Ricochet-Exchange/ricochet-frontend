import { Coin } from 'constants/coins';
import { downgradeTokensList } from 'constants/downgradeConfig';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { ModalSelectToken } from 'containers/modal/ModalSelectToken';
import { useShallowSelector } from 'hooks/useShallowSelector';
import React, {
  FC,
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { selectDowngradeCoin, selectUpgradeCoin } from 'store/main/actionCreators';
import { selectMain } from 'store/main/selectors';

export interface UpgradeTokenConfig {
  coin: Coin,
  tokenAddress: string,
  
}
interface IProps {
  onCloseModal: () => void
}

export const ModalContainer: FC<IProps> = ({ onCloseModal }) => {
  const dispatch = useDispatch();

  const { coinType, balances } = useShallowSelector(selectMain);

  const [tokensList, setTokensList] = useState<UpgradeTokenConfig[]>(upgradeTokensList);

  const [filteredList, setFilteredList] = useState<UpgradeTokenConfig[]>([]);

  useEffect(() => {
    if (downgradeTokensList.find((el) => el.coin === coinType)) {
      setTokensList(downgradeTokensList);
    } else {
      setTokensList(upgradeTokensList);
    }
  }, [coinType]);
  
  const onSelectCoin = useCallback((coin: Coin) => {
    if (downgradeTokensList.find((el) => el.coin === coin)) {
      dispatch(selectDowngradeCoin(coin));
    } else {
      dispatch(selectUpgradeCoin(coin));
    }
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  
  const onSearch = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filtered = tokensList.filter((el) => el.coin.includes(value.toUpperCase()));
    setFilteredList(filtered);
  }, [searchTerm, setSearchTerm, setFilteredList, filteredList]);

  return (
    <ModalSelectToken
      onSelectCoin={onSelectCoin}
      value={searchTerm}
      onChange={onSearch}
      onCloseModal={onCloseModal}
      tokensList={tokensList}
      filteredList={searchTerm ? filteredList : tokensList}
      balances={balances}
    />
  );
};
