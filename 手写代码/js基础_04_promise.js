/**
 * 1. 在 new promise 的时候接受一个方法，方法中有 resolve 和 reject 两个方法，分别对应 promise 状态改变时的操作
 * 2. promise 对象内部存在三种状态：pending,fulfilled,rejected
 * 3. 对象创建的时候，会立即传入其中的方法，并且通过 resolve 和 reject 方法改变 state
 * 4. 当 promise.then执行的时候，会传入onFulfilled和onRejected方法，这时候会检查promise内部状态，这里存在三种情况：
 *  4.1 一个是pending的时候，说明状态没有改变有可能是resolve方法被异步加载，那么会被把传入的onFulfilled和onRejected方法push到resolveCallbacks和rejectCallbacks队列当中；
 *  4.2 第二种是fulfilled状态，说明被resolve了，那么就会执行当前的onFulfilled方法
 *  4.3 第三种就是rejected状态，说明被reject了，那么就会执行当前的onRejected方法
 * 5. 如果resolve或者reject被异步了，那么就会先通过then将传入的方法放到callbacks队列中，等到promise内部resolve或者reject方法执行时，清空callbacks上的方法
 * 6. promise返回的是一个promise对象，promise对象.then返回的仍然是一个promise对象
 */
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function myPromise (fn) {
  // 保存初始化状态
  var self = this;
  // 初始化状态
  this.state = PENDING;
  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null;
  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = [];
  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];
  // 状态变为 resolved 方法，并传入值
  function resolve (value) {
    // 判断传入是否为 promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof myPromise) {
      return value.then(resolve, reject)
    }
    // 保证代码执行顺序为 本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 的时候才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED
        // 设置传入的值
        self.value = value
        // 执行回调函数
        self.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0);
  }
  // 状态转变为 rejected 方法
  function reject (value) {
    // 保证代码执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED
        // 设置传入的值
        self.value = value
        // 执行回调函数
        self.rejectedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0);
  }
  // 将两个方法传入函数执行
  try {
    fn(resolve, reject)
  } catch (e) {
    // 遇到错误，捕获错误，执行 reject 函数
    reject(e)
  }
}
myPromise.prototype.then = function (onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value };
  onRejected = typeof onRejected === 'function' ? onRejected : function (error) { throw error };
  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  // 如果状态已经凝固，则直接执行对应状态的函数
  if (this.state === RESOLVE) {
    onResolved(this.value)
  }
  if (this.state === REJECTED) {
    onRejected(this.value)
  }
}
// 使用
console.log("1");
let promise_test = new myPromise((resolve, reject) => {
  // func 会立即执行
  console.log("2");
  setTimeout(() => {
    resolve("3"); // 把 resolve 的内容存在 result 中了
    reject("4");
    console.log(5);
  });
});
promise_test.then(
  (result) => {
    console.log(result, "6");
  },
  (result) => {
    console.log(result, "7");
  }
);
console.log("8");