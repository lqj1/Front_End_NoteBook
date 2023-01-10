/**
 * 实现 Object.create 方法
 */
function create(proto) {
  function Fn () { }
  Fn.prototype = proto
  Fn.prototype.constructor = Fn  // 上面修改了原型，需要重新定义 constructor 的指向
  return new Fn()
}
let demo = {
  c: '123'
}
Object.create(demo)