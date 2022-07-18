/**
 * 虚拟节点就是通过 h 函数传递参数到 vnode,
 * vnode最终生成一个对象的结构
 */
import h from './dom/h'
import patch from './dom/patch'

// 一、不同节点替换
// 1. 编写 h 和 vnode
// 情况1:为字符串
// let vnode1 = h('div', {}, '你好呀')
// console.log(vnode1);
// {
//   children: undefined
//   data: { }
//   elm: undefined
//   // key: undefined
//   sel: 'div'
//   text: '你好呀'
// }
// 情况2:为数组
// let vnode2 = h('ul', {}, [
//   h('li', {}, 'a'),
//   h('li', {}, 'b'),
//   h('li', {}, 'c'),
//   h('li', {}, '你也好'),
// ])
// console.log(vnode2);

// 2. 编写 patch 函数
// 获取了真实的dom节点
// let container = document.getElementById('container')
// // 虚拟节点
// // 测试案例1
// let vnode1 = h('h1', {}, '你好呀')  // 原有container是div,现在是h1
// patch(container, vnode1)
// 测试案例2
// let vnode2 = h('ul', {}, [
//   h('li', {}, 'a'),
//   h('li', {}, 'b'),
//   h('li', {}, 'c'),
//   h('li', {}, '你也好'),
// ])
// patch(container, vnode2)

// // 二、相同节点替换
// // 1. 两个节点，只有文本不一样
// // 获取了真实的dom节点
// let container = document.getElementById('container')
// // let vnode1 = h('div', {}, '相同节点替换')
// let vnode1 = h('div',{},[
//   h('span', {}, 'a'),
//   h('span', {}, 'b'),
//   h('span', {}, 'c')
// ])
// patch(container, vnode1)


// // 2. 新老节点是否有children
// // 2.1 新节点有children，老节点没有children--直接删除老节点，遍历新节点children并插入旧节点中
// // 获取了真实的dom节点
// let container = document.getElementById('container')
// // let vnode1 = h('div', {}, '相同节点替换')
// let vnode1 = h('div',{},[
//   h('span', {}, 'a'),
//   h('span', {}, 'b'),
//   h('span', {}, 'c')
// ])
// patch(container, vnode1)


// // 2.2 新节点有children，老节点也有children--diff算法核心
// let container = document.getElementById('container')
// let btn = document.getElementById('btn')
// let vnode1 = h('ul',{},[
//   h('li', {key:'a'}, 'a'),
//   h('li', {key:'b'}, 'b'),
//   h('li', {key:'c'}, 'c'),
//   h('li', {key:'d'}, 'd'),
// ])
// patch(container, vnode1)
// let vnode2 = h('ul',{},[
//   h('li', {key:'d'}, 'd'),
//   h('li', {key:'c'}, 'c'),
//   h('li', {key:'b'}, 'b'),
//   h('li', {key:'a'}, 'a'),
// ])
// btn.onclick = function () {
//   patch(vnode1, vnode2)
// }
// // 查找逻辑
// // a. 第一种找不到，第二种也找不到，所以就匹配旧节点(vnode1)第一条和新节点(vnode2)最后一条
// // b. 然后开始 旧前 新后，也就是旧节点向下走，新节点向上走，进行匹配
// // c. 最后是 d,d 匹配，也就是 旧前 和 新前 匹配
// // d. 但此时如果旧节点数量和新节点数量不匹配，会发生错误，所以需要进行方法5=>查找逻辑

// 2.3 新节点有children，老节点也有children--diff算法核心
let container = document.getElementById('container')
let btn = document.getElementById('btn')
let vnode1 = h('ul',{},[
  h('li', {key:'a'}, 'a'),
  h('li', {key:'b'}, 'b'),
  h('li', {key:'c'}, 'c'),
  h('li', {key:'d'}, 'd'),
])
patch(container, vnode1)
let vnode2 = h('ul',{},[
  h('li', {key:'d'}, 'd'),
  h('li', {key:'c'}, 'c'),
  h('li', {key:'b'}, 'b'),
  h('li', {key:'a'}, 'a'),
  // h('li', {key:'e'}, 'e'),
])
btn.onclick = function () {
  patch(vnode1, vnode2)
}
// 查找逻辑
// a. 第一种找不到，第二种也找不到，所以就匹配旧节点(vnode1)第一条和新节点(vnode2)最后一条
// b. 然后开始 旧前 新后，也就是旧节点向下走，新节点向上走，进行匹配
// c. 最后是 d,d 匹配，也就是 旧前 和 新前 匹配
// d. 但此时如果旧节点数量和新节点数量不匹配，会发生错误，所以需要进行方法5=>查找逻辑
