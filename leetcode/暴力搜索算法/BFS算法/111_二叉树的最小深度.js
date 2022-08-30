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
 * @return {number}
 */
/**
 * BFS 算法和 DFS（回溯）算法的⼀⼤区别就是，BFS 第⼀次搜索到的结果是最优的
 */
var minDepth = function(root) {
  let depth = 0
  if (!root) {
    return depth
  }
  let q = []
  q.push(root)
  while (q.length != 0) {
    let level = []
    let sz = q.length;
    depth += 1
    for (let i = 0; i < sz; i++) {
      let cur = q.shift()
      if (!cur.left && !cur.right) {
        return depth
      }
      if (cur.left) { q.push(cur.left) }
      if (cur.right) { q.push(cur.right) }
    }
  }
  return depth
};