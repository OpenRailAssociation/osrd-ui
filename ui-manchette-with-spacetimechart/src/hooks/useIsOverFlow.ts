import { useState, useLayoutEffect, type RefObject } from 'react';

type CallbackFunction = {
  (hasOverflow: boolean): void;
};

export const useIsOverflow = (ref: RefObject<HTMLElement>, callback: CallbackFunction): boolean => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (current) {
        const hasOverflow = current.scrollHeight > current.clientHeight;
        setIsOverflow(hasOverflow);

        if (callback) callback(hasOverflow);
      }
    };

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }

      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
