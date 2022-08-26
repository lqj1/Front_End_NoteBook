/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
  if(headA == null || headB == null) {
      return null
  }
  let pA = headA, pB = headB
  while(pA != pB) {
      pA = pA === null ? headB : pA.next
      pB = pB === null ? headA : pB.next
  }
  return pB   // or return pA
 };

 /**
  * 方法：双指针法
  * 思路：解决这个问题的关键是，通过某些⽅式，让 p1 和 p2 能够同时到达相交节点 c1。
  *     如果⽤两个指针 p1 和 p2 分别在两条链表上前进，我们可以让 p1 遍历完链表 A 之后开始遍历链表 B，让 p2遍历完链表 B 之后开始遍历链表 A，
  *     这样相当于「逻辑上」两条链表接在了⼀起。 如果这样进⾏拼接，就可以让 p1 和 p2 同时进⼊公共部分，也就是同时到达相交节点 c1
  */