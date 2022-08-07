/**
 * 原生的reduce是在Array的原型对象上的一个方法，其接收两个参数：
 * 1. 一个回调函数。这个回调函数的前两个参数，分别表示累积值和当前值
 * 2. 初始值
 */ 

Array.prototype.myReduce = function (callbackFn, initialValue) {
  console.log('callbackFn', callbackFn);
  let self = this, accumulator = initialValue
  let i = 0
  // 判断是否传入初始值
  if (accumulator === undefined) {
    // 没有空数组作为初始值，调用 reduce 会报错
    if (self.length === 0) {
      throw new Error(`need one argument at least`)
    }
    // 初始值赋值为数组第一个元素
    initialValue = self[i]
    i++
  }
  for (; i < self.length; i++) {
    // 计算累加结果赋值给初始值
    accumulator = callbackFn(accumulator,self[i], i, self)
  }
  return accumulator
}

// reduce应用
let arr = [1,2,3,4]
let sum = arr.myReduce((pre,cur,index)=>{
  return pre+cur
},0)
console.log(sum) //10