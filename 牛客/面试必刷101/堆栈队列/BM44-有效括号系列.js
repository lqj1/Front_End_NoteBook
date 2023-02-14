
/**
  * 
  * @param s string字符串 
  * @return bool布尔型
  */
function isValid( s ) {
  // write code here
  // 存放括号的栈，一般情况，栈顶的左括号，必须先遇到对应的有括号，否则就返回 false
  let brackets_stacks = []
  let l_brackets = ['(', '{', '[']
  for (let ch of s) {
    // 属于左边括号，入栈
    if (l_brackets.includes(ch)) {
      brackets_stacks.push(ch)
    } else {
      // 右边的括号
      // 将右边和栈顶元素进行对应判断
      if (ch === ']' && brackets_stacks[brackets_stacks.length - 1] !== '[' || ch === '}' && brackets_stacks[brackets_stacks.length - 1] !== '{' || ch === ')'  && brackets_stacks[brackets_stacks.length - 1] !== '(') {
        // 右边括号不匹配栈顶的左括号，返回 false
        return false
      } else {
        // 否则抵消掉栈顶的括号，然后继续遍历
        brackets_stacks.pop()
        continue
      }
    }
  }
  // 遍历完，如果还有剩余，返回 false，否则 true
  return brackets_stacks.length!==0 ? false : true
}
module.exports = {
  isValid : isValid
};

/**
 * 高级一些的做法，通过匹配括号，一般括号都是配对出现的
 */

/**
  * 
  * @param s string字符串 
  * @return bool布尔型
  */
function isValid( s ) {
  // write code here
  
  const truely = ["()","[]","{}"]
  
  function check() {  
      const checkList = truely.filter( item => {
          return s.indexOf( item ) > -1
      })
      
      return checkList.length
  }
  
  while(  check() > 0 ) {
      truely.forEach( item => {
          s = s.replace( item, "" )
      })
  }
  
  if( s.length > 0 ) {
      return false
  }else {
      return true
  }
  
}
module.exports = {
  isValid : isValid
};

