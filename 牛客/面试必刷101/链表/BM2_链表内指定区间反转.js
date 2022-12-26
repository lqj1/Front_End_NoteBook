/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
  * 
  * @param head ListNode类 
  * @param m int整型 
  * @param n int整型 
  * @return ListNode类
  */

/**
 * 一次遍历：固定子区间外的节点。
 * 在需要反转的区间里，每遍历到一个节点，让这个新节点来到反转部分的起始位置
    cur：指向待反转区域的第一个节点 left；
    cur_next：永远指向 cur 的下一个节点，循环过程中，cur 变化以后 cur_next 会变化；
    pre：永远指向待反转区域的第一个节点 left 的前一个节点，在循环过程中不变。
 */

 function reverseBetween( head ,  m ,  n ) {
  // write code here
   if (head==null) {
    return null
   }
   let dummyNode = new ListNode(-1)
   dummyNode.next = head
   let pre = dummyNode
   let idx = 1
   for (let i = 0; i < m-1; i++) {
     pre = pre.next
   }
   let cur = pre.next
   let cur_next = null
   for (let i = 0; i < n - m; i++) {
     cur_next = cur.next
     cur.next = cur_next.next
     cur_next.next = pre.next
     pre.next = cur_next  
   }
   return dummyNode.next
}
module.exports = {
    reverseBetween : reverseBetween
};