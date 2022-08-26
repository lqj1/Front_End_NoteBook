/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  if (n <= 0) {
    return []
  }
  // 结果
  let res = []
  backtrack(n, n, '')
  return res

  function backtrack (left, right, cur) {
    // 如果剩下的左括号大于有括号，则证明左边有括号多，会产生类似于 ()())( 错误的模式
    if (left > right) {
      return 
    }
    // 遍历到小于0，直接返回
    if (left < 0 || right < 0) {
      return
    }
    // 两个都遍历完，返回正确结果
    if (left ==0 && right == 0) {
      res.push(cur)
    }
    // 放入左括号
    cur = cur + '(' 
    backtrack(left - 1, right, cur)
    cur = cur.slice(0, -1)
    // 放入右括号
    cur = cur + ')'
    backtrack(left, right - 1, cur)
    cur = cur.slice(0, -1)
  }
};