/**
 * 
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
var deleteDuplicates = function (head) {
  if (head == null) {
    return null
  }
  let fast = head, slow = head
  while (fast) {
    if (fast.val != slow.val) {
      slow.next = fast
      slow = slow.next
    } else {
      fast = fast.next
    }
  }
  slow.next = null
  return head
};