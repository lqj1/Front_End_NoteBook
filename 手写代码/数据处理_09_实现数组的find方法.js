/**
 * find: 返回满足条件的第一个元素
 */

Array.prototype.myFind = function (fn) {
  if (typeof fn !== 'function') {
    console.error('参数必须是一个函数')
  }
  let self = this
  const res = []
  for (let i = 0; i < self.length; i++) {
    // 如果找到满足，直接返回
    if (fn(self[i], i, self)) {
      return self[i]
    }
  }
  return res
}

let arr = [6, 10, 11]
let findArray = arr.myFind((item) => {
	return item > 9
})
console.log(findArray)