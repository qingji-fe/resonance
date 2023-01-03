import React, { useState, useMemo } from 'react';

interface Actions {
  setPre: () => void;
  setNext: () => void;
  toggle: () => void;
}
const useToggle = (
  defaultValue = false,
) : [boolean, Actions]  => {
  const [state, setState] = useState(defaultValue);
  const actions = useMemo(()=> {
    const toggle = () => {
      return setState((s) => {
        return !s
      });
    }
    const setPre = () => setState(defaultValue);
    const setNext = () => setState(!defaultValue);
    return {
      toggle,
      setPre,
      setNext
    }
  },[])
  return [state, actions];
};
export default useToggle;
