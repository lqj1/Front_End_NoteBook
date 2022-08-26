/**
 * @param {string} digits
 * @return {string[]}
 * 回溯法解决
 */
var letterCombinations = function(digits) {
  if (digits.length == 0) {
    // 空字符串返回空数组
    return []
  }
  // 返回的结果数组
  let res = []
  // 使用哈希表存储按键对应的字母
  let map = new Map([
    ['2','abc'],
    ['3','def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6', 'mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz']
  ])
  // 开始回溯
  backtrack('', digits)
  return res

  function backtrack (cur, digits) {
    if (digits.length == 0) {
      // 已经遍历完字符串的所有数字，得到完整的字母组合
      res.push(cur)
    } else {
      // 取第一个数字，str为map对应的数组
      let str = map.get(digits[0])
      // 遍历当前按键的所有字母，遍历完后面的按键会回溯到当前按键的下一个字母
      for (let i = 0; i < str.length; i++) {
        // cur为连接的字母串
        // 带着当前字母组合找下一个按键对应的字母
        backtrack(cur+str[i],digits.slice(1))
      }
    }
  }
}