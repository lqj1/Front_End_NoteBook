/**
 * call 函数实现步骤
 * 1. 判断调用对象是否为函数，即使我们是定义在函数原型上，但是可能出现使用call等方式调用的情况
 * 2. 判断传入上下文对象是否存在，如果不存在，则设置 window
 * 3. 处理传入的参数，截取第一个参数后的所有参数
 * 4. 将函数作为上下文对象的一个属性
 * 5. 使用上下文对象来调用这个方法，并保存返回结果
 * 6. 删除刚才新增的属性
 * 7，返回结果
 */

Function.prototype.myCall = function (context) {
  // 判断调用对象是否为函数
  if (typeof this!== "function") {
    console.error('type error');
  }
  // 获取除了第一项的参数
  let args = [...arguments].slice(1)
  let result = null
  // 判断 context 是否传入，如果未传入则设置为 window
  // 这里的 context 为第一个参数db，而后面的参数需要通过 arguments 获取
  context = context || window
  // 将调用对象设为对象的方法 
  context.fn = this
  // 调用函数
  result = context.fn(...args)
  // 将属性删除
  delete context.fn
  return result
}

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
obj.myFun.myCall(db, '艾欧尼亚', '祖安');        // 德玛西亚 年龄 18  来自 艾欧尼亚去往祖安
// 23行中的 this 为 整个myFun函数
obj.myFun.myCall()                            // 小王 年龄 17  来自undefined 去往undefined
// 21行中，没有参数传入，this指向 window


 obj.myFun.call(db, '艾欧尼亚', '祖安');        // 德玛西亚 年龄 18  来自 艾欧尼亚去往祖安
 obj.myFun.apply(db, ['艾欧尼亚', '祖安']);     // 德玛西亚 年龄 18  来自 艾欧尼亚去往祖安  
 obj.myFun.bind(db, '艾欧尼亚', '祖安')();      // 德玛西亚 年龄 18  来自 艾欧尼亚去往祖安
 obj.myFun.bind(db, ['艾欧尼亚', '祖安'])();    // 德玛西亚 年龄 18  来自 艾欧尼亚, 祖安去往 undefined
 
 // call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔
 // apply 的所有参数都必须放在一个数组里面传进去 
 // bind 除了返回是函数以外，它 的参数和 call 一样。

/**
 * this 指向
 */
// 实例1
var name = '亚索',
  age = 17;
var obj = {
  name: '盲僧',
  objAge: this.age,
  myFun: function () {
    console.log(this.name + '年龄' + this.age); 
  }
}
obj.objAge;  // 17
obj.myFun()  // 盲僧年龄 undefined, this 指向obj,obj中没有 age 属性

// 实例2
var fav = '刀妹'
function shows () {
  console.log(this.fav);
}
shows()  // 刀妹
// 实例1 打印里面的 this 指向 obj，实例2 全局声明的 shows() 函数 this 是 window；
