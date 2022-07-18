### diff算法
- 功能：提升性能
- 虚拟dom => 其实就是数据（将dom变成数据，数据化，然后操纵数据）
- 借鉴主流：snabbdom、virtual-dom

### 环境搭建
- mkdir snabbdom & cd snabbdom
- npm init -y                     //建立 package.json文件
- cnpm install webpack@5 webpack-cli@3 webpack-dev-server@3 -S
- cnpm install snabbdom -S
- 新建 webpack.config.js
- 配置 webpack.config.js

### 虚拟节点和真实节点
- 虚拟节点，通过数据结构表示节点
```
{
  children: undefined,
  data: {}
  ele: h1
  key: undefined
  sel: 'h1'
  text: '你好h1'
}
```
- 真实节点
```
<h2>你好</h2>
```
### 新老节点替换的规则
#### 1. 如果新老节点不是同一个节点名称
- 如果新老节点是同一个节点，那么就暴力删除旧节点，创建插入新节点
```javascript
// =======基本代码======
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
// =======基本代码======

const container = document.getElementById("container");
const btn = document.getElementById('btn')
// 情况1：新老节点不是同一个节点名称
// 新建的节点是数据，h就是生成虚拟节点
const vnode1 = h('h1', {}, '你好h1');
// 新老节点之间的替换 
patch(container, vnode);

const vnode2 = h('div', {}, '你好');
btn.onclick = function () {
  patch(vnode1, vnode2)
}
```
#### 2. 相同节点替换位置
- 如果要提升性能，一定要加入key，key是唯一标识，没有添加key也是暴力
- 只能同级比较，不能跨层比较，跨层级也是暴力替换
- 相同节点，增加或者删除li，只对那个节点进行创建删除，其他节点只做位置更改操作
```javascript
// 情况3：跨层级也是暴力删除方法
const vnode1 = h('ul', {}, [
  h('li', {key: 'b'}, 'b'),
  h('li', {key: 'c'}, 'c'),
  h('li', {key: 'a'}, 'a'),
])
patch(container, vnode1)
const vnode2 = h('ul', {}, [
  h('div',{}, [
    h('li', {key: 'a'}, 'a'),
    h('li', {key: 'b'}, 'b'),
    h('li', {key: 'c'}, 'c'),
  ])
])
btn.onclick = function () {
  // 如果在控制台改变li中的代码，发现节点不会内容不会变成a,b,c还是控制台更改的内容
  // 所以这里的替换，只是更改了节点的顺序，并不会删除替换节点
  patch(vnode1, vnode2)
}
```
- 代码编写
  - 先编写h和vnode函数，然后编写patch
- 将真实的dom转成 旧的虚拟节点
  - patch(旧的虚拟节点,新的虚拟节点)
#### 3. 如果是相同节点，分为以下情况
##### 3.1 新节点有没有children
- 新节点没有children
  - 证明新节点是文本，直接替换文本，不管纠结点是否有孩子，直接用文本替换掉
```javascript
let vnode1 = h('div', {}, '这是container')
let vnode2 = h('div', {}, '你好呀')
patch(vnode1, vnode2)
```
- 新节点有children
  - 【新的节点有children，旧节点没有children】
    - 直接创建元素添加，把旧的内容清空掉，添加新的
  - 【新节点有children，旧节点也有children】，这也是 diff 算法的核心
```javascript
let vnode1 = h('div', {}, {
  h('span', {}, 'bbb')
})
let vnode2 = h('div', {}, {
  h('span', {}, 'aaa')
})
```
    - 这又分为以下几种情况：
    1. 旧前 和 新前
```javascript
// 第一条匹配，指针往下走，++
// node1
h('span', {}, 'a'),
h('span', {}, 'b'),
h('span', {}, 'c')
// node2
h('span', {}, 'a'),
h('span', {}, 'b'),
h('span', {}, 'c')
```
    匹配：旧前的指针++、新前的指针++
    2. 旧后 和 新后
```javascript
// 先匹配 旧前和新前，因为第一条不匹配，所以走 旧后和新后
// 两个c匹配，所以指针向上走，--
// node1
h('span', {}, 'b'),
h('span', {}, 'a'),
h('span', {}, 'c')
// node2
h('span', {}, 'a'),
h('span', {}, 'b'),
h('span', {}, 'c')
``` 
    匹配：旧后的指针--、新前的指针--
    3. 旧前 和 新后
```javascript
// 旧前 和 新前匹配，++，到第三条，不匹配，走第二种旧后，新后，最后一条，不匹配，走第三种，旧前，新后
// node1第三条和node2第四条
// node1
h('span', {}, 'a'),
h('span', {}, 'b'),
h('span', {}, 'c')
h('span', {}, 'd')
// node2
h('span', {}, 'a'),
h('span', {}, 'b'),
h('span', {}, 'd')
h('span', {}, 'c')
``` 
    匹配：旧后的指针++、新前的指针--
    4. 旧后 和 新前
    匹配：旧后的指针--、新前的指针++
```javascript
// 1,2,3,4 匹配
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
])
btn.onclick = function () {
  patch(vnode1, vnode2)
}
// 查找逻辑
// a. 第一种找不到，第二种也找不到，所以就匹配旧节点(vnode1)第一条和新节点(vnode2)最后一条
// b. 然后开始 旧前 新后，也就是旧节点向下走，新节点向上走，进行匹配
// c. 最后是 d,d 匹配，也就是 旧前 和 新前 匹配
// d. 但此时如果旧节点数量和新节点数量不匹配，会发生错误，所以需要进行方法5=>查找逻辑
```
    5. 以上都不满意条件 => 查找
    查找过的节点会设为undefined，后面再查找的时候就直接跳过
    6. 创建或者删除
    遇到新节点中有旧节点中没有的元素，就创建然后新增上

#### 4. 旧的与新的节点数量不匹配
- 结束while只有两种情况（新增和删除）
  - 1. oldStartIdx > oldEndIdx
  - 2. newStartIdx > newEndIdx