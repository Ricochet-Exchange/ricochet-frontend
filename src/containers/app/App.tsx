import React from 'react';
import { Modal } from 'components/common/Modal';
import { MainRouter } from 'containers/MainRouter';
import { Banner } from 'components/layout/Banner';

const App: React.FC = () => (
  <>
    <Banner />
    <Modal />
    <MainRouter />
  </>
);

export default App;
