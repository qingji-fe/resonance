import { useState, useEffect, useCallback } from 'react';
import { isFunction } from '../../utils'
interface SetOptions {
  value?: any
  // callback?: () => void;
  expire?: number
}

interface Actions {
  setValue: (value: SetOptions) => void;
  removeValue: () => void;
}
interface Options {
  defaultValue?: any
  // callback?: () => void;
  expire?: number
}
const sign = '|-|'
const expireTime = 1000*60*60*24*31

const useLocalStorage = (
  key = 'qjhooks',
  options: Options
) : [any, Actions]  => {
  const { defaultValue, expire = new Date().getTime() + expireTime } = options
  let storage = window.localStorage

  const [state, setState] = useState(() => getStoredValue());
  function isNotJsonVal (defaultValue, expire) {
    let valueFn = defaultValue
    if (isFunction(defaultValue)) {
      valueFn = defaultValue();
    }
    const newVal = JSON.stringify(expire + sign + valueFn)
    valueFn && storage.setItem(key, newVal);
    return newVal
  }
  function getStoredValue() {
    try {
      const jsonVal = storage?.getItem(key);
      if (jsonVal) {
        let value = JSON.parse(jsonVal)
        const index = value.indexOf(sign);
        const time = +value.slice(0, index);
        if(time > new Date().getTime() || time == 0){
          value = value.slice(index + sign);
        }else{
          value = null,
          storage.removeItem(key);
          setState(undefined)
        }
        return value
      } else {
        return isNotJsonVal(defaultValue, expire)
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    setState(getStoredValue());
  }, [key]);

 
  const removeValue = useCallback(() => {
    try {
      storage.removeItem(key);
      setState(undefined)
    } catch (error) {
      console.error(error)
    }
  }, [key, setState])

  const setValue = useCallback((valueUpdate) => {
    try {
      const {value, expire = new Date().getTime() + expireTime} = valueUpdate
      const newState =
      typeof value === 'function' 
      ? (value as Function)(state) 
      : value;

      if (typeof newState === 'undefined') {
        return;
      }
      const jsonVal = storage?.getItem(key);
      if (jsonVal) {
        let value = JSON.parse(jsonVal)
        const index = value.indexOf(sign);
        const time = +value.slice(0, index);
       
        if(time >= expire || time == 0){
          value = null,
          storage.removeItem(key);
          setState(undefined)
        }else{
          const newValue = JSON.stringify(`${time}${sign}${newState}`);
          storage.setItem(key,  newValue);
          setState(JSON.parse(newValue))
        }
        return value
      } else {
        setState(JSON.parse(isNotJsonVal(value, expire)))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key, setState])
  
  const actions = {
    setValue,
    removeValue
  }
  return [state, actions];
};
export default useLocalStorage;
