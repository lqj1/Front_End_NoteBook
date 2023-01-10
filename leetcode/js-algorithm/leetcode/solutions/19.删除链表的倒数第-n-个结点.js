/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
//假设链表总长为 n，要删除倒数第 k 个节点，需要获取倒数第 k+1 个节点的引用，这时候可以考虑使用双指针(快慢指针)的技巧，因为是要取倒数的节点，所以不能同时从起点出发，可以如下执行
//  1. 先让指针 p1 指向链表头节点 head，然后走 k 步
//  2. 这时候，让另一指针 p2 指向头节点 head，也就是类似于 p2 从尾结点开始
//  3. p1,p2 同时向前走，当 p1 走到末尾的时候，这时候 p2 还剩下 k 可以到达末尾，也就是倒数 k 个节点

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  if (!n) {
    return head
  }
  let cur = head,
    pre = head,
    knode = head
  while (n) {
    knode = knode.next
    n -= 1
  }
  if (!knode) {
    head = head.next
    return head
  }
  while (knode) {
    pre = cur
    cur = cur.next
    knode = knode.next
  }
  pre.next = cur.next
  return head
}
// @lc code=end
