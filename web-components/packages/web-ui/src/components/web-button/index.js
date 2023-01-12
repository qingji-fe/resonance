import { Component } from "@qingji/web-core";
@Component({
  name: "web-button"
})
export class WebButton extends HTMLElement {
  constructor() {
    super();
    // const shadowRoot = this.attachShadow({
    //   mode: 'open'
    // })
    // let newDiv = document.createElement("div");
    // // 给它一些内容
    // let newContent = document.createTextNode("Hi there and greetings!");
    // newDiv.appendChild(newContent);
    // shadowRoot.appendChild(newDiv)
    // this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  render() {
    return(
      <button>
        11
      </button>
    );
  }
}
