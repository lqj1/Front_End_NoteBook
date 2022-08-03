/**
 * some: 判断数组中是否有一项满足条件，如果有返回true，否则返回false
 * 和 every 是相反的概念
 */

Array.prototype.mySome = function (fn) {
  if (typeof fn !== 'function') {
    console.error('参数必须是一个函数')
  }
  let self = this
  const res = []
  for (let i = 0; i < self.length; i++) {
    // 只要有一项满足就返回 true
    if (fn(self[i], i, self)) {
      return true
    } 
  }
  // 遍历完没有满足的，返回 false
  return false
}

let arr = [5, 7, 8]
let isEvery = arr.mySome((item) => {
  return item > 9
})
console.log(isEvery)