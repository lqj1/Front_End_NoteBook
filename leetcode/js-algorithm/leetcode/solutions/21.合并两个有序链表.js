/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 迭代法
// var mergeTwoLists = function (list1, list2) {
//   // 定义虚拟的头节点，就不需要判断并指向list1或list2小的第一个节点
//   let dummy = new ListNode(-1),
//     forward = dummy // 引用类型赋值共享内存空间
//   while (list1 && list2) {
//     if (list1.val <= list2.val) {
//       forward.next = list1
//       list1 = list1.next
//     } else {
//       forward.next = list2
//       list2 = list2.next
//     }
//     forward = forward.next
//   }
//   forward.next = list1 === null ? list2 : list1
//   return dummy.next
// }

// 递归法
var mergeTwoLists = function (list1, list2) {
  // 定义虚拟的头节点，就不需要判断并指向list1或list2小的第一个节点
  if (!list1) return list2
  else if (!list2) {
    return list1
  } else if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
  }
}
// @lc code=end
