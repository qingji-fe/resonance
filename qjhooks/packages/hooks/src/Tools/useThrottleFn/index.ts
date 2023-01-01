import { useEffect, useCallback, useRef, useMemo } from 'react';
import { isFunction } from '../../utils';
import { throttle } from 'lodash'
const noop = () => {};

type callbackHandler = (event: any) => void;
interface Options {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

const useThrottleFn = (
  callback: callbackHandler = noop,
  options: Options
) => {
  if(!isFunction(callback)) {
    console.error(`useDebounceFn expected parameter is a function, got ${typeof callback}`);
  }
  const wait = options?.wait ?? 1000;
  const fnRef = useRef(callback);
  fnRef.current = callback;
  
  const throttled = useMemo(()=> throttle(
    (...args) => {
      return fnRef.current(...args);
    },
    wait,
    options,
  ), [])

  useEffect(()=> {
    return ()=> {
      throttled.cancel();
    }
  },[]);

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
};


export default useThrottleFn;
