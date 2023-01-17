import { render } from './runtime/render'
import { cssToStyle, initPropsKeys, initWatch, initEvent,getAttrMap, hyphenateReverse,capitalize, formatValue, toDotCase } from './utils2'




function injectEmit(functions, customElement) {
  console.log("functionsfunctions", functions)
  functions.forEach((event) => {
    Object.defineProperty(customElement.prototype, event.methodName, {
      get: function() {
        return function(...args) {
          const result = event.methodFun.call(this, args);
          console.log("resultresultresult", event, result)
          if (result) {
            const evtName = (event.eventName) ? event.eventName: toDotCase(event.methodName);
            console.log("evtNameevtName", evtName, result,customElement,customElement.prototype)
            customElement.prototype._dispatchEvent.call(this,evtName, result);
          }
        };
      }
    });
  });
}



function Component (options = {}) {
  return (target) => {
    console.log("targettarget", target, target.prototype)
    const propsKeys = Reflect.getMetadata(initPropsKeys, target.prototype) ?? [];
    const functions = Reflect.getMetadata(initEvent, target.prototype) ?? [];
    // const watchs= Reflect.getMetadata(initWatch, target.prototype) ?? [];
    console.log("和他个人", functions)
    const propsKeysList = propsKeys.map(item => item.attr);
    
    console.log("给他人非", functions)
    let Element = class extends target {
     
      constructor() {
        super();
        this._shadow = null
        this.props = Object.assign({}, this.constructor.defaultProps, this.props);
      }
      _update() {
        console.log("换一套4人", this.props)
        const renderDom = this.render();
        render(renderDom, this._shadow)
      }
      
      createShadow() {
        let shadow = this._shadow || this.attachShadow({ mode: 'open' });
        // 挂载实例上
        let fc;
        while ((fc = shadow.firstChild)) {
          shadow.removeChild(fc);
        }
        this._shadow = shadow
        return shadow
      }

      createAttrsToProps() {

        const ele = this;
        if (!propsKeysList) return;
        // dom绑定的属性
        console.log("托管人分为", this._shadow)
        const attrMap = getAttrMap(this._shadow.host);
       
        propsKeys.forEach((key) => {
            const attr = hyphenateReverse(key.attr);
            console.log("attrattr", attrMap, attr)
            let val = attrMap[attr];
           
            if (!val) {
                val = ele.getAttribute(attr);
            }
           
            const newValue = formatValue(val, key.type, key.default);
           
            console.log("不供热费定位", newValue)
            this[attr] = newValue;
           
            // this.props[attr] = newValue;
            // this.setAttribute(attr, newValue);
        });
        // const ele = this;

        // console.log("propsKeysList", propsKeysList, this)
        // if (!propsKeysList) return;
        // propsKeys.forEach((key) => {
        //   console.log("回头供热费eleele", ele, key)
        //   const val = ele.getAttribute(hyphenate(key.attr));
        //   console.log("valvalval", ele, val, ele.getAttribute('onChange'))
        //   const formVal = formatValue(val, key.type, key.default);
         
        //   if(key.attr === 'onChange') {
           
        //     this['onChange'] =33
        //   } else {
        //     this[key.attr] = formVal
        //   }
          
        //   console.log("thisthisthisthisthisthis",this)
        
      }
      renderDom() {
        const renderDom = this.render();
        render(renderDom, this._shadow)
      }
      createStyle() {
        // 挂载css
        if(options.css) {
          let style= cssToStyle(options.css);
          console.log("供热费定位ddd", this._shadow, style)
          this._shadow.appendChild(style);
        }
      }
      // 事件触发
      _dispatchEvent(evtName, result) {
        console.log("uj7y6t5r4e3",evtName, result )
        const event = new CustomEvent(evtName, {
          detail: result || null,
          bubbles: true, 
          composed: true
        });
        if (this?._shadow) {
          console.log("发发的辅导辅导辅导", this?._shadow)
            this?._shadow.dispatchEvent(event);
            return;
        }
        this.dispatchEvent(event);
      }
    //   fire(name, data) {
        
    //     const handler = this.props[`on${capitalize(name)}`];
    //     console.log("回头供热费的props", handler, name)
    //     if (handler) {
    //       handler(
    //         new CustomEvent(name, {
    //           detail: data
    //         })
    //       );
    //     } else {
    //       this.dispatchEvent(
    //         new CustomEvent(name, {
    //           detail: data
    //         })
    //       );
    //     }
    // }

      attributeChangedCallback(name, oldValue, newValue) {
        console.log("属性变换", name, oldValue, newValue)
      }

      connectedCallback() {
        // 创建影子节点
        const shadow =  this.createShadow();

        // 注册
        this.install()
       

        console.log("shadowshadowshadow", shadow)

        // 设置属性
        this.createAttrsToProps();

        // 渲染dom
        this.renderDom()

        // 设置样式
        this.createStyle()

        // 挂载shadom
        this._shadow = shadow

        this.renderDom()

        this.connected(shadow);
      }
      disconnectedCallback() {
        this.disConnected();
      }
      disConnected() {
        super.disConnected?.();
      }
      connected(shadow) {
        super.connected?.(shadow);
      }
    };
    Reflect.defineMetadata(initEvent, target, Element);
    
    // injectKeys(propsKeys, watchs, Element);
    //事件处理
    injectEmit(functions, Element);

   
    if (!window.customElements.get(options.name)) {
      window.customElements.define(options.name, Element, options.options || {});
    }
    return Element;
  };
}
export {
  Component
}