// vue 更新两条线
// 1. 初始化 patch(container, vnode) => createElement
// 2. 更新 update(vnode, newVnode)
function createElement(vnode) {
  // 虚拟dom生成的三要素
  let tag = vnode.tag; // 目标元素 ul，这个是不可缺少的
  let attrs = vnode.attrs || {}; // 目标元素上的属性
  let children = vnode.children || []; // 目标元素上的子节点
  // 没有目标元素，返回空
  if (!tag) {
    return null;
  }
  // 1. 定义元素接收，传div就创建div，创建对应的dom
  let elem = document.createElement(tag);
  // 2. 给dom添加属性
  for (let attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      // class -> 属性，值
      elem.setAttribute(attrName, attrs[attrName]);
    }
  }
  // 3. 将子元素添加到目标之上
  children.forEach(function (childVnode) {
    elem.appendChild(createElement(childVnode));
  });
  return elem;
}
function updateChildren(vnode, newVnode) {
  let children = vnode.children || []; // 现有节点
  let newChildren = newVnode.children || []; // 新节点
  children.forEach(function (childrenVnode, index) {
    // 循环的每一项
    let newChildrenVnode = newChildren[index];
    // 第一层没有变化
    if (childrenVnode.tag === newChildrenVnode.tag) {
      // 深层次递归对比
      updateChildren(childrenVnode, newChildrenVnode);
    } else {
      // 两者 tag 不一样
      replaceNode(childrenVnode, newChildrenVnode);
    }
  });
}
