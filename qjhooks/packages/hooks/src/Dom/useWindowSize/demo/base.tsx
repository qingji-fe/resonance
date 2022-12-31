
import React from 'react';
import useWindowSize from '../index';

export default () => {
  const { width, height } = useWindowSize()
  return (
    <>
    {width} & {height}
    </>
  );
};
