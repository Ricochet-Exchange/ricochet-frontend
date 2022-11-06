import { ClaimPageSection } from './ClaimPageSection';
import React, { FC } from 'react';

interface IProps {}

const ClaimPage: FC<IProps> = () => {
	// const { address, balances } = useShallowSelector(selectMain);
	// const { t } = useTranslation();

	return (
		<div className={''}>
			<div className={''}>
				<ClaimPageSection />
			</div>
		</div>
	);
};

export { ClaimPage };
