/**
 * Object.create(prop, props)
 * 参数1：原型
 * 参数2：属性的描述，和Object.definePerperties的第二个参数一致
 * 思路：根据传入的原型，以及属性的描述，生成一个对象
 */
const create = (prop, props) => {
  // 判断传入的是否是函数或对象
  if (!['object', 'function'].includes(typeof prop)) {
    throw new Error(`Object prototype may only be an object or null, ${prop}`)
  }
  // 创造构造函数
  const Ctor = function () { }
  // 赋值原型
  Ctor.prototype = prop
  // 创建实例
  const obj = new Ctor()
  // 支持第二个参数
  if (props) {
    Object.defineProperties(obj, props)
  }
  // 支持空原型
  if (prop === null) {
    obj.__protp__ = null
  }
  return obj
}