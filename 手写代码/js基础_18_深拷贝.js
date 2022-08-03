/**
 * 浅拷贝： 浅拷贝指的是将一个对象的属性值复制到另一个对象，
 * 如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，
 * 因此两个对象会有同一个引用类型的引用(一个变化，另外一个也会变化)。
 * 浅拷贝可以使用  Object.assign 和展开运算符来实现。
 */

/**
 * 深拷贝： 深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，
 * 它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。
 * 深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于 JSON 的对象格式比 js 的对象格式更加严格，
 * 所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败
 */

// 1. JSON.stringify()
/**
 * JSON.parse(JSON.stringify(obj))是目前比较常用的深拷贝方法之一，
 * 它的原理就是利用JSON.stringify 将js对象序列化（JSON字符串），
 * 再使用JSON.parse来反序列化(还原)js对象。
 * 
 * 这个方法可以简单粗暴的实现深拷贝，但是还存在问题，
 * 拷贝的对象中如果有函数，undefined，symbol，
 * 当使用过JSON.stringify()进行处理之后，都会消失。
 */
let obj1 = {
   a: 0,
   b: {
     c: 0
   }
}
let obj2 = JSON.parse(JSON.stringify(obj1))
obj1.a = 1
obj1.b.c = 1
// 深拷贝之后，对于 obj1 的改变不会影响到 obj2
console.log(obj1); // {a: 1, b: {c: 1}}
console.log(obj2); // {a: 0, b: {c: 0}}

// 2. 函数库lodash的_.cloneDeep方法
var _ = require('lodash');
var obj3 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj4 = _.cloneDeep(obj3);
console.log(obj3.b.f === obj4.b.f);// false

// 手写实现深拷贝
function deepClone (object) {
  if (!object || typeof object !== 'object') {
    return
  }
  let newObject = Array.isArray(object) ? [] : {}
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      // 与浅拷贝只有这一句的区别，如果还是一个对象，就递归调用
      newObject[key] = typeof object[key] === 'object' ? deepClone(object[key]) : object[key]
    }
  }
  return newObject
}

// 手写实现深拷贝2
// 标准的深拷贝 => 引用数据类型(数组,对象)
function deepClone(source) {
  // 最后一层，对象进入为： {str: '111', age: 12}
  // 数组进入为： [1, 2, 3, 4]
  // constructor 构造对象
  // [] => Array(基类)
  // {} => Object
  const targetObj = source.constructor === Array ? [] : {}; // 创建外层容器用于处理
  // 对象就是键值，而数组通过 for in 就直接取了里面的下标，for of 不能遍历对象
  for (let keys in source) {
    // 数组判断hasOwnProperty中的keys是下标，而对象则是键值
    if (source.hasOwnProperty(keys)) {
      // keys 一共3种 =>  1. 基础数据类型 2.对象 3.数组
      // console.log('source: ', source[keys]);  // 数组没有key，但属于object，所以会进入下面的判断
      if (source[keys] && typeof source[keys] === 'object') {
        // 引用数据类型 => 1.数组 2.对象
        // 内层也可能是对象或数组，创建内层容器
        console.log('source: ', source[keys]);
        targetObj[keys] = source[keys].constructor === Array ? [] : {}; // 维护层代码，可以删除
        targetObj[keys] = deepClone(source[keys]); // 递归
      } else {
        // 基本数据类型，以及一维数组和一层的对象就进入这里的判断
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
let objA = {
  ff: 'name',
  gg: 1,
  obj: { str: '111', age: 12 },
  arr: [1, 2, 3, 4],
};
let newObj = deepClone(objA);
newObj.ff = 'test';
newObj.arr.push('1');
console.log(objA, newObj);

// 简写
function deepClone (source) {
  const targetObj = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source.hasOwnProperty) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}