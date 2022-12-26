
/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 * 输入：2
 * 输出：2
 * 青蛙要跳上两级台阶有两种跳法，分别是：先跳一级，再跳一级或者直接跳两级。因此答案为2   
 * @param {*} n 
 * @returns 
 */
function fib (n) {
  if(n == 1) {
      return 1 
  } 
  if(n == 2) {
      return 2
  }
  return fib(n-1)+fib(n-2)
}

var n = parseInt(readline())
print(fib(n))
