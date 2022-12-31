import { useEffect, useCallback, useRef } from 'react';
import { getTargetElement } from '../../utils'
const noop = () => {};

type callbackHandler = (event: any) => void;
type eventType = string

interface Options {
  target?: any;
}

const useEventListener = (
  eventType: eventType,
  callback: callbackHandler = noop,
  options: Options = {target: window}
) => {
  const { target } = options
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])
 
  useEffect(()=> {
    const element = getTargetElement(target, window);
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const useCallbackHandle = (e)=> {
      return callbackRef.current(e)
    }
    element.addEventListener(eventType, useCallbackHandle)
    return () => {
      element.removeEventListener(eventType, useCallbackHandle)
    }
  }, [eventType, options.target])
};

export default useEventListener;
