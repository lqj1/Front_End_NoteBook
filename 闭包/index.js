// 1. 闭包是什么? -- 方法里返回一个方法，内部方法调用外部方法变量
function closePackage() {
  let a = 1;
  return function () {
    return a; // 引用外部变量
  };
}
// 2. 闭包存在的意义？

// a. 延长变量的生命周期
// 例子1：
let a = 'lqj';
function fn1() {
  let b = 1;
  console.log(a); // a 是全局变量，在函数内部也可以访问，保存在全局作用域属性的Script中
}
console.log(b); // b 是函数内的变量，在函数外部无法访问，保存在全局作用域属性的Local中
fn1();
// JS运行时会生成临时的作用域对象AO(active object)，AO中会存放所有方法和局部变量（不包括全局变量），局部变量用完之后就回收
// 例子2：
// 作用域链--查到规则（就近原则）
let name = 'xiaoming';
function fn2() {
  let name = 'xiaohong';
  function fn3(params) {
    let name = 'xiaowang';
    console.log(name);
  }
  fn3();
}
fn2(); // xiaowang,，一级一级往上找，就近原则
// 例子3：
// 闭包是沟通内外部方法的桥梁
function outer() {
  let a1 = 111;
  let a2 = 222;
  return function inner() {
    return a1;
  };
}
function fn5() {
  let getInnerData = outer();
  console.dir(getInnerData); // 返回闭包的整个函数function inner() { return a1; };，通过 dir 可以看到具体结构
}
fn5();
// 这里执行fn5 之后，不会看到 a2，因为a2是函数内部变量，函数执行完之后就回收了
// 但是 a1 是闭包的变量，被延长了声明周期，打印出来的 getInnerData 可以看到 a1 存在 Closure 的闭包中
// b. 创建私有环境
