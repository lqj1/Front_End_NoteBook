/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  let res = []
  if (!root) {
    return res
  }
  let q = []
  q.push(root)
  // while循环控制从上向下一层层遍历
  while (q.length !== 0) {
    let sz = q.length
    // 记录这一层的节点值
    let level = []
    // for循环控制每一层从左向右遍历
    for (let i = 0; i < sz; i++) {
      let cur = q.shift()
      level.push(cur.val)
      if (cur.left != null) { q.push(cur.left) }
      if (cur.right != null) { q.push(cur.right) }
    }
    res.push(level)
  }
  return res
};

