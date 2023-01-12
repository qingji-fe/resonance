function render2(element, parentNode) {
  // 如果是字符串或者数字，直接添加到根节点
  if(typeof element === 'string ' || typeof element === 'number') {
      return parentNode.appendChild(document.createTextNode(element));
  }
  let type, props;
  type = element.type;
  props = element.props;
  if(type && type.isReactComponent) {
      // 如果是类组件，拿到render方法中的内容，也就是React.createElement()的返回值
      let returnElement = new type(props).render();
      type = returnElement.type;
      props = returnElement.props;
  } else if(typeof type === 'function') {
      // 如果是函数组件，直接拿到React.createElement()的返回值
      let returnElement = type(props);
      type = returnElement.type;
      props = returnElement.props;
  }

  let domElement = document.createElement(type);  // 创建一个标签<div></div>、<span></span>之类的
  for(let propName in props) {
      if(propName === 'className') {
          // 如果属性是className，不做处理，直接加到标签上
          domElement.className = props[propName];
      } else if(propName === 'style') {
          // 如果是style，直接设置样式
          let styleObj = props[propName];
          domElement.style.cssText = styleObj;
      } else if(propName === 'children') {
          console.log(props[propName])
          // 如果是children
          if(typeof props[propName] === 'string' || typeof props[propName] === 'number') {
              // 如果内容是文字、数字之类的，把文字、数字放到标签里面
              domElement.appendChild(document.createTextNode(props[propName]));
          } else {
              // 如果里面还有标签，先循环再递归
              props.children.forEach(child => render(child, domElement));
          }
      } else {
          // 其余情况，当做普通属性处理
          domElement.setAttribute(propName,props[propName]);
      }
  }
  parentNode.appendChild(domElement);  // 将所有标签处理完毕后插入跟节点
}

import {render} from 'react-dom'

export  { render };
