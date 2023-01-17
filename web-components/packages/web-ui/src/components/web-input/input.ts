import { WebComponent, WebComponentTag } from "@qingji/web-core";

import React, { FC } from "react";
// import css from '!!raw-loader!./index.less';
// import * as css from './index.less';

@WebComponentTag({ name: 'web-input' })

export default class WebInputNative extends WebComponent {
    // css = css.default ? css.default : css
    static propTypes = {
      value: String
    }
    defaultProps = {
      value: ''
    }
    $value
    constructor() {
      super();
    }
    install() {
      this.$value = this.props.value;
      Object.defineProperty(this, 'value', {
        get: this.onGetValue,
        set: this.onSetValue
      });
    }
    onGetValue = () => {
      return this.$value;
    }
    onSetValue = (value) => {
      this.$value = value;
      this.props.value = value;
      this.setAttribute('value', value);
    }
    /**
     * 输入框输入值修改
     * @param evt
     */
    handleChange = (evt) => {
      this.$value = evt.target.value;
      this.props.value = evt.target.value;
      console.log("回头供热费", this.props, this.onChange,this._dispatchEvent)

      if (this.props.onChange) {
        this.props.onChange(evt);
      } else {
        this._dispatchEvent('change', this.props.value);
      }
    }
    render(props) {
      const { ...otherProps } = props;
      console.log("回头供热费asdfasdf", this.value)
      return (
        <div>
          <input  
            value = {this.value}
            onChange={this.handleChange}
          />
        </div>
      );
    }
}


declare global {
  namespace JSX {
    interface IntrinsicElements {
      "web-input": any;
    }
  }
}