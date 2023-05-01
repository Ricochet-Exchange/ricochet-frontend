import { ClaimPageContainer } from './ClaimPageContainer';
import React, { FC } from 'react';

interface IProps {}

const ClaimPage: FC<IProps> = () => {
	// const { address, balances } = useShallowSelector(selectMain);

	return (
		<div className={''}>
			<div className={''}>
				<ClaimPageContainer />
			</div>
		</div>
	);
};

export { ClaimPage };
