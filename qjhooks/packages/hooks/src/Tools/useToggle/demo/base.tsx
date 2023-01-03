import React from 'react';
import { Button } from 'antd';
import { useToggle } from '@qingji/hooks';

export default () => {
  const [value, {toggle, setPre, setNext}] = useToggle()
  return (
    <>
      <div>{value.toString()}</div>
      <Button onClick={toggle}>Toggle</Button>
      <Button onClick={setPre}>SetPre</Button>
      <Button onClick={setNext}>SetNext</Button>
    </>
  );
};
