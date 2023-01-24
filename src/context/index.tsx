import zIndex from '@mui/material/styles/zIndex';
import { positions } from '@mui/system';
import React from 'react';

export const LoadingContext = React.createContext({
	loading: true,
	setLoading: () => {},
});

export const useLoading = () => React.useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: any }) => {
	const [loading, setLoading] = React.useState<boolean>(true);

	return (
		<LoadingContext.Provider
			value={{
				loading: true,
				setLoading: () => {},
			}}
		>
			{loading ? <div className="loading"></div> : null}
			{children}
		</LoadingContext.Provider>
	);
};
