import {
  useRef, useLayoutEffect, useCallback, type MutableRefObject,
} from 'react';

export default function useEvent(handler: () => void): VoidFunction {
  const handlerRef: MutableRefObject<any> = useRef(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: []) => {
    const fn: () => void = handlerRef.current;
    return fn(...args);
  }, []);
}
