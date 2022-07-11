var s1 = 'get-element-by-id'
// 转为 getElementById
// \w 匹配字母或数字或下划线或汉字 等价于 '[^A-Za-z0-9_]'
var f = function (s) {
  return s.replace(/-\w/g, function (x) {
    // x为 -e,-b,-i
    return x.slice(1).toUpperCase()
  })
}
f(s1)