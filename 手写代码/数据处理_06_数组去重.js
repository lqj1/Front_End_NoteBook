/**
 * 给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组
 */

/**
 * 方法1：ES6方法，set 去重
 */
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]
Array.from(new Set(array))  // [1, 2, 3, 5, 9, 8]

/**
 * 方法2：ES5方法，map 去重
 */
const array2 = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]
function uniqueArray (array) {
  let map = {}
  let res = []
  for (let i = 0; i < array.length; i++) {
    if (!map.hasOwnProperty(array[i])) {
      map[array[i]] = 1
      res.push(array[i])
    }
  }
  return res
}
uniqueArray(array2)
