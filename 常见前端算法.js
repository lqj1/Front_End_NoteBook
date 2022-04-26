/**
 * 1. 手写Promise
 * 注意：
 *    1. Promise要暴露then/catch方法
 *    2. Promise构造函数接收一个立即执行的函数callback
 *    3. then/catch只负责把回调放入数组即可
 *    4. resolve/reject负责执行
 *    5. resolve/reject 需要添加宏任务（setTimeout）
 */
function Promise(callback) {
  const pending = 'pending';
  const fulfilled = 'fulfilled';
  const rejected = 'rejected';
  // 当前状态
  this.state = pending;
  // 当前值，成功返回值
  this.value = null;
  // 失败原因
  this.reason = null;
  // 成功和失败的数组对象
  this.fulfilledCallback = [];
  this.rejectedCallback = [];
  // 成功处理
  this.resolve = data => {
    setTimeout(() => {
      // 状态 -> 数据 -> 回调
      if (this.state === pending) {
        this.state = fulfilled;
        this.value = data;
        // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
        this.fulfilledCallback.map(fn => fn(this.value));
      }
    });
  };
  // 失败处理
  this.reject = reason => {
    setTimeout(() => {
      if (this.state === pending) {
        this.state = rejected;
        this.reason = reason;
        this.rejectedCallback.map(fn => fn(this.reason));
      }
    });
  };
  // 捕获成功和失败，扔到成功和失败数组
  this.then = function (successFn, errorFn) {
    this.fulfilledCallback.push(successFn);
    this.rejectedCallback.push(errorFn);
  };
  // 捕获异常，直接扔到异常数组中
  this.catch = errorFn => {
    this.rejectedCallback.push(errorFn);
  };
  // 默认需要执行一次resolve和reject
  callback(this.resolve, this.reject);
}
new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(10);
  }, 1000);
}).then(
  data => {
    console.log('data', data);
  },
  error => {
    console.log('err', error);
  }
);

/**
 * 2. compose 组合函数实现
 *    1. 后一个函数作为前一个函数的参数
 *    2. 最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个
 */
// reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
// reduce() 可以作为一个高阶函数，用于函数的 compose。

function compose(...fns) {
  //忽略
}
// compose(f,g)(x) === f(g(x))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m,n)(x) === f(g(m(n(x))))
//···
// 原代码
let n = '3.56';
let data = parseFloat(n);
let result = Math.round(data);
// 最终结果 result为4
// 改写
let n = '3.56';
let number = compose(Math.round, parseFloat);
let result = number(n);
// 最终结果 result为4
// demo
const add = num => num + 10;
const multiply = num => num * 2;
const foo = compose(multiply, add);
foo(5); // 30，后一个函数返回值传给前一个
// 聚合函数--实例
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 10;
}
function fn3(x) {
  return x * 10;
}
function fn4(x) {
  return x / 10;
}
// fn1执行然后结果作为fn2参数 一直执行到fn4;
fn4(fn3(fn2(fn1(5)))); // 16
// 使用 compose 改写
function compose(...funs) {
  return function proxy(...args) {
    let len = funs.length;
    if (len === 0) {
      return args;
    }
    if (len === 1) {
      return funs[0](...args);
    }
    return funs.reduce((x, y) => {
      return typeof x === 'function' ? y(x(...args)) : y(x);
    });
  };
}
compose()(5); // [5]
compose(fn1, fn2, fn3, fn4)(5); // 16

/**
 * 3. 数组柯里化Curry(求和)
 */
//  实现如下效果：
// curry 实现
function sumA() {
  var arr = [].slice.apply(arguments); // [1, 3]，将参数数组转为真正数组
  var fn = function () {
    arr = arr.concat([].slice.apply(arguments)); // [1, 3, 2, 4]，这里会循环把所有参数数组都遍历完
    return fn;
  };
  // 这里的 arr 就是所有的参数的数组了
  fn.sumOf = function () {
    return arr.reduce((total, num) => total + num, 0); // 第二个参数是初始值
  };
  return fn;
}
console.log(sumA(1, 3)(2, 4)(5, 6).sumOf()); // 21

/**
 * 4. 实现一个 LazyPig
 */
LazyPig('Peggy'); // 输出 Hello, I'm Peggy!
LazyPig('Peggy').sleep(10).eat('dinner');
// 输出
// > Hello, I'm Peggey
// 等待10s后
// > Wake up after 10
// > Eat dinner~
function LazyPig(name) {
  console.log(`Hello, I'm ${name}`);
  var fn = {};
  // 定义 sleep 方法
  fn.sleep = function (time) {
    console.log(`Wake up after ${time}`);
    let start = Date.now();
    while (Date.now() - start <= time) {}
    console.log(`Wake up now`);
    return fn;
  };
  // 定义 eat 方法
  fn.eat = function (food) {
    console.log(`Eat ${food}`);
    return fn;
  };
  return fn;
}
/**
 * 5. 数组扁平化
 */
let list = [1, 5, [9, 8], [2, [1, 9]], 7];
// 第一种方法
// console.log(list.toString().split(','));
// 第二种方法
function flatten(list) {
  return list.reduce((prev, item) => {
    return prev.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}
console.log(flatten(list));

/**
 * 6. 对象扁平化
 *    1. 请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果
 */
// 示例
var input = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
};
var output = flatten(input);
// output 如下
// {
//   "a": 1,
//   "b[0]": 1,
//   "b[1]": 2,
//   "b[2].c": true,
//   "b[3][0]": 3,
//   "d.e": 2,
//   "d.f": 3,
//   // "g": null, 值为null或者undefined，丢弃
// }
let result = {};
var flatten = (data, key) => {
  if (data instanceof Array) {
    data.forEach((param, index) => {
      if (param instanceof Object) {
        flatten(param, `${key}[${index}]`);
      } else {
        result[`${key}[${index}]`] = param;
      }
    });
  } else if (data instanceof Object) {
    for (var itemKey in data) {
      const itemValue = data[itemKey];
      if (itemValue instanceof Object) {
        flatten(itemValue, itemKey);
      } else if (itemValue) {
      }
    }
  }
};

Array.prototype.myMap = function (fn) {
  // 判断输入的第一个参数是不是函数
  if (typeof fn !== 'function') {
    throw new TypeError(fn + 'is not a function');
  }
  // 获取需要处理的数组内容，数组.方法，所以 this 就是数组本身
  const arr = this;
  const len = arr.length;
  // 新建一个空数组用于装载新的内容
  const temp = new Array(len);
  // 对数组中的每个值进行处理
  for (let i = 0; i < len; i++) {
    // 获取第二个参数，改变this指向
    let result = fn.call(arguments[1], arr[i], i, arr);
    temp[i] = result;
  }
  // 返回新结果
  return temp;
};
const arr = [1, 2, 3, 4];
const newArr = arr.myMap(value => value * 3);
console.log(arr); // [ 1, 2, 3, 4 ] 原数组不变
console.log(newArr); // [ 3, 6, 9, 12 ]
