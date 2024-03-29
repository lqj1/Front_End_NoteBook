/**
 * map()方法返回一个新数组，数组中的元素为原始数组调用函数处理后的值，并且按照原始数组元素调用函数处理后的值
 * 注意：map()不会对空数组进行检测，并且不会改变原数组
 */

Array.prototype.myMap = function (fn) {
  if (typeof fn!== 'function') {
    console.error('参数必须是一个函数');
  }
  let self = this
  const res = []
  for (let i = 0; i < self.length; i++) {
    res.push(fn(self[i], i, self))
  }
  return res
}

var arr = [1,2,3]
let newArray = arr.myMap((item, index, arr) => {
	return item*2
})
console.log(newArray)