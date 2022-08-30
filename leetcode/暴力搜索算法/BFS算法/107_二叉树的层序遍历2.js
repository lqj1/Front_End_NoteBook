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
var levelOrderBottom = function(root) {
  let res = []
  if (!root) {
    return res
  }
  let q = []
  q.push(root)
  while (q.length!=0) {
    let sz = q.length
    let level = []
    for (let i = 0; i < sz; i++) {
      let cur = q.shift()
      level.push(cur.val)
      if (cur.left) { q.push(cur.left) }
      if (cur.right) { q.push(cur.right) }
    }
    // 在数组的前面插入
    res.unshift(level)
  }
  return res
};