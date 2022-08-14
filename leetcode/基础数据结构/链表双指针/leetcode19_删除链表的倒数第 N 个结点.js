/**
 * 方法：双指针
 * 思路：要删除倒数第 n 个节点，就得获得倒数第 n + 1 个节点的引⽤。 
 *      获取单链表的倒数第 k 个节点，就是想考察 双指针技巧 中快慢指针的运⽤，
 *      ⼀般都会要求你只遍历⼀次链 表，就算出倒数第 k 个节点。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  if (!n) {
    return head
  }
  let slow = head,
    pre_slow = head,  // 存放slow节点前一个节点
    fast = head
  while (n > 0) {
    fast = fast.next
    n -= 1
  }
  if (!fast) {
    head = head.next
    return head
  }
  while (fast) {
    pre_slow = slow
    slow = slow.next
    fast = fast.next
  }
  pre_slow.next = slow.next
  return head
};