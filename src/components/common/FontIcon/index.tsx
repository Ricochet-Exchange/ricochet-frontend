import React, { FC } from 'react';
import classNames from 'classnames';

interface IProps {
  name: FontIconName;
  size?: number;
  className?: string;
}

export enum FontIconName {
  Light = 'icon-light',
  Dark = 'icon-dark',
  Close = 'icon-close',
  ChevronDown = 'icon-arrow-bottom-1',
  View = 'icon-view',
  Lock = 'icon-lock',
  ArrowRight = 'icon-arrow-right',
  ArrowLeftBold = 'icon-arrow-left-bold',
  ArrowRightBold = 'icon-arrow-right-bold',
  Email = 'icon-email',
  Checked = 'icon-checked',
  Copy = 'icon-copy',
  User = 'icon-user',
  Star = 'icon-star-filled',
  RicoUser = 'icon-userlogo',
  ArrowRightCircled = 'icon-right-circled',
  ArrowDown = 'icon-down-open',
  ArrowUp = 'icon-up-open',
  Search = 'icon-search',
  Dot = 'icon-dot-3',
}

const FontIcon: FC<IProps> = ({ name, size = 24, className }) => (
  <i className={classNames(name, className)} style={{ fontSize: size }} />
);

export { FontIcon };
