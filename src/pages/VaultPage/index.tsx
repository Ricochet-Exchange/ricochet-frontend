import React, {
  FC,
} from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import SideNav from 'components/banks/SideNav';
import { VaultsContainer } from 'containers/main/VaultsContainer';
import logo from 'assets/images/logo.svg';
import { Layout } from 'antd';
import { Modal } from 'components/common/Modal';
import './styles.scss';

const { Content, Sider } = Layout;

interface IProps {}

export const VaultsPage: FC<IProps> = () => {
  const {
    address,
  } = useShallowSelector(selectMain);

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Modal classNameOverlay="overlayModal" />
        <Sider width="240px">
          <img src={logo} alt="icon" width="87px" />
          <SideNav address={address} />
        </Sider>
        <Layout>
          <Content id="content">
            <VaultsContainer />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
