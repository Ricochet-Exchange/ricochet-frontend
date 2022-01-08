import { useCallback, useState } from 'react';

/**
 * Handles element focus and blur, changing focused boolean value
 * @param initialState by default false
 */
export const useFocusEvent = (initialState = false) => {
  const [focused, setFocused] = useState(initialState);

  const onFocus = useCallback(() => setFocused(true), [setFocused]);
  const onBlur = useCallback(() => setTimeout(() => setFocused(false), 300), [setFocused]);

  return { focused, onBlur, onFocus };
};
