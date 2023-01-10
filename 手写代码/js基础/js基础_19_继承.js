/**
 * 大部分面向对象的编程语言，都是通过“类”（class）实现对象的继承。
 * 传统上，JavaScript 语言的继承不通过 class(ES6 引入了class 语法)，
 * 而是通过“原型对象”（prototype）实现。那么在JS中常见的继承方式有几种呢？
 */
/**
 * 继承1：原型链继承
 */
// 父类型
function Animal (name) {
  this.colors = ['black', 'white']
}
Animal.prototype.getColor = function() {
  return this.colors
}
// 原型链继承，需要先有函数，才有函数上的 prototype 属性
function Dog () { }
Dog.prototype = new Animal()

let dog1 = new Dog()
dog1.colors.push('yellow')
let dog2 = new Dog()
console.log(dog2.colors);  // ['black', 'white', 'yellow']
/**
  原型链继承存在的问题：
    问题1：原型中包含的引用类型属性将被所有实例共享；
    问题2：子类在实例化的时候不能给父类构造函数传参；
 */
/**
 * 继承2：借用构造函数继承
 */
function Animal (name) {
  this.name = name
  this.colors = ['red','blue','green']  
  this.getName = function () {
    return this.name
  }
}
function Dog (name) {
  // 内部的this，借用构造函数的属性和方法
  Animal.call(this, name)
}
var instance1 = new Dog()
instance1.colors.push('black')
console.log(instance1.colors)  // 'red,blue,green,black'
var instance2 = new Dog()
console.log(instance2.colors)  // 'red,blue,green'，可见引用类型值是独立的

// 借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。
// 问题：由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法。

/**
 * 继承3：组合继承
 * 组合继承结合了原型链和借用构造函数，将两者的优点集中了起来。
 * 基本的思路是使用原型链继承原型上的属性和方法，而通过借用构造函数继承实例属性。
 * 这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。
 */
function Animal (name) {
  this.name = name
  this.colors = ['black', 'white']
}
Animal.prototype.getName = function () {
  return this.name
}
function Dog (name, age) {
  // 借用构造函数继承
  Animal.call(this, name)  // 继承实例属性，第一次调用 Animal()
  this.age = age
}
// 原型链继承
Dog.prototype = new Animal()     // 继承父类方法，第二次调用 Father()
Dog.prototype.constructor = Dog  // 上面改变了Dog的原型，需要将其上面的 constructor 重新指向
let dog3 = new Dog('奶昔', 2)
dog3.colors.push('brown')
let dog4 = new Dog('哈赤', 1)
console.log(dog4)   // { name: "哈赤", colors: ["black", "white"], age: 1 }
// 实例 dog3 修改属性不影响实例 dog4
/**
 * 1. 组合继承避免了原型链和借用构造函数的缺陷,融合了它们的优点,成为 JavaScript 中最常用的继承模式. 
 *    而且, instanceof 和 isPrototypeOf( )也能用于识别基于组合继承创建的对象.
 * 2. 同时我们还注意到组合继承其实调用了两次父类构造函数, 造成了不必要的消耗, 那么怎样才能避免这种不必要的消耗呢, 这个我们将在后面讲到.
 */

/**
 * 继承4：原型式继承
 * 基本想法：借助原型可以基于已有的对象创建新对象，同时还不必须因此创建自定义的类型。
 */
// 原型式继承的思想可用以下函数来说明：
function object (o) {
  function F () { }
  F.prototype = o
  return new F()
}
var OneDog = {
  name : '哈士奇',
  colors : ['black', 'white']
}
var anotherDog = object(OneDog);
anotherDog.name = "哈士奇2";
anotherDog.colors.push("yellow");
var yetAnotherDog = object(OneDog);
yetAnotherDog.name = "哈士奇3";
yetAnotherDog.colors.push("green");
console.log(Dog.colors);  //"black","white","yellow","green"
// ECMAScript5通过新增 Object.create()方法规范化了原型式继承，
// 这个方法接收两个参数：一个用作新对象原型的对象和一个作为新对象定义额外属性的对象。
var OneDog = {
  name : '哈士奇',
  colors : ['black', 'white']
}
var anotherDog = Object.create(OneDog);
anotherDog.name = "哈士奇2";
anotherDog.colors.push("yellow");
var yetAnotherDog = Object.create(OneDog);
yetAnotherDog.name = "哈士奇3";
yetAnotherDog.colors.push("green");
console.log(Dog.colors);  //"black","white","yellow","green"

/**
 * 继承5：寄生式继承
 * 基本思想：创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，
 * 最后再像真正是它做了所有工作一样返回对象。
 */
function createAnother (original) {
  var clone = object(original)
  clone.sayWang = function () {
    console.log('wangwang');
  }
  return clone
}
var dog = {
  name: '哈士奇',
  colors: ['black', 'white']
}
var anotherDog = createAnother(dog)
anotherDog.sayWang()  // wangwang
// 新对象不仅具有 dog 的所有属性和方法, 而且还被增强了, 拥有了sayWang()方法.
// 注意: 使用寄生式继承来为对象添加函数, 会由于不能做到函数复用而降低效率;这一点与构造函数模式类似.


/**
 * 继承6：寄生组合式继承
 * 基本思想：通过借用函数来继承属性，通过原型链的混成形式来继承方法，不必为了指定子类型的原型而调用超类型的构造函数
 * 
 * 组合继承是 JavaScript 最常用的继承模式; 不过, 它也有自己的不足. 
 * 组合继承最大的问题就是无论什么情况下,都会调用两次父类构造函数: 一次是在创建子类型原型的时候, 另一次是在子类型构造函数内部. 
 * 寄生组合式继承就是为了降低调用父类构造函数的开销而出现的
 * 解决方案：不直接调用父类构造函数给子类原型赋值，而是通过创建空函数 F 获取父类原型的副本。
 */
// 寄生式组合继承写法上和组合继承基本类似，区别是如下这里：
Dog.prototype =  new Animal()
Dog.prototype.constructor = Dog
// 替换为
function F() {}
F.prototype = Animal.prototype
let f = new F()
f.constructor = Dog
Dog.prototype = f

// 稍微封装下上面添加的代码后：
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inheritPrototype(child, parent) {
  let prototype = object(parent.prototype)  // 创建对象
  prototype.constructor = child  // 增强对象
  child.prototype = prototype   // 指定对象
}
inheritPrototype(Dog, Animal)

/**
 * class 实现继承
 */
class Animal {
  constructor(name) {
      this.name = name
  } 
  getName() {
      return this.name
  }
}
class Dog extends Animal {
  constructor(name, age) {
      super(name)
      this.age = age
  }
}