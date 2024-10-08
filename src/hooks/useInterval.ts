import {useEffect, useRef} from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(
      (function id() {
        savedCallback.current();
        return id;
      })(),
      delay
    );

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
