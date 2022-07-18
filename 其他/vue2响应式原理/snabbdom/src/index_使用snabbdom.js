import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");
const btn = document.getElementById('btn')

// // 情况1：新老节点不是同一个节点名称
// // 新建的节点是数据，h就是生成虚拟节点
// const vnode1 = h('h1', {}, '你好h1');
// // 新老节点之间的替换 
// patch(container, vnode);

// const vnode2 = h('div', {}, '你好');
// btn.onclick = function () {
//   patch(vnode1, vnode2)
// }

// 情况2：相同标签的节点
const vnode1 = h('ul', {}, [
  h('li', {key: 'b'}, 'b'),
  h('li', {key: 'c'}, 'c'),
  h('li', {key: 'a'}, 'a'),
])
patch(container, vnode1)
const vnode2 = h('ul', {}, [
  h('li', {key: 'a'}, 'a'),
  h('li', {key: 'b'}, 'b'),
  h('li', {key: 'c'}, 'c'),
])
btn.onclick = function () {
  // 如果在控制台改变li中的代码，发现节点不会内容不会变成a,b,c还是控制台更改的内容
  // 所以这里的替换，只是更改了节点的顺序，并不会删除替换节点
  patch(vnode1, vnode2)
}
// console.log(vnode2);