import React, { ChangeEvent } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: boolean;
  placeholder?: string;
  className?: string;
};

export const Input: React.FC<Props> = ({
  onChange,
  value,
  error,
  className,
  placeholder = '',
}) => (
  <input
    type="number"
    className={cx(
      styles.input,
      className,
      { [styles.error]: error },    
    )}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
