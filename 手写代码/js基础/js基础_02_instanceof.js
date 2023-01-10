/**
 * instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
 * 实现步骤
 *  1. 首先获取类型的原型
 *  2. 然后获取对象的原型
 *  3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为null，因为原型链最终为null
 * 参数left：实例
 * 参数right：构造函数
 */
function myInstanceOf (left, right) {
  // 非对象或为null，return false
  if (typeof left !== 'object' || left===null) {
    return false
  }
  // 获取当前对象的实例，也即对象的原型 __protp__
  let proto = Object.getPrototypeOf(left)
  // 获取构造函数的 prototype 对象，这个是不变的对比对象
  let prototype = right.prototype
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) {
      return false
    }
    if (proto === prototype) {
      return true
    }
    // 继续往原型链上找
    proto = Object.getPrototypeOf(proto)
  }
}