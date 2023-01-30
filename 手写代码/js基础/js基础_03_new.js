/**
 * 调用new 会发生以下四件事情
 *  1. 首先创建一个空的对象
 *  2. 设置原型，将对象的原型设置为函数的 prototype 对象
 *  3. 让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）
 *  4. 判断函数的返回值类型，如果是值类型，返回创建的对象；如果是引用类型，返回这个引用类型的对象
 */

function realizeNew() {
  // 1. 创建一个空的对象
  let obj = {};  // 或者 let obj = new Object();
  // 我们创建的时候调用 realizeNew (Person,"Curry",18)，所以第一个参数就是构造函数
  // 2. 获取构造函数，同时弹出arguments中第一个参数，也就是构造函数
  // 所以这里 Con 就是 Person的构造函数
  let Con = [].shift.call(arguments);
  // 3. 链接到原型（给obj这个新生对象的原型指向它的构造函数的原型）
  // obj可以访问构造函数原型中的属性
  Object.setPrototypeOf(obj, Con.prototype); 
  // 或者obj.__proto__ = Con.prototype; // 但__proto__已不被推荐使用
  // 4. 绑定this，将原来构造函数的this绑定到新创建的对象
  let result = Con.apply(obj, arguments);
  // 5. 确保返回的new出来的东西是一个对象，就是【判断构造器有没有返回对象】
  // 如果【构造器没有手动返回对象，有些构造函数没有返回任何东西，如以下的Person】，则返回第一步创建的新对象，
  // 如果有，则舍弃掉第一步创建的新对象，返回手动return的对象
  return typeof result === 'object' ? result : obj
}


// ****【去注释版本】****
function realizeNew () {
  let obj = {}
  let Con = [].slice.call(arguments)
  Object.setPrototypeOf(obj, Con.prototype)
  let result = Con.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}


// 测试1
function Person (name,age){
  this.name = name;
  this.age = age;
  this.say = function () {
      console.log("I am " + this.name)
  }
}

//通过new创建构造实例
let person1 = new Person("Curry",18);
console.log(person1.name);      //"Curry"
console.log(person1.age);       //18
person1.say();                  //"I am Curry'

//通过realize()方法创造实例
let person2 = realizeNew(Person, "Curry", 18); 
// 此时的 18 行代码执行之后的 obj 如下：Person { name: 'Curry', age: 18, say: f },  f 的内容如下
// ƒ() {
//   console.log("I am " + this.name)
// }
console.log(person2.name);      //"Curry"
console.log(person2.age);       //18
person2.say();                  //"I am Curry'

// 测试2
function Person (name,age){
  this.name = name;
  this.age = age;
  this.say = function () {
      console.log("I am " + this.name)
  }
  return 'test'
}
// 这时候25行判断的 result 就是 string, 但是 obj 依然返回 Person { name: 'Curry', age: 18, say: f } 对象


// 测试3
function Person (name,age){
  this.name = name;
  this.age = age;
  this.say = function () {
      console.log("I am " + this.name)
  }
  return { name: 'lqj', age: '20' }
}
let person3 = new Person("Curry",18);
// 这时候返回的 result 是 {name: 'lqj', age: '20'}, obj 返回依然是上述 Person 对象
// 新建 person3 对象的时候，输出的 name 和 age 还是 Curry,18，不受 return 的影响


// 正常对象
function Person (name) {
  var object = {};
  object.name = name;
  object.age = 21;
  return object;
}


