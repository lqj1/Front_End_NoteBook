/**
 * h函数接受三个参数
 */

import vnode from './vnode'
export default function (sel, data, params) {
  // h 函数的第三个参数类型为字符串（表示它没有子元素）
  if (typeof params === 'string') {
    //  生成一个json的数据结构表示虚拟dom
    return vnode(sel,data,undefined,params,undefined)
  } else if (Array.isArray(params)) {  // h函数的第三个参数，是不是数组，如果是数组【意味着有子元素】
    let children = []
    for (let item of params) {
      children.push(item)
    }
    return vnode(sel,data,children,undefined,undefined)
  }
}