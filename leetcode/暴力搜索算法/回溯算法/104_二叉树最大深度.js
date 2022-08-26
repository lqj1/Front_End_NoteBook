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
 * 
 * 回溯法，还可以使用动态规划 
 */
 var maxDepth = function(root) {
  let depth = 0;
  let res = 0;
  traverse(root)
  return res

  function traverse(root) {
    if (root == null) {
      return
    }
    depth++
    // 遍历过程记录最大的深度
    res = Math.max(res, depth)
    traverse(root.left)
    traverse(root.right)
    depth--
  }
};

