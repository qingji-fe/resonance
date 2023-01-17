import { Component, Props, Emit, Watch } from "@qingji/web-core";
import { extractClass } from '../../utils'
// import styles from './index.less'
import styles from '!!raw-loader!./index.less';

import React, { FC } from "react";

import createComponent from "./convers";

console.log('less', styles)

@Component({
  name: "web-input",
  css: styles
})

export default class WebInput extends HTMLElement {
  $value
  constructor() {
    super();
  }
  
  install() {
    this.$value = this.value;
    Object.defineProperty(this, 'value', {
      get: this.onGetValue,
      set: this.onSetValue
    });
  }
  onGetValue = () => {
    return this.$value || this.value
  }
  onSetValue = (value) => {
    console.log("腹股沟管过过过过过", value, this,)
    this.$value = value;
    this._update()
  }
 

  // text
  @Props({ 
    default: '',
    type: 'String'
  })
  value

  @Props()
  onChange


  // @Emit('change')
  handleChange(e){
   
    if (this?.disabled) {
      return;
    }


   
    const evt = Array.isArray(e) && e.length? e[0]: e;
    const value = evt.target.value;
   
   
    console.log("供热费value",this.props, this.value, evt, this.fire)
    // if (this.onChange) {
    //   console.log("托管人分为", this, this?.onChange,this?.value)
    //   return this.onChange(evt, value);
    // }
    //  else {
      this._dispatchEvent('change', value);
    // }
    // this.value = evt.target.value;
    return this.value
  }

  render() {
  
  console.log("供热费定位dddd", this)

    return(
      <input
        value = {this.value}
        onChange = {this.handleChange.bind(this)}
        {...extractClass({}, 'web-input', {})}
      />
    );
  }
}

// const WebInputs = () => {
//   return 
// }

const WebInputsEvent = createComponent(
  React,
  "web-input",
  WebInput,
  {
    onChange: "change",
  }
);
const WebInputs = (props)=> {
  console.log("props", props)
  return <WebInputsEvent {...props}/>
}
console.log("WebInputsWebInputs", WebInputs)
export {
  WebInputs
}