import React, { useEffect } from 'react';
import { MainRouter } from 'containers/MainRouter';
import { Banner } from 'components/layout/Banner';
import { Modal } from 'components/common/Modal';
import { mainCheck } from 'store/main/actionCreators';
import { useDispatch } from 'react-redux';
import { InfoBanner } from 'components/layout/InfoBanner';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
      dispatch(mainCheck());
    } else {
      dispatch(mainCheck(true));
    }
  }, [dispatch, localStorage]);
  
  return (
    <>
      <InfoBanner />
      <Banner />
      <Modal />
      <MainRouter />
    </>
  );
};

export default App;
