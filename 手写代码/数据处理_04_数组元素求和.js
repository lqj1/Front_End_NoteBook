// arr=[1,2,3,4,5,6,7,8,9,10]，求和
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let sum = arr.reduce((total,arrI)=>total+=arrI,0)
console.log(sum);

// arr=[1,2,3,[[4,5],6],7,8,9]，求和
let arr2 = [1, 2, 3, [[4, 5], 6], 7, 8, 9]
let arr3 = arr2.toString().split(',').reduce((total, i) => total += Number(i), 0)

// 递归实现
let arr4 = [1, 2, 3, 4, 5, 6]
function add (arr4) {
  if (arr4.length == 1) {
    return arr4[0]
  }
  return arr4[0] + add(arr4.slice(1))
}
console.log(add(arr4));  // 21