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
			// height is equal to 100% minus tab height and border.
			style={{ width: '100%', height: 'calc(100% - 48px - 1px)', color: 'white' }}
		>
			{index === tab && children}
		</div>
	);
};
