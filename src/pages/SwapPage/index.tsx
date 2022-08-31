import { LiFiWidget, WidgetConfig } from '@lifi/widget';
import styles from './styles.module.scss';
import { useMemo } from 'react';

export const WidgetPage = () => {
	const widgetConfig: WidgetConfig = useMemo(
		() => ({
			integrator: 'sero - ricochet exchange',
			containerStyle: {
				border: `1px solid ${
					window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgb(66, 66, 66)' : 'rgb(234, 234, 234)'
				}`,
				borderRadius: '16px',
				display: 'flex',
			},
			theme: {
				palette: {
					primary: { main: '#2d3233' },
					secondary: { main: '#2d3233' },
				},
			},
			disabledChains: [56, 3, 43114, 25, 250, 100, 42220, 1666600000, 66, 1284, 1285, 122, 9001, 1, 10, 42161],
		}),
		[],
	);

	return (
		<div className={styles.wrap}>
			<LiFiWidget config={widgetConfig} />
		</div>
	);
};
