/**
 * every: 判断数组中每一项是否满足条件 
 * 如有是返回true 否则返回false
 */

Array.prototype.myEvery = function (fn) {
  if (typeof fn !== 'function') {
    console.error('参数必须是一个函数')
  }
  let self = this
  const res = []
  for (let i = 0; i < self.length; i++) {
    // 只要有一项不满足就返回 false
    if (!fn(self[i], i, self)) {
      return false
    } 
  }
  // 遍历完没有不满足的，返回 true
  return true
}

let arr = [12, 10, 11]
let isEvery = arr.myEvery((item) => {
  return item > 9
})
console.log(isEvery)