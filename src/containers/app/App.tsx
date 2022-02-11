import React, { useEffect } from 'react';
import { MainRouter } from 'containers/MainRouter';
import { Banner } from 'components/layout/Banner';
import { Modal } from 'components/common/Modal';
import { connectWeb3Modal, mainCheck } from 'store/main/actionCreators';
import { useDispatch } from 'react-redux';
import { isIFrame } from '../../utils/getSafeInfo';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER') && !isIFrame()) {
      dispatch(connectWeb3Modal());
    } else {
      dispatch(mainCheck());
    }
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
