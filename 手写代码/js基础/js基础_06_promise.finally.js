
// finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
// promise.finally 手写
Promise.prototype.finally = function (cb) {
  return this.then(function (value) {
    return Promise.resolve(cb()).then(function () {
      return value
    })
  }, function (err) {
    return Promise.resolve(cb()).then(function () {
      throw err
    })
  })
}