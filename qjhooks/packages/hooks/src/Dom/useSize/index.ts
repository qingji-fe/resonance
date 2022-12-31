import { useEffect, useState } from 'react';
import { getTargetElement } from '../../utils'
const useSize = (
  target: any,
) => {
  const [size, setSize] = useState({})
  useEffect(()=> {
    const element = getTargetElement(target);
    if(!element){
      return
    }
    const observer = new ResizeObserver( ([entries]) => {
      setSize(entries.contentRect)
    })
    observer.observe(element)
    return () =>{
      observer.disconnect()
    }
  },[])
  return size
};

export default useSize;
