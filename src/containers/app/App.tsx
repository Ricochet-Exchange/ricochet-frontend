import React, { useEffect } from 'react';
import { MainRouter } from 'containers/MainRouter';
import { Banner } from 'components/layout/Banner';
import { Modal } from 'components/common/Modal';
import { mainCheck } from 'store/main/actionCreators';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mainCheck());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <Modal />
      <MainRouter />
    </>
  );
};

export default App;
