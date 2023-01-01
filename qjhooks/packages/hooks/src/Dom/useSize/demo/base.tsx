
import React, { useRef } from 'react';
import { useSize } from '@qingji/hooks';

export default () => {
  const ref = useRef(null);
  const size = useSize(ref)
  return (
    <>
     <div>{JSON.stringify(size)}</div>
     <textarea ref={ref}></textarea>
    </>
  );
};
