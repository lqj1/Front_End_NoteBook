/**
 * 方法：双指针法
 * 思路：如果想⼀次遍历就得到中间节点，也需要耍点⼩聪明，使⽤「快慢指针」的技巧： 
 *      我们让两个指针 slow 和 fast 分别指向链表头结点 head。 每当慢指针 slow 前进⼀步，快指针 fast 就前进两步，
 *      这样，当 fast ⾛到链表末尾时，slow 就指向了链 表中点。
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
 * @return {ListNode}
 */
var middleNode = function (head) {
  let slow = head, fast = head
  while (fast != null && fast.next != null) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};