import zIndex from '@mui/material/styles/zIndex';
import { positions } from '@mui/system';
import React from 'react';

export const LoadingContext = React.createContext({
	loading: true,
	setLoading: (loading: boolean) => {},
});

export const useLoading = () => React.useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: any }) => {
	const [loading, setLoading] = React.useState<boolean>(true);

	return (
		<LoadingContext.Provider
			value={{
				loading,
				setLoading,
			}}
		>
			{loading ? (
				<div className="body">
					<div className="loader" />
					<div className="longfazers">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			) : null}
			{children}
		</LoadingContext.Provider>
	);
};
