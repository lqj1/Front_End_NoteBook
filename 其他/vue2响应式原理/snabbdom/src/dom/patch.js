// oldVnode => 旧虚拟节点
// newVnode => 新虚拟节点
import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function (oldVnode, newVnode) {
  // 步骤1
  // 如果 oldVnode没有sel，就证明是非虚拟节点，非虚拟节点就变成虚拟节点
  // 真实节点的第一个参数sel是标签名称
  if (oldVnode.sel === undefined) {
    // 将真实node变成虚拟vnode
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),  // sel
      {},  // data
      [],  // children
      undefined,
      oldVnode
    )
  }
  // 判断旧的虚拟节点和新的虚拟节点是否是同一个节点
  if (oldVnode.sel === newVnode.sel) {
    // 是的话，判断条件就复杂了
    // console.log('111');
    // 用于相同节点替换
    patchVnode(oldVnode, newVnode)
  } else {
    // 不是同一个节点，那么就暴力删除旧的节点，创建插入新的节点
    // 把新的虚拟节点创建为dom节点
    let newVnodeElm = createElement(newVnode)
    // 新的节点
    // console.log('oldVnode', oldVnode);
    // 获取旧的虚拟节点，
    let oldVnodeElm = oldVnode.elm
    // 创建新节点
    if (newVnodeElm) {
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm)
    }
    // 删除旧节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm)
  }
}