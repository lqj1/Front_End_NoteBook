/**
 * 使用
 */
 dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd')       // 2020/12/01
 dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd')       // 2020/04/01
 dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日')    // 2020年04月01日
 
 /**
  * 手写实现：主要方法是正则表达式来替换
  */
const dateFormat = (dateInput, format) => {
  var day = dateInput.getDate()
  var month = dateInput.getMonth() + 1
  var year = dateInput.getFullYear()
  format = format.replace(/yyyy/, year)  // 正则替换
  format = format.replace(/MM/, month)
  format = format.replace(/dd/, day)
  return format
}