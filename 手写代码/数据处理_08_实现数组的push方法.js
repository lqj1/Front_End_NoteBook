
/**
 * push方法将一个或者多个元素添加到数组的末尾，并返回该数组的新长度。
 */
Array.prototype.myPush = function () {
  // console.log(this)   // this 表示原数组
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i]
  }
  return this.length
}

const animals = ['pigs', 'goats', 'sheep'];
const count = animals.myPush('cows','dog','cat');
console.log(count);
// expected output: 6
console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows", "dog", "cat"]
