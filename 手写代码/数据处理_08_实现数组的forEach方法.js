Array.prototype.myforEach = function (callbackFn) {
  // 判断this是否合法
  if (this === null || this === undefined) {
    throw new TypeError(`cannot read property 'myforEach' of null`)
  }
  // 判断callbackFn是否合法
  // 或者使用 type fn != 'function 来判断
  if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
    throw new TypeError(`${callbackFn} is not a function`)
  }
  // 取到执行方法的数组对象和传入的this对象
  let self = this
  // console.log('self: ', self);  // self:  ['1', '2', '3']
  for (let i = 0; i < self.length; i++) {
    // 执行回调函数，核心代码
    callbackFn(self[i], i, self)
  }
}
  
  
['1', '2', '3'].myforEach((item => {
  console.log(item);
}))