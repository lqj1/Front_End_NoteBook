
/**
 * filter用于对数组进行过滤。
 * 它创建一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
 * 注意：filter() 不会对空数组进行检测、不会改变原始数组
 */

/**
 * 例1
 * 去除数组中的空字符,null和undefined
 */
var array = ['1', '2', undefined, '3.png', null, '']
var newArray = arr.filter(item => item)
console.log(newArray)
/**
 * 例2
 * 保留数组中的奇数
 */
var array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var newArray = array.filter((item, i, arr) => {
  //函数自身返回的是一个布尔值，只当返回值为true时，当前元素才会存入新的数组中。            
  return item % 2 !== 0;
})
console.log(newArr);   //输出结果：[1, 3, 5, 7, 9]

// 手写实现
Array.prototype.myFilter = function (fn) {
  if (typeof fn !== 'function') {
    console.error('参数必须是一个函数')
  }
  const res = []
  for (let i = 0, len = this.length; i < len; i++) {
    fn(this[i]) && res.push(this[i])
  }
  return res
}