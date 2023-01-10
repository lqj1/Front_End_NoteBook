/**
 * 方法1：递归实现
 * 递归循环，一项一项去遍历，如果每一项还是一个数组，就继续往下遍历
 */
let arr = [1, [2, [3, 4, 5]]]
function flatten (arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // concat() 方法用于连接两个或多个数组。
      // concat() 方法不会更改现有数组，而是返回一个新数组，其中包含已连接数组的值。
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
console.log(flatten(arr))

/**
 * 方法2：reduce 方法实现
 * 其实就是对数组的每一项进行处理，那么其实也可以用reduce 来实现数组的拼接，从而简化第一种方法的代码
 */
let arr2 = [1, [2, [3, 4, 5]]]
function flatten2 (arr) {
  return arr.reduce(function (acc, cur) {
    // 初始为空数组，将递归的函数作为 reduce 的第一个参数
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
console.log(flatten2(arr));

/**
 * 方法3：扩展运算符的实现
 * 采用扩展运算符和 some 的方法，两者共同使用，达到数组扁平化的目的
 */
let arr3 = [1, [2, [3, 4, 5]]]
function flatten3 (arr) {
  // some被调用不会改变数组
  // some为数组中的每一个元素执行一次fn函数，直到找到一个使得fn返回 true
  // 找到 arr 中属于数组的项
  // ... 扩展运算符每次只能展开一层
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flatten3(arr3));


/**
 * 方法4：split 和 toString
 * 由于数组会默认带一个 toString 的方法，所以可以把数组直接转换成逗号分隔的字符串，然后再用 split 方法把字符串重新转换为数组
 * toString 可以直接把多层数组展开成为一层
 */
let arr4 = [1, [2, [3, 4]]]
function flatten4 (arr) {
  return arr.toString().split(',')
}
console.log(flatten4(arr4));


/**
 * 方法5：ES6中的flat
 * flat 的语法为：arr.flat([depth])
 * depth 是可以传递数组的展开深度（默认不填、数值是 1），即展开一层数组；
 *       如果层数不确定，参数可以传进 Infinity，代表不论多少层都要展开
 */
let arr5 = [1, [2, [3, 4]]]
function flatten5 (arr) {
  return arr.flat(Infinity)
}
console.log(flatten5(arr5));    // [1,2,3,4,5]


/**
 * 方法6：正则和JSON方法
 * 其中仍然采用了将 JSON.stringify 的方法先转换为字符串，
 * 然后通过正则表达式过滤掉字符串中的数组的方括号，最后再利用 JSON.parse 把它转换成数组
 */
let arr6 = [1, [2, [3, [4, 5]]], 6]
function flatten6 (arr) {
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}
console.log(flatten6(arr6));
