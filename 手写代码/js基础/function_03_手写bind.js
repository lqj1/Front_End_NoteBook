
Function.prototype.myBind = function (obj, ...args1) {
  let fn = this
  let thisArg = (obj === undefined || obj === null) ? window : Object(obj)
  return function (...args2) {
    thisArg.fn = fn
    let args = [...args1, ...args2]
    let result =thisArg.fn(...args)
    delete thisArg.fn
    return result
  }
}

// 实例
var add = function (x, y) {
  return x * this.m + y * this.n
}
var obj = {
  m: 3,
  n: 4
}
var newAdd = add.myBind(obj, 5)
newAdd(6) // 3*5+4*6=39;
// 使用2
var newAdd2 = add.myBind(obj, 5, 6)
newAdd2(1) // 这里的参数1会被忽略，没有第三个参数，arg2 = 1