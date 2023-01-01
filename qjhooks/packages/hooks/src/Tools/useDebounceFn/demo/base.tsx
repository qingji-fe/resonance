
import React, { useState } from 'react';
import { Button } from 'antd';
import { useDebounceFn } from '@qingji/hooks';

export default () => {
  const [count, setCount] = useState(0)
  const { run } = useDebounceFn(
    () => {
      setCount(count + 1);
    },
    {
      wait: 500,
    },
  );
  return (
    <>
      <div>Clicked count: {count}</div>
      <Button onClick={run}>click</Button>
    </>
  );
};
