import { Action } from 'redux';

export type HandlerFn<T, U> = (
  state: Readonly<T>,
  action: Action<string> & U
) => Readonly<T>;
