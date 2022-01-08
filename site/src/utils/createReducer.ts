import { Action } from 'redux';
import { HandlerFn } from 'types/utils/handlerFn';

export const createReducer = <T>(
  initialState: T,
  handlers: Record<string, HandlerFn<T, any>>,
) => (
    state = initialState,
    action: Action<string> & any,
  ) => (Object.prototype.hasOwnProperty.call(handlers, action.type)
    ? handlers[action.type](state, action)
    : state);
