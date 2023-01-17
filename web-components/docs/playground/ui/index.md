---
title: 原生UI
group:
  title: 原生UI
---

# 原生UI


## 使用

```jsx
import React, { useRef, useEffect, useState } from "react";
import { Button, Space,InputNumber, Form, ConfigProvider, Pagination } from "antd";
// import '@qingji/web-ui'
import {WebInputs} from '../../../packages/web-ui/src/components/web-input/indexdd.js'


// import {WebInput} from  '@qingji/web-ui'
const Demo = () => {
  const [state, setState] = useState(1)
  const [input, setInput] = useState('11')
  const counterDOM = useRef()
  const handleClick = () => {
   setState(state+1)
  }
  const handleChange = (e) => {
    console.log('ddddnnnnnnnnnnnnnnnnnnn',e.detail)
     setInput(e.detail)
  }
    // <WebInput  value={state} onChange={handleChange}/>
  // useEffect(()=>{
  //   document.addEventListener('change', function() {
  //     console.log("包裹表格包裹表格")
  //     // setInput("顶顶顶顶")
  //   });<WebInputs  value={input} onChange={handleChange}/>
  // <web-input  value={input} onChange={handleChange}/>
  // },[])
  return (
    <div>
     <WebInputs  value={input} onChange={handleChange}/>
      
    </div>
  );
};
export default Demo;
```