
import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { useEventListener } from '@qingji/hooks';

export default () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEventListener(
    'click',
    () => {
      setValue(value + 1);
    },
    { target: ref },
  );

  return (
    <Button ref={ref}>
      点击{value} times
    </Button>
  );
};
