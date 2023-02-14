
/**
 * 双栈法：
 * 我们都知道栈结构的push、pop、top操作都是O(1)，
 * 但是min函数做不到，于是想到在push的时候就将最小值记录下来，
 * 由于栈先进后出的特殊性，我们可以构造一个单调栈，保证栈内元素都是递增的，栈顶元素就是当前最小的元素。
 * 
 * 具体做法：
 * step 1：使用一个栈记录进入栈的元素，正常进行push、pop、top操作。
 * step 2：使用另一个栈记录每次push进入的最小值。
 * step 3：每次push元素的时候与第二个栈的栈顶元素比较，若是较小，则进入第二个栈，若是较大，则第二个栈的栈顶元素再次入栈，
 *        因为即便加了一个元素，它依然是最小值。于是，每次访问最小值即访问第二个栈的栈顶。
 */

let stack1 = []
// min_stack不能只存一个值，考虑连续获取 min 或者 pop 完之后又获取 min 的情况
let min_stack = []

function push(node)
{
    // write code here
  // 栈1正常入元素
  stack1.push(node)
  // 栈2为空，或者新的元素更小，则入栈
  if (min_stack.length===0 || node < min_stack[min_stack.length - 1]) {
    // 保证min_stack的最顶端是最小的元素
    min_stack.push(node)
  } else {
    // 存入最小栈中顶端的值
    min_stack.push(min_stack[min_stack.length - 1])
  }
}
function pop()
{
    // write code here
  stack1.pop()
  // 最小栈也需要弹出
  min_stack.pop()
  
}
function top()
{
    // write code here
  // 注意是返回值，不是弹出
  return stack1[stack1.length - 1]
}
function min()
{
    // write code here
  return min_stack[min_stack.length - 1]
}
module.exports = {
    push : push,
    pop : pop,
    top : top,
    min : min
};