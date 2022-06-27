import React from 'react';

type TabLabelProps = {
	labelContent: string;
	badgeContent?: string;
	badgeColor?: string;
};

export const TabLabel = ({ labelContent, badgeContent = 'Beta', badgeColor = 'lightblue' }: TabLabelProps) => {
	return (
		<div style={{ display: 'flex', gap: '4px' }}>
			<span style={{ color: 'white' }}>{labelContent}</span>
			<sub style={{ color: badgeColor }}>{badgeContent}</sub>
		</div>
	);
};
