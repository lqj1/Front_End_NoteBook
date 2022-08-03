/**
 * 概念：浅拷贝是指一个对象对原始对象的属性值进行精确的拷贝，如果拷贝的是基本数据类型，拷贝就是基本数据类型的值
 *      如果是引用数据类型，拷贝的就是内存地址。
 *      如果一个对象的引用内存地址发生改变，另一个对象也会发生变化。
 */

// 1. Object.assign()
/**
 * object.assign() 是es6中对象的拷贝方法，接受的第一个参数是目标对象，其余参数是源对象
 * 用法：object.assign(target, source_1, ...)，该方法可以实现浅拷贝，也可以实现一堆对象的深拷贝
 */
/**
 * 注意
 * 1. Object.assign() 只有第一层是深拷贝，后面层都是浅拷贝
 * 2. 如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性
 * 3. 如果该函数只有一个参数，当参数为对象时，直接返回对象；当参数不是对象时，会先将参数转为对象然后返回
 * 4. 因为 null 和 undefined 不能转化为对象，所以第一个参数不能为 null 或 undefined，会报错
 */
let target = { a: 1 }
let object1 = { b: 2 }
let object2 = { c: 3 }
Object.assign(target, object1, object2)
console.log(target);    // {a: 1, b: 2, c: 3}

// 2. 扩展运算符
/**
 * 使用扩展运算符，可以在构造字面量对象的时候，进行属性的拷贝
 * 语法：let cloneObj = {...obj}
 */
let obj1 = { a:1, b:{c:1}}
let obj2 = { ...obj1 }
obj1.a = 2
//  第一层是 深拷贝，而后的层次就是浅拷贝，会互相影响
console.log(obj1);  //{a:2,b:{c:1}}
console.log(obj2);  //{a:1,b:{c:1}}
obj1.b.c = 2
console.log(obj1);  //{a:2,b:{c:2}}
console.log(obj2);  //{a:1,b:{c:2}}

// 3. 数组方式实现数组浅拷贝
// 3.1 Array.prototype.slice
/**
 * slice() 方法是 JavaScript 数组的一个方法，这个方法可以从数组中返回选定的元素
 * 用法：array.slice(start, end)，该方法不会改变原始数组
 * 该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝
 */
let arr = [1,2,3,4]
console.log(arr.slice());  // [1,2,3,4]
console.log(arr.slice() === arr);  // false

// 3.2 Array.prototype.concat
/**
 * concat() 方法用于合并两个或多个数组，此方法不会更改现有数组，而是返回一个新数组
 * 该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝
 */
let arr2 = [1,2,3,4]
console.log(arr2.concat());  // [1,2,3,4]
console.log(arr2.concat() === arr2);  // false

// 手写实现浅拷贝
function shallowCopy (object) {
  // 只拷贝对象
  if (!object || typeof object !== 'object') {
    return
  }
  // 根据 object 类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};
  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    // 数组key下标和对象的key键都可以通过下面的判断
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key]
    }
  }
  return newObject;
}
// 使用
let arr3 = {a:1,b:{c:2}}
console.log(shallowCopy(arr3))


// 简写
function shallowCopy (object) {
  if (!object || typeof object !== 'object') {
    return 
  }
  let newObject = Array.isArray(object) ? [] : {}
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key]
    }
  }
  return newObject
}

