import { useMemo } from 'react';
import { Modifier } from 'react-popper';

const sameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }: { state: any }) => {
    // eslint-disable-next-line no-param-reassign
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }: { state: any }) => {
    // eslint-disable-next-line no-param-reassign
    state.elements.popper.style.width = `${
      state.elements.reference.offsetWidth
    }px`;
  },
};

export const usePopperModifiers = (offsetX = 0, offsetY = 10, justify?: boolean): Modifier<any>[] =>
  useMemo(
    () => [
      {
        name: 'offset',
        options: {
          offset: [offsetX, offsetY],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 10,
        },
      },
      ...(justify ? [sameWidth] : []),
    ] as Modifier<any>[],
    [offsetX, offsetY, justify],
  );
