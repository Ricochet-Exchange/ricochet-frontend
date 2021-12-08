import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren, 
} from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { Loader } from '../Loader';

export type ButtonColor = 'primary' | 'secondary';

export type ButtonProps = DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  color?: ButtonColor,
  size?: number,
  fullWidth?: boolean,
  onClick?: React.MouseEventHandler<any>,
  iconClassName?: string,
  isLoading?: boolean,
  loaderColor?: string
};

export const ButtonNew: FC<PropsWithChildren<ButtonProps>> = ({
  color = 'primary',
  size = 44,
  fullWidth = false,
  onClick = () => {},
  className,
  type = 'button',
  children,
  disabled,
  iconClassName,
  isLoading,
  loaderColor,
  ...rest
}) => (
  <button
    type={type}
    className={cx(
      styles.button,
      styles[color],
      className,
      {
        [styles.full_width]: fullWidth,
      },
    )}
    style={{ height: size }}
    onClick={onClick}
    disabled={disabled || isLoading}
    {...rest}
  >
    {disabled ? <Loader loaderColor={loaderColor} /> : (
      <>
        {children}
      </>
    )}
  </button>
);

export default ButtonNew;
