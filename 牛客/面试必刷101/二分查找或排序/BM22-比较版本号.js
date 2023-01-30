/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 比较版本号
 * @param version1 string字符串 
 * @param version2 string字符串 
 * @return int整型
 */
function compare( version1 ,  version2 ) {
  // write code here
  let arrv1 = version1.split('.')
  let arrv2 = version2.split('.')
  let len = arrv1.length >= arrv2.length ? arrv1.length : arrv2.length
  for (let i = 0; i < len; i++) {
    let arrv1_t = arrv1[i] ? arrv1[i].replace(/\b(0+)/gi,"") : 0
    let arrv2_t = arrv2[i] ? arrv2[i].replace(/\b(0+)/gi,"") : 0
    if (Number(arrv1_t) > Number(arrv2_t)) {
      return 1 
    } else if (Number(arrv1_t) < Number(arrv2_t)) {
      return -1
    } else {
      continue
    }
  }
  return 0

}
module.exports = {
  compare : compare
};