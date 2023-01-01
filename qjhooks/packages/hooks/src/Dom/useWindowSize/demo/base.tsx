
import React from 'react';
import { useWindowSize } from '@qingji/hooks';

export default () => {
  const { width, height } = useWindowSize()
  return (
    <>
    {width} & {height}
    </>
  );
};
