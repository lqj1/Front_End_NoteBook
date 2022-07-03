/**
 * 使用 typeof 来判断数据类型，只能区分基本类型，即 "number"，"string"，"undefined"，"boolean"，"object" 五种
 * 对于[数组、对象]来说，其关系错综复杂，使用 typeof 都会统一返回 "object" 字符串
 * 此时，我们可以使用 Object.prototype.toString.call(var) 能判断具体的类型数组
 */

// 手写实现
function getType (value) {
  // 判断是否 null
  if (value === null) {
    return value + ''
  }
  // 判断数据是否 引用类型
  if (typeof value === 'object') {
    // eg: [object Array]
    let valClass = Object.prototype.toString.call(value)
    let type = valClass.split(' ')[1].split('')  // ['A', 'r', 'r', 'a', 'y', ']']
    type.pop()  // ['A', 'r', 'r', 'a', 'y']
    return type.join('').toLowerCase()  // Array
  } else {
    // 判断是否基本类型，或者函数
    return typeof value;
  }
}

/**
 * 补充知识
 * Object.prototype.toString.call 的使用
 */
// 1. 判断基本数据类型
Object.prototype.toString.call(null);      // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call("abc");     // "[object String]"
Object.prototype.toString.call(123);       // "[object Number]"
Object.prototype.toString.call(true);      // "[object Boolean]"
// 2. 判断引用类型
// 2.1 函数类型
function fn () {
  console.log('test');
}
Object.prototype.toString.call(fn)  // "[object Function]"
// 2.2 日期类型
var date = new Date()
Object.prototype.toString.call(date)  // "[object Date]"
// 2.3 数组类型
var arr = [1,2,3]
Object.prototype.toString.call(arr)  // "[object Array]"
// 2.4 正则表达式
var reg = /[hdb]at/gi;
Object.prototype.toString.call(reg)  // "[object RegExp]"
// 2.5 自定义类型

function Person(name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person("Rose", 18);
Object.prototype.toString.call(arr); //”[object Object]”

/**
 * Object.prototype.toString.call(obj)类型检测原理
 */
// 这句话的意思是让我们用Object原型上的toString方法作用在传入的obj的上下文中（通过call将this指向obj），
// 那么我们知道数组本身也有toString()方法，那我们为什么非要用Object上的呢？

Object.toString()             //"function Object() { [native code] }"
Object.prototype.toString()   //"[object Object]"
// 我们可以看出Object对象和它的原型链上各自有一个toString()方法，第一个返回的是一个函数，第二个返回的是值类型。

// 所有类在继承Object的时候，改写了toString()方法。
// Object原型上的方法是可以输出数据类型的。
// 因此我们想判断数据类型时，也只能使用原始方法。
// 继而有了此方法：Object.prototype.toString.call(obj)
