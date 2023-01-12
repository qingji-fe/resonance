import { render } from './runtime/render'
function Component (options = {}) {
  return (target) => {
    console.log("targettarget", target)
    let Custom = class extends target {
      constructor(props) {
        super(props);
      }
      
      createShadow() {
        let shadow = this.attachShadow({ mode: 'open' });
        return shadow
      }
      connectedCallback() {
        // 创建影子节点
        const shadow =  this.createShadow();
       
        // 渲染组件dom
        const renderDom = this.render();
        render(renderDom, shadow)
        // 放在影子中
        // shadow.appendChild(domeDiv);
        this.connected(shadow);
      }
      connected(shadow) {
        super.connected?.(shadow);
      }
    };
   
    if (!window.customElements.get(options.name)) {
      window.customElements.define(options.name, Custom, options.options || {});
    }
    return Custom;
  };
}
export {
  Component
}