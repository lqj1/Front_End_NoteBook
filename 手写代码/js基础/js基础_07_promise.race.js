/**
 * promise.race 该方法的参数是 Promise 实例数组, 然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行.
 * 因为 Promise 的状态只能改变一次, 那么我们只需要把 Promise.race 中产生的 Promise 对象的 resolve 方法, 
 * 注入到数组中的每一个 Promise 实例中的回调函数中即可.
 */
 Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(p => {
      Promise.resolve(p).then(val => {
        resolve(val)
      }, err => {
        reject(err)
      })
    })
  })
}