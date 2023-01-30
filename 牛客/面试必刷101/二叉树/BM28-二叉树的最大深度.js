/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
  * 
  * @param root TreeNode类 
  * @return int整型
  */
function maxDepth( root ) {
  // write code here
  // 深度遍历
  let depth = 0
  depth = dfs(root)
  return depth
}
function dfs (root) {
  if (!root) {
    return 0
  }
  let leftd = dfs(root.left)
  let rightd = dfs(root.right)
  // 类似于后续遍历，从出栈开始累加，在叶子节点处为0，一直向上累加到第二层，然后返回再+1
  return Math.max(leftd + 1, rightd + 1)
}
module.exports = {
  maxDepth : maxDepth
};