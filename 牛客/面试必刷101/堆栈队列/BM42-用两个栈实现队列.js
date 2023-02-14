
// 通过数组来代表栈
let stack1 = []
let stack2 = []

// 注意每次使用这个方法，都是由两个空栈开始

function push(node)
{
    // write code here
  stack1.push(node)
}
function pop()
{
    // write code here
  // 为了模拟队列先入先出的特点，需要将栈1的数据取出放在另一个栈，然后弹出，栈的特点是后入先出
  if (stack2.length === 0) {
    while (stack1.length !== 0) {
      stack2.push(stack1.pop())
    }
  }
  
  return stack2.pop()
}
module.exports = {
    push : push,
    pop : pop
};