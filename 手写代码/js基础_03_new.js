/**
 * 调用new 会发生以下四件事情
 *  1. 首先创建一个空的对象
 *  2. 设置原型，将对象的原型设置为函数的 prototype 对象
 *  3. 让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）
 *  4. 判断函数的返回值类型，如果是值类型，返回创建的对象；如果是引用类型，返回这个引用类型的对象
 */

// new 的使用
function Person(name, age) {
  this.name = name
  this.age = age
}
const p = new Person('lee', 26)
// new 的作用：根据构造函数创建了一个对象
// 模拟：需要形成如下功能，传入构造函数，传入参数，生成以该构造函数生成的实例

_new(Person, 'xu', 26)

// 手写 new 
// argument为默认的参数列表
function myNew (fn,...args) {    // 参数等价于 arguments
  let newObject = null
  // Array.prototype.shift.call(arguments)中，
  // 就是Array.prototype中有shift的方法，但是本身没有值，
  // 指向了arguments这个类数组对象上，所以才能成功，
  // arguments对象一直都没被改变，就是个this指向问题。

  // shift() 方法从数组中删除第一个元素，并返回该元素的值
  // Array.prototype.shift.call(arguments) 获取参数列表的第一项
  let func = Array.prototype.shift.call(arguments)
  let result = null
  if (typeof func!== 'function') {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  // Object.create 的第一个参数为原型
  newObj = Object.create(func.prototype)
  // 上面代码等价于
  // newObj = new Object()  // 等价于 newObj = {}
  // object.__protp__ = func.prototype

  // 将this指向新建的对象，并执行函数
  // 这里的 arguments 已经被移除了第一个参数
  result = func.apply(newObj, arguments)
  // 判断返回的对象是否存在，存在再判断类型
  let flag = result && (typeof result === 'object' || typeof result === 'function')
  // 如果是真为引用类型，返回这个引用类型的对象，否则为值类型(如null/undefined)，返回创建的对象；
  return flag ? result : newObj
}
// 使用
// myNew(构造函数,初始化参数)
// 情况2：最后的判断为值类型
function Person3(){}; 
myNew(Person3)
Object.create(Person3.prototype)  // 结果:Person3{}    其中__protp__为Object 
Person3.apply(Object.create(Person3.prototype)) // undefined，所以函数最终返回的就是 Person3{} (__protp__为Object)
// 返回的就是 Person3{}，因为函数中没有任何操作


// 简写
function myNew () {
  let newObj = null
  let result = null
  let func = Array.prototype.shift.call(arguments)
  if (typeof func !== 'function') {
    console.error('type error')
    return
  }
  newObj = Object.create(func.prototype)
  result = func.apply(newObj, arguments)
  let flag = result && (typeof result === 'object' || typeof result === 'function')
  return flag ? result : newObj
}