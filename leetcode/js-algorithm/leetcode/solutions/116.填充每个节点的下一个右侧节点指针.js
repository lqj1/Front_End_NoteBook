/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

// <========思路========>
// 题目首先说明了是 "完美二叉树"，所以除了最右侧节点next指针会指向null，其他节点的右侧一定有相邻的节点。
// 如果直接使用connect_One函数处理，那么对于 5,6 节点这种不属于同一父节点的就没法连接起来，所以需要重写一个函数处理两个不同父节点的情况。
// <========思路========>

/**
 * @param {Node} root
 * @return {Node}
 */
var connectTwoNode = function (node1, node2) {
  if (node1 == null || node2 == null) {
    return
  }
  /** 前序遍历位置 */
  // 将传入连个节点做连接
  node1.next = node2
  // 连接相同父节点
  connectTwoNode(node1.left, node1.right)
  connectTwoNode(node2.left, node2.right)
  // 连接不同父节点
  connectTwoNode(node1.right, node2.left)
}
var connect = function (root) {
  if (root == null) {
    return root
  }
  connectTwoNode(root.left, root.right)
  return root
}
// var connect_One = function(root) {
//     if (root == null || root.left == null ) {
//       return root
//     }
//     root.left.next = root.right
//     connect(root.left)
//     connect(root.right)
//     return root
// };
// @lc code=end

