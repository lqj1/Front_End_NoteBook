/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶(n为正整数)总共有多少种跳法。
 * f(n)=f(n-1)+.....f(1)
 * f(n-1) = f(n-2) + .....f(1)
 * 得到：f(n) = 2 * f(n-1)
 */
function fib_plus(num) {
  if(num == 1) {
      return 1
  } else {
      return 2 * fib_plus(num-1)
  }
}
var n = parseInt(readline())
console.log(fib_plus(n))