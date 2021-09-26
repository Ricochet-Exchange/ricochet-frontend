import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren, 
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
  onClick?: () => void;
  slide?: ButtonSlideAnimation
  className?: string;
};

export const Button:React.FC<PropsWithChildren<Props>> = ({
  label, 
  presentation = 'button',
  onClick, 
  slide = ButtonSlideAnimation.right, 
  className,
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
    {label}
  </button>
);
