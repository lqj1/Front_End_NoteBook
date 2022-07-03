/**
 * bind 函数的实现步骤
 * 1. 判断调用对象是否为函数，即使我们是定义在函数原型上，但是可能出现使用call等方式调用的情况
 * 2. 保存当前函数的引用，获取其余传入参数值
 * 3. 创建一个函数返回
 * 4. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，
 *    这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象
 */

/**
 * 解析
 * bind与call和apply方法不同，bind返回的是创建的新函数，而不是像call、apply那样立即执行调用它的函数。
 */
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 获取参数，这里参数为实例obj中的 name,age以及print函数
  let args = [...arguments].slice(1)
  let fn = this
  return function Fn () {
    // 根据调用方式，传入不同的绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    )
  }
}
// 实例
let obj = {
  name: "xx",
  age: 18,
  print() {
      console.log(`name:${this.name},age:${this.age}`);
  },
};
// obj.print();  // name:xx,age:18
let printFn = obj.print.myBind(obj);
printFn();      // name:xx,age:18