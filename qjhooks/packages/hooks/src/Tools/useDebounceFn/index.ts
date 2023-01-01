import { useEffect, useRef, useMemo } from 'react';
import { isFunction } from '../../utils';
import { debounce } from 'lodash'
const noop = () => {};

type callbackHandler = (event: any) => void;
interface Options {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

const useDebounceFn = (
  callback: callbackHandler = noop,
  options: Options
) => {
  if(!isFunction(callback)) {
    console.error(`useDebounceFn expected parameter is a function, got ${typeof callback}`);
  }
  const wait = options?.wait ?? 1000;
  const fnRef = useRef(callback);
  fnRef.current = callback;
  
  const debounced = useMemo(()=> debounce(
    (...args) => {
      return fnRef.current(...args);
    },
    wait,
    options,
  ), [])

  useEffect(()=> {
    return ()=> {
      debounced.cancel();
    }
  },[]);

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
};


export default useDebounceFn;
