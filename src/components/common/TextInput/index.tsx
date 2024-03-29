import React, { FC, HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { TextInputWrap } from '../TextInputWrap';
import ButtonNew from '../ButtonNew';

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
	left?: JSX.Element | string;
	right?: JSX.Element | string;
	error?: boolean;
	hasError?: boolean;
	containerClassName?: string;
	onClickMax?: () => void;
	isLoading?: boolean;
	isReadOnly?: boolean;
	dontBlockChar?: boolean;
}

const IconRenderer: FC<{ error?: boolean }> = ({ children, error }) =>
	children ? (
		<div
			className={classNames(styles.icon, {
				[styles.text]: typeof children === 'string',
				[styles.error]: error,
			})}
		>
			{children}
		</div>
	) : null;

const TextInput: FC<TextInputProps> = ({
	type = 'text',
	left,
	right,
	hasError,
	containerClassName,
	className,
	onClickMax,
	isLoading,
	isReadOnly,
	dontBlockChar = false,
	...props
}) => {
	const blockInvalidChar = (e: any) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
	return (
		<TextInputWrap error={hasError} className={containerClassName}>
			<IconRenderer error={hasError}>{left}</IconRenderer>
			{dontBlockChar ? (
				<input type={type} {...props} className={classNames(styles.input, className)} size={1} />
			) : (
				<input
					type={type}
					{...props}
					onKeyDown={blockInvalidChar}
					className={classNames(styles.input, className)}
					size={1}
				/>
			)}

			{onClickMax && (
				<div className={styles.max_wrap}>
					<ButtonNew
						color="secondary"
						disabled={isReadOnly || isLoading}
						isLoading={isLoading}
						onClick={onClickMax}
						className={styles.max}
					>
						{'Max'}
					</ButtonNew>
				</div>
			)}

			<IconRenderer>{right}</IconRenderer>
		</TextInputWrap>
	);
};

export { TextInput };
