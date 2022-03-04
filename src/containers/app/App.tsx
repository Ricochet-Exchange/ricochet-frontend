import React, { useEffect } from 'react';
import { MainRouter } from 'containers/MainRouter';
import { useDispatch } from 'react-redux';
import { mainCheck } from 'store/main/actionCreators';
import { Banner } from 'components/layout/Banner';
import { Modal } from 'components/common/Modal';
import { MainLayout } from 'containers/MainLayout';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mainCheck());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <Modal />
      <MainLayout>
        <MainRouter />
      </MainLayout>
    </>
  );
};

export default App;
