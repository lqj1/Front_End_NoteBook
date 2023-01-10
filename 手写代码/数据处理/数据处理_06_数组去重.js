/**
 * 给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组
 */

/**
 * 方法1：ES6方法，set 去重
 */
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]
Array.from(new Set(array))  // [1, 2, 3, 5, 9, 8]
// 简写
res = [...new Set([1,2,3,3,5])]


/**
 * 方法2：ES5方法，map 去重，hasOwnProperty
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

/**
 * 方法3：使用双重for 和 splice
 * 从左往右遍历，遍历到当前，对比后面所有的元素，遇到相同的删除
 */
function uniqueArray2 (arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        // 前一个等于后一个，splice删除第二个 
        arr.splice(j, 1)  // 从下标j开始，删除一个，会改变原数组
        j--
      }
    }
  }
  return arr
}


/**
 * 方法4：使用 indexOf 或 includes 加新数组
 */
function uniqueArray3 (arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}

function uniqueArray4 (arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (!results.includes(arr[i])) {
      result.push(arr[i])
    }
  }
  return result
}

/**
 * 方法5：sort排序后，使用快慢指针的思想
 * sort 方法用于从小到大排序(返回一个新数组)
 */
function unique (arr) {
  arr.sort((a,b) => a - b)
  let slow = 1, fast = 1
  while (fast < arr.length) {
    if (arr[fast] != arr[fast-1]) {
      arr[slow++] = arr[fast]
    }
    ++fast
  }
  arr.length = slow
  return arr
}

/**
 * 方法6：filter 配合 indexOf
 * 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
 * 不是那么就证明是重复项，就舍弃
 */
function uniqueArray5 (arr) {
  return arr.filter(function (item, index, arr) {
    return arr.indexOf(item) === index
  })
}

/**
 * 方法7：reduce 配合 includes
 */
function uniqueArray6 (arr) {
  let result = arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur)
    }
    return acc
  }, [])
  return result
}