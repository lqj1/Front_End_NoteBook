// 原型 prototype => 函数特有
// 原型链 __proto__ === [[prototype]] => 大家都有

// 原型、原型链、继承三者的关系
// Person是直接继承于Object，Object.__proto__ == null
function Person() {}
Person.prototype.name = '小明';
Person.prototype.age = 18;
Person.prototype.getAge = function () {
  console.log(this.age);
};
// 实例，new关键字创建构造函数，继承原型上的方法和属性
let person1 = new Person();
person1.age = 28;
person1.demo = 'demo';
console.log(person1.name);
person1.getAge();
// 上述就是原型链的继承关系
// 从当前实例属性去查找，找到了就返回，否则就顺着原型链一层层往上找
// 直到找到null为止，如果找到null都没有找到，报错

// 查找某对象的私有属性，这里父级上也没有，所以直接到object上去找到了hasOwnProperty方法
let item;
for (item in person1) {
  if (person1.hasOwnProperty(item)) {
    console.log(item);
  }
}
