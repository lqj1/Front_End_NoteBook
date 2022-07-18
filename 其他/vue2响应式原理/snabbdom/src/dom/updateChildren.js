import patchVnode from './patchVnode'
import createElement from './createElement';

// 判断两个虚拟节点是否为同一个节点
function sameVnode (vNode1, vNode2) { 
  return vNode1.key == vNode2.key
}

// 参数1：真实dom节点
// 参数2：旧的虚拟节点
// 参数3：新的虚拟节点
export default (parentElm, oldCh, newCh) => {
  // console.log(parentElm, oldCh, newCh);
  let oldStartIdx = 0;              // 旧前的指针
  let oldEndIdx = oldCh.length - 1; // 旧后的指针
  // console.log(oldEndIdx);           // 3
  let newStartIdx = 0;              // 新前的指针
  let newEndIdx = newCh.length - 1; // 新后的指针

  let oldStartVnode = oldCh[0]      // 旧前的虚拟节点
  let oldEndVnode = oldCh[oldEndIdx]// 旧后的虚拟节点
  let newStartVnode = newCh[0]      // 新前虚拟节点
  let newEndVnode = newCh[newEndIdx]// 新后虚拟节点

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('oldStartVnode: ', oldStartVnode);
    console.log('newStartVnode: ', newStartVnode);
    console.log('oldEndVnode: ', oldEndVnode);
    console.log('newEndVnode: ', newEndVnode);
    if (oldStartVnode == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    }
    if (oldEndVnode == undefined) {
      oldEndVnode = oldCh[--oldEndVnode]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      console.log('1');
      // 第一种情况：旧前 和 新前
      patchVnode(oldStartVnode, newStartVnode)  
      if (newStartVnode) {
        newStartVnode.elm = oldStartVnode?.elm
      }
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if ( sameVnode(oldEndVnode,newEndVnode) ) {
      console.log('2');
      // 第二种情况：旧后 和 新后
      patchVnode(oldEndVnode, newEndVnode)
      if (newEndVnode) {
        newEndVnode.elm = oldEndVnode?.elm
      }
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if ( sameVnode(oldStartVnode,newEndVnode) ) {
      console.log('3');
      // 第三种情况：旧前 和 新后
      patchVnode(oldStartVnode, newEndVnode)
      if (newEndVnode) {
        newEndVnode.elm = oldEndVnode?.elm
      }
      // 把旧前指定的节点移动到旧后指向的节点的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      console.log('4');
      // 第四种情况：旧后 和 新前
      patchVnode(oldStartVnode, newEndVnode)
      if (newStartVnode) {
        newStartVnode.elm = oldEndVnode?.elm
      }
      // 将旧后指定的节点移动到旧前指向的节点的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldStartIdx]
      newStartVnode = newCh[++newEndIdx]
    } else {
      // 第五种情况：以上都不满足条件 =>  查找
      console.log('5');
      // 创建一个对象，存虚拟节点（判断新旧有没有相同节点）
      const keyMap = {}
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const key = oldCh[i]?.key;
        if (key) {
          keyMap[key] = i
        }
      }
      // console.log(keyMap);
      // 在旧节点中寻找新前指向的节点
      let idxInOld = keyMapp[newStartVnode.key]
      if (idxInOld) {
        // 能找到，说明该数据在新旧虚拟节点中都存在
        const elmMove = oldCh[idxInOld]
        patchVnode(elmMove, newStartVnode)
        // 处理过的节点，在旧的虚拟节点的数组中，设置为 undefined
        oldCh[idxInOld] = undefined
        parentElm.insertBefore(elmMove.elm,oldStartVnode.elm)
      } else {
        // 如果没有找到，说明是一个新的节点【创建】、
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      // 新数据，指针++
      newStartVnode = newCh[++newStartIdx]
    }
  }
  // 结束while只有两种情况（新增和删除）
  // 1. oldStartIdx > oldEndIdx
  // 2. newStartIdx > newEndIdx
  if (oldStartIdx > oldEndIdx) {
    const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else {
    // 进入删除操作
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm)
    }
  }

}