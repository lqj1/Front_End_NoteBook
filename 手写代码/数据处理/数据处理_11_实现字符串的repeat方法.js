/**
 * repeat方法：输入字符串s，以及其重复的次数，输出重复的结果，例如输入abc，2，输出abcabc。
 */
/**
 * 方法1：join方法填充空的数组
 */
function repeat (str, n) {
  return (new Array(n+1)).join('str')
}
repeat('abc', 2)
/**
 * 方法2：递归
 */
function repeat2 (str, n) {
  return (n > 0) ? str.concat(repeat2(str, --n)) : ""
}
repeat2('abc', 2)
  

/**
 * join 方法
 */
//  为join方法的参数不传或者传入undefined会默认用逗号分隔
["red","yellow","blue"].join(undefined)  // red,yellow,blue
["red","yellow","blue"].join('|')  // red|yellow|blue