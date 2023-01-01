
import React, { useState } from 'react';
import { Button } from 'antd';
import { useThrottleFn } from '@qingji/hooks';

export default () => {
  const [count, setCount] = useState(0)
  const { run } = useThrottleFn(
    () => {
      setCount(count + 1);
    },
    {
      wait: 1000,
    },
  );
  return (
    <>
      <div>Clicked count: {count}</div>
      <Button onClick={run}>click</Button>
    </>
  );
};
