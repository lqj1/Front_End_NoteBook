/**
 * 数字不包括小数
 */

format(1232323)  // '1,232,323'
let format = n => {
  let num = n.toString()
  let len = num.length
  if (len <= 3) {
    return num 
  } else {
    let remainNum = len % 3
  }
}