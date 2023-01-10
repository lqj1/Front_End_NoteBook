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
Function.prototype.myApply = function (thisArg, ...args) {
  let fn = this
  thisArg = (thisArg === undefined || thisArg === null) ? window : Object(thisArg)
  thisArg.fn = fn
  args = args || []
  let result = thisArg.fn(...args)
  delete thisArg.fn  // //执行完之后就删除该对象上的属性
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
