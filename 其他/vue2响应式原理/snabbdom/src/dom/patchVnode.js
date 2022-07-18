import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function patchVnode (oldVnode, newVnode) {
  // 判断新节点有没有children
  if (newVnode.children === undefined) {  // 新的没有子节点
    // let vnode1 = h('div',{},[])
    // 新节点文本和纠节点文本内容是不是一样的
    if (newVnode.text !== oldVnode.text) {
      // 将新节点文本内容赋值给旧节点
      oldVnode.elm.innerText = newVnode.text
    }
  } else {  // 新的有子节点
    // let vnode1 = h('div',{},[
    // h('span', {}, 'a')
    // ])
    // console.log('新的有子节点');
    if(oldVnode.children!==undefined && oldVnode.children.length > 0) {  // 新虚拟节点有，旧虚拟节点有
      // 最复杂的情况，diff算法的核心
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {  // 新的虚拟节点有，旧的虚拟节点没有
      // console.log(newVnode.children);
      // 遍历新的子节点，将新的虚拟节点的子元素添加到旧的节点
      oldVnode.elm.innerHTML = ''
      for (let child of newVnode.children) {
        let childDom = createElement(child)
        oldVnode.elm.appendChild(childDom)
      }
    }
  }
}