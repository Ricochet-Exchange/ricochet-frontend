import React, { FC } from 'react';
import classNames from 'classnames';

interface IProps {
  name: FontIconName;
  size?: number;
  className?: string;
}

export enum FontIconName {
  Close = 'icon-close',
  ChevronDown = 'icon-arrow-bottom-1',
  Lock = 'icon-lock',
  ArrowRight = 'icon-arrow-right',
  User = 'icon-user',
  Star = 'icon-star-filled',
  RicoUser = 'icon-userlogo',
  ArrowRightCircled = 'icon-right-circled',
  ArrowDown = 'icon-down-open',
  ArrowUp = 'icon-up-open',
  Search = 'icon-search',
  Dot = 'icon-dot-3',
  Plus = 'icon-plus',
  Minus = 'icon-minus',
  ArrowUpFilled = 'up-filled',
  Shuttle = 'icon-space-shuttle',
  Swap = 'icon-shuffle-1',
  Loop = 'icon-loop',
  Bank = 'icon-bank',
  External = 'icon-link-ext',
  Vault = 'icon-suitcase',
  Desktop = 'icon-desktop',
  Book = 'icon-book',
  Paper = 'icon-newspaper',
  GitHub = 'icon-github-circled',
  Twitter = 'icon-twitter',
  Chat = 'icon-chat',
  Refer = 'icon-user-add-outline',
  Wallet = 'icon-wallet',
  Warning = 'icon-warning-empty',
  Login = 'icon-login',
}

const FontIcon: FC<IProps> = ({ name, size = 24, className }) => (
  <i className={classNames(name, className)} style={{ fontSize: size }} />
);

export { FontIcon };
