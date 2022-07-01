import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const StyledLink = styled(Link)(({ theme }) => ({
	'&:hover': {
		color: theme.palette.info.main,
	},
	'&:active': {
		color: theme.palette.info.main,
	},
	'&:visited': {
		color: theme.palette.secondary.main,
	},
}));

type LinkPlaceholderProps = {
	link: string;
};

export const LinkPlaceholder: FC<LinkPlaceholderProps> = ({ link }) => {
	return (
		<StyledLink href={link} target="_blank" rel="noreferrer" underline="none">
			<OpenInNewIcon />
		</StyledLink>
	);
};
