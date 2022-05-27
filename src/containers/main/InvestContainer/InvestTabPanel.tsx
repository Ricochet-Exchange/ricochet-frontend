import React from 'react';
import { TABS } from './index';

type TabPanelProps = {
	children?: React.ReactNode;
	index: TABS;
	tab: TABS;
};

export const TabPanel = ({ children, index, tab }: TabPanelProps) => {
	return (
		<div
			role="tabpanel"
			hidden={tab !== index}
			id={`rex-tabpanel-${tab}`}
			aria-labelledby={`rex-tab-${tab}`}
			style={{ width: '100%', height: '100%' }}
		>
			{index === tab && children}
		</div>
	);
};
