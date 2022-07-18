// vnode为新的要创建的节点
export default function createElement (vnode) {
  // 创建dom节点
  let domNode = document.createElement(vnode.sel)
  // 判断有没有子节点，children是不是为undefined，undefined表示index.js文件中的 情况1
  if (vnode.children === undefined) {
    domNode.innerText = vnode.text
  } else if(Array.isArray(vnode.children)) {
    // 新的节点有 children（子节点），需要递归创建节点
    for (let child of vnode.children) {
      let childDom = createElement(child)
      domNode.appendChild(childDom)
    }
  }
  // 补充elm属性，elm为真实节点
  vnode.elm = domNode
  return domNode
}