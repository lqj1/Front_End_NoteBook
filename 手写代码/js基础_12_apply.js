/**
 * apply 函数实现步骤
 * 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上，可能出现使用 call 等方式调用的情况
 * 2. 判断传入上下文对象是否存在，如果不存在，则设置 window
 * 3. 将函数作为上下文对象的一个属性
 * 4. 判断参数值是否传入
 * 5. 使用上下文对象来调用这个方法，并保存返回结果
 * 6. 删除刚才新增的属性
 * 7. 返回结果
 */
Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  let result = null
  // 判断 context 是否存在，如果未 传入则为 window
  // 这里的 context 为第一个参数db，而后面的参数需要通过 arguments 获取
  context = context || window
  // 将函数设为对象的方法
  context.fn = this
  // 调用方法，因为传入数组，所以只需要获取第二个参数即可
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  // 将属性删除
  delete context.fn
  return result
}

// 使用
/**
 * call,apply,bind 用法
 */
 var name = '小王', age = 17
 var obj = {
   name: '小张',
   objAge: this.age,
   fun1: function (from, to) {
     // 这里面的 this 指向 window，因为 obj 是对象而不是函数
     console.log(`${this.name} 年龄 ${this.age}`);  
   },
   myFun: function (from, to) {
     console.log(`${this.name} 年龄 ${this.age}  来自${from} 去往${to}`);  
   }
 }
 var db = {
   name: '德玛西亚',
   age: 18
 }
 // 实例2
obj.myFun.myApply(db, ['艾欧尼亚', '祖安']);        // 德玛西亚 年龄 18  来自 艾欧尼亚去往祖安
// 23行中的 this 为 整个myFun函数
obj.myFun.myApply()                              // 小王 年龄 17  来自undefined 去往undefined
// 21行中，没有参数传入，this指向 window
