
/**
 * 递归的应用
 */

Promise.resolve = function (value) {
  if (value instanceof Promise) {
    return value
  }
  return new Promise(resolve => resolve(value))
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => reject(reason))
}