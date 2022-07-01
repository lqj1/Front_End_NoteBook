/**
 * 核心思路：
 *  1. 接收一个 Promise 实例的数组或具有 Iterator 接口的对象作为参数
 *  2. 这个方法返回一个新的 promise 对象
 *  3. 遍历传入的参数，用 Promise.resolve() 将参数“包一层”，使其变成一个 promise 对象
 *  4. 参数所有回调成功才是成功，返回值数组与参数顺序一致
 *  5. 参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息
 */

function promiseAll (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`argument must be a array`)
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(value => {
        resolvedCounter++;
        // 将值存入resolvedResult中
        resolvedResult[i] = value;
        if (resolvedCounter == promiseNum) {
          // 全部通过就 resolve,这里有resolve才会输出 resolvedResult:[3,1,2]
          return resolve(resolvedResult)
        }
      },error => {
        // 有一个错就 reject
        return reject(error)
      })
    }
  })
} 
// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(1)
  }, 1000); 
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(3)
  }, 3000)
})
promiseAll([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})