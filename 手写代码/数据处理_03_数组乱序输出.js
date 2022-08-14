/**
 * 方法1：
 * 主要实现思路：
 * 1. 取出数组第一个元素，随意产生一个索引值，将该第一个元素和这个索引对应的元素交换
 * 2. 第二次取出数组第二个元素，随机产生一个除了索引为1以外的索引值，并将第二个元素与该索引值对应的元素交换
 * 3. 按照上面的规律执行，直到遍历完成
 */
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let i = 0; i < arr.length; i++) {
  // 保证这个顺序是随机的额，且1-9之间各出现一次
  const randomIndex = Math.round(Math.random()*(arr.length-1-i)) + 1   // 核心，保证在长度中随机选一个数
  console.log(randomIndex);
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]] 
}
console.log(arr)

/**
 * 方法2：
 * 倒序遍历
 */
var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let length2 = arr.length,  //10
  randomIndex2, temp2
while (length) {
  randomIndex2 = Math.floor(Math.random() * length2--)
  // 使用临时变量来交换值
  temp2 = arr[length2]
  arr[length2] = arr[randomIndex2]
  arr[randomIndex2] = temp2
}
console.log(arr2)