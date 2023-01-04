import React from 'react';
import { Button } from 'antd';
import useLocalStorage from '../index';

export default () => {
  const [value,  {setValue , removeValue} ] = useLocalStorage("key11", {
    defaultValue: '1',
  })
  const index = value?.indexOf('|-|');
  const time = value?.slice(0, index);
  const result = value?.slice(index+3);

  return (
    <>
      <div>本地存储值：{`${result}`}</div>
      <div>本地存储过期时间：{`${time}`}</div>
      <Button onClick={() => setValue({
        value: 'new值',
      })}>Add1</Button>
      <Button onClick={removeValue}>Remove1</Button>

    </>
  );
};
