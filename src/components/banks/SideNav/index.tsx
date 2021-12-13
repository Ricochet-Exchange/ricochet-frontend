import React, { FC } from 'react';
import { Menu } from 'antd';
import Link from 'components/common/Link';
import { SignInButton } from 'components/banks/SignInButton';
import { Routes } from 'constants/routes';
import { truncateAddr } from 'utils/helpers';
import Icons from 'assets/icons/Icons';
import './styles.scss';

type Props = {
  address: string;
};

const SideNav: FC<Props> = ({ address }) => (
  <Menu
    defaultSelectedKeys={['/banks', '/vaults']}
    mode="inline"
    inlineIndent={0}
  >
    <div className="web3feedback">
      {address 
        ? (
          <div className="connected">
            <div className="dot" />
            <p>
              {truncateAddr(address)}
            </p>
          </div>
        ) : (
          <SignInButton size="small" />
        )}
    </div>
    <Menu.Item key="/banks">
      <Link to={Routes.Banks}>
        <Icons.Bank />
        Banks
      </Link>
    </Menu.Item>

    <Menu.Item key="/vaults">
      <Link to={Routes.Vaults}>
        <Icons.Vault />
        Vaults
      </Link>
    </Menu.Item>
  </Menu>
);

export default SideNav;
