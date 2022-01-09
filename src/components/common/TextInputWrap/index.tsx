import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  error?: boolean;
}

const TextInputWrap: FC<IProps> = ({
  children, ref, className, error, ...props 
}) => (
  <div
    className={classNames(
      styles.wrap,
      className, { [styles.error]: error },
    )}
    ref={ref}
    {...props}
  >
    {children}
  </div>
);

export { TextInputWrap };
