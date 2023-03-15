import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent, PropsWithChildren, 
} from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export enum ButtonSlideAnimation {
  right = 'right',
  down = 'down',
  left = 'left',
  diagonal = 'diagonal',
}

type ButtonPresentation = 'button' | 'link';

type Props = DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  presentation?: ButtonPresentation,
  label: string | JSX.Element;
  onClick?: (e: MouseEvent) => void ;
  slide?: ButtonSlideAnimation
  className?: string;
};

export const Button:React.FC<PropsWithChildren<Props>> = ({
  label, 
  presentation = 'button',
  onClick, 
  slide = ButtonSlideAnimation.right, 
  className,
  children,
  ...rest
}) => (
  <button
    {...rest}
    className={cx(
      styles.button, 
      styles[slide],
      styles[presentation],
      className,
    )}
    onClick={onClick}
  >
    {children}
    {label}
  </button>
);
