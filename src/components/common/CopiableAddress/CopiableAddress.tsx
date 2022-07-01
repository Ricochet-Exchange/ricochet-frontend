import React, { FC, useEffect, useState } from 'react';
import copy from 'assets/images/copy.svg';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import styles from './styles.module.scss';

const AddressTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(() => ({
	pointerEvents: 'auto',

	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#69707a',
	},
}));

type CopiableAddressProps = {
	address: string;
};

export const CopiableAddress: FC<CopiableAddressProps> = ({ address }) => {
	const [clipboardTitle, setClipboardTitle] = useState('Copy address');

	useEffect(() => {
		let isMounted = true;

		if (clipboardTitle !== 'Copy address') {
			setTimeout(() => {
				if (isMounted) {
					setClipboardTitle('Copy address');
				}
			}, 3000);
		}

		return () => {
			isMounted = false;
		};
	}, [clipboardTitle]);

	const copyToClipboard = async (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		await navigator.clipboard.writeText(address);
		setClipboardTitle('Copied !');
	};

	return (
		<div style={{ display: 'inline-block' }}>
			<AddressTooltip title={clipboardTitle} disableFocusListener placement="top" arrow enterTouchDelay={0}>
				<div aria-hidden="true" onClick={copyToClipboard} className={styles.wrapper}>
					<span>
						{address.slice(0, 7)}
						...
						{address.slice(-4)}
					</span>
					<img src={copy} alt="copy icon" />
				</div>
			</AddressTooltip>
		</div>
	);
};
