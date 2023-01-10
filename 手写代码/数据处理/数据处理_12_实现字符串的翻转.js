/**
 * 在字符串的原型链上添加一个方法，实现字符串翻转：
 * 方法：直接借用数组的 reverse 方法
 */
String.prototype.myReverse = function (a) {
  return a.split('').reverse().join('')
}
var obj = '' // or var obj = new String()
var res = obj.myReverse('hello')
console.log(res);
// 需要注意的是，必须通过实例化对象之后再去调用定义的方法，不然找不到该方法。