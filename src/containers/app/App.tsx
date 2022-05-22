import React, { useEffect } from 'react';
import { MainRouter } from 'containers/MainRouter';
import { useDispatch } from 'react-redux';
import { mainCheck } from 'store/main/actionCreators';
import { Banner } from 'components/layout/Banner';
import { Modal } from 'components/common/Modal';
import { MainLayout } from 'containers/MainLayout';
import { HashRouter } from 'react-router-dom';

const App: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(mainCheck());
	}, [dispatch]);

	return (
		<HashRouter>
			<Banner />
			<Modal />
			<MainLayout>
				<MainRouter />
			</MainLayout>
		</HashRouter>
	);
};

export default App;
