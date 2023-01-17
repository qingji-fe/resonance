export function render(vnode, container) {
  console.log("vnode", vnode); // 虚拟DOM对象
  // vnode _> node
  const node = createNode(vnode, container);
  container.appendChild(node);
}

// 创建真实DOM节点
function createNode(vnode, parentNode) {
  let node = null;
  const {type, props} = vnode;
  if (type === 'text') {
      node = document.createTextNode("");
  } else if (typeof type === "string") {
      node = document.createElement(type);
  } else if (typeof type === "function") {
      node = type.isReactComponent
          ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  } else {
      node = document.createDocumentFragment();
  }
  reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

// 遍历下子vnode，然后把子vnode->真实DOM节点，再插入父node中
function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (Array.isArray(child)) {
          for (let j = 0; j < child.length; j++) {
              render(child[j], node);
          }
      } else {
          render(child, node);
      }
  }
}
function updateNode(node, nextVal) {
  Object.keys(nextVal)
      .filter(k => k !== "children")
      .forEach(k => {
      if (k.slice(0, 2) === "on") {
          let eventName = k.slice(2).toLocaleLowerCase();
          node.addEventListener(eventName, nextVal[k]);
      } else {
          node[k] = nextVal[k];
      }
  });
}

// 返回真实dom节点
// 执行函数
function updateFunctionComponent(vnode, parentNode) {
  const {type, props} = vnode;
  let vvnode = type(props);
  const node = createNode(vvnode, parentNode);
  return node;
}

// 返回真实dom节点
// 先实例化，再执行render函数
function updateClassComponent(vnode, parentNode) {
  const {type, props} = vnode;
  let cmp = new type(props);
  const vvnode = cmp.render();
  const node = createNode(vvnode, parentNode);
  return node;
}