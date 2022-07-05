/**
 * 柯里化就是把接受「多个参数」的函数变换成接受一个「单一参数」的函数，
 * 并且返回接受「余下参数」返回结果的一种应用。
 * 思路：
 *    判断传递的参数是否达到执行函数的fn个数
 *    没有达到的话，继续返回新的函数，并且返回curry函数传递剩余参数
 */

/**
 * 方法1
 */
function curry1 (fn, args) {
  // 获取函数需要的参数长度
  let length = fn.length
  args = args || []
  return function () {
    let subArgs = args.slice(0)
    // 拼接得到现有的所有的参数
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i])
    }
    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 如果满足，执行函数
      return fn.apply(this, subArgs)
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      return curry.call(this, fn, subArgs)
    }
  }
}
/**
 * 方法2：es6 实现
 */
function curry2 (fn, ...args) {
  return fn.length <= args.length ? fn(...args) :curry.bind(null,fn, ...args)
}


// 测试用例1
// 柯里化过的add()函数，可以接受部分参数
function add (x, y) {
  return x + y
}
console.log(add(4)(6));  // 10
// 可以创建保存函数
let saveAdd = add(4)
console.log(saveAdd(6));

// 测试用例2
let addSum = (a, b, c) => a+b+c
let add = curry1(addSum)
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1,2,3))
