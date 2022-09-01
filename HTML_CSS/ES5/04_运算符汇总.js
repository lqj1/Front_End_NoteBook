// 1. 阶乘
/**
 * 请补全JavaScript函数，要求返回数字参数的阶乘。
 * 注意：参数为大于等于0的整数。
 * @param {*} number 
 */

// 方法1:循环实现
function _factorial(number) {
  // 补全代码
  let res = number
  while (number > 1) {
    res = res * (number - 1)
    number -= 1
  } 
  return res
}
console.log(_factorial(3))

// 方法2:递归
function _factorial (number) {
  if (number == 1) {
    return 1
  } else {
    return number*_factorial(number-1)
  }
}

// 2. 绝对值
/**
 * 请补全JavaScript函数，要求返回数字参数的绝对值。
 * @param {*} number 
 */
function _abs(number) {
  // 补全代码
  // 方法1: 
  return Math.abs(number)
  // 方法2: 三元运算符
  return number > 0 ? number : -number
  // 方法3: 递归
  if (number > 0) {
    return number
  } else {
    return -number
  }
}

// 3. 幂
/**
 * 请补全JavaScript函数，要求返回底数为第一个参数，幂为第二个参数的数值。
 * @param {*} number 
 * @param {*} power 
 */
function _pow(number,power) {
  // 补全代码
  // 方法1:
  return Math.pow(number, power)
  // 方法2: for循环
  let res = 1
  for (let i = 0; i < power; i++) {
    res = res * number
  }
  return res
}

// 4. 平方根
/**
 * 请补全JavaScript函数，要求返回数字参数的平方根。
 * @param {*} number 
 */
function _sqrt(number) {
  // 补全代码
  
}