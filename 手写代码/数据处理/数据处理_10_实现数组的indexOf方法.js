/**
 * 
 * indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
 * 如果没有找到匹配的字符串则返回 -1。
 * string.indexOf(searchvalue,start)
 * start合法取值是 0 到 string Object.length - 1
 */


function indexOf (searchvalue, start = 0) {
  if (this.length < 1) {
    return -1
  }
  if (!searchvalue) {
    return 0
  }
  start = start <= 0 ? 0 : start
  for (let i = start; i < this.length; i++) {
    if (this[i] === searchvalue) {
      return i
    }
  }
  return -1
}

var str = "Hello world, welcome to the universe.";
var n = str.indexOf("e",5);  // 14