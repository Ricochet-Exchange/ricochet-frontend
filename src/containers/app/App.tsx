import React from 'react';
import { MainRouter } from 'containers/MainRouter';
import { Banner } from 'components/layout/Banner';
import { Modal } from 'components/common/Modal';

const App: React.FC = () => (
  <>
    <Banner />
    <Modal />
    <MainRouter />
  </>
);

export default App;
