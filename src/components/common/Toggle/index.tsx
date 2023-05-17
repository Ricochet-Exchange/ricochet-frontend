import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import React, { ChangeEvent, useState } from 'react';
import './styles.module.scss';
type Props = {
	label: string;
	toggled: boolean;
	onClick: any;
};
const ToggleButton = () => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className={`toggle-btn${toggle ? ' active' : ''}`} onClick={handleToggle}>
			<div className="toggle-btn__circle"></div>
		</div>
	);
};

export default ToggleButton;
