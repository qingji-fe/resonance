import { Component, Props } from "@qingji/web-core";
import { extractClass } from '../../utils'
// import styles from './index.less'
import styles from '!!raw-loader!./index.less';

console.log('less', styles)
@Component({
  name: "web-button",
  css: styles
})
export class WebButton extends HTMLElement {
  constructor(props) {
    super(props);
  }
  
  // disabled
  @Props({ 
    default: false,
    type: 'Boolean'
  })
  disabled

  // text
  @Props({ 
    default: 'primary',
    type: 'String'
  })
  type


  render() {
    return(
      <button 
        class={'web-button'}
        disabled={this.disabled}
        {...extractClass({}, 'web-button', {
          [this.type]: this.type
      })}
      >
        <slot/>
      </button>
    );
  }
}
