import React, { useEffect } from 'react';
import { Modal } from 'components/common/Modal';
import { MainRouter } from 'containers/MainRouter';
import { useDispatch } from 'react-redux';
import { mainCheck } from 'store/main/actionCreators';
import { Banner } from 'components/layout/Banner';

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
