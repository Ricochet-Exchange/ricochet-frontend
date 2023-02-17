import React from 'react';
import Logo from './../assets/images/logo.svg';

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
					<div className="loader">
						<img alt="ricochet logo" width={'100px'} height={'100px'} src={Logo} />
					</div>
					<div className="loaderText">Please hold on while we load your information.</div>
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
