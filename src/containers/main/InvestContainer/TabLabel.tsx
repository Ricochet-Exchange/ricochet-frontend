import React from 'react';

type TabLabelProps = {
	labelContent: string;
	badgeContent?: string;
	badgeColor?: string;
};

export const TabLabel = ({ labelContent, badgeContent = 'Beta', badgeColor = '#5f8eb9' }: TabLabelProps) => {
	return (
		<div style={{ display: 'flex', gap: '4px' }}>
			<span>{labelContent}</span>
			<sub style={{ color: badgeColor }}>{badgeContent}</sub>
		</div>
	);
};
