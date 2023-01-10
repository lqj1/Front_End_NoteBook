/**
 * 
 * 当我们使用 Promise.all() 执行过个 promise 时，只要其中任何一个promise 失败都会执行 reject ，并且 reject 的是第一个抛出的错误信息，只有所有的 promise 都 resolve 时才会调用 .then 中的成功回调
 * 
 * 所以引入 allSettled()，Promise.allSettled() 可以获取数组中每个 promise 的结果，无论成功或失败
 */
 const p1 = Promise.resolve(1) 
 const p2 = Promise.resolve(2) 
 const p3 = new Promise((resolve, reject) => { 
   setTimeout(reject, 1000, 'three'); 
 }); 
  
 Promise.allSettled([p1, p2, p3]) 
 .then(values => { 
     console.log(values) 
 })  
  
 /* 
 [ 
   {status: "fulfilled", value: 1},  
   {status: "fulfilled", value: 2},  
   {status: "rejected", reason: "three"} 
 ] 
 */

 
/**
 * 
 * Promise.allSettled() 方法返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。
 * 
 * 当所有的输入 promises 都被 fulfilled 或 rejected 时，statusesPromise 会解析为一个具有它们状态的数组
 * 1. { status: 'fulfilled', value: value } — 如果对应的 promise 已经 fulfilled
 * 2. {status: 'rejected'， reason: reason} - 如果相应的 promise 已经被 rejected
 */

function allSettled (promises) {
  if (promises.length === 0) {
    return Promise.resolve([])
  }
  const _promises = promises.map(
    item => item instanceof Promise ? item : Promise.resolve(item)
  )
  return new Promise((resolve, reject) => {
    const result = []
    let unSettledPromiseCount = _promises.length
    _promises.forEach((promise, index) => {
      promise.then((value) => {   // 1. 通过
        result[index] = {
          status: 'fulfilled',
          value
        }
        unSettledPromiseCount -= 1
        if (unSettledPromiseCount === 0) {
          resolve(result)
        }
      }, (reason) => {            // 2. 拒绝
        result[index] = {
          status: 'rejected',
          reason
        }
        unSettledPromiseCount -= 1
        if (unSettlePromiseCount === 0) {
          resolve(result)
        }
      })
    })
  })
}
