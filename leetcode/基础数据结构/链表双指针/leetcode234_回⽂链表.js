/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  const tmp = []
  while (head!=null) {
    tmp.push(head.val)
    head = head.next
  }
  for (let i = 0, j = tmp.length - 1; i <= j; i++, j--) {
    if (tmp[i]!=tmp[j]) {
      return false
    }
  }
  return true
};