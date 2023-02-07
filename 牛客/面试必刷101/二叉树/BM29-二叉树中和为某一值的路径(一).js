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
  * @param sum int整型 
  * @return bool布尔型
  */
function hasPathSum( root, sum ) {
  // write code here
  return dfs(root, sum)
}
function dfs (root, sum) {
  if (!root) {
    return 0
  }
  // 需要限定是叶子节点，否则和是根节点就直接返回了 {1,2}1
  if(root.val === sum && !root.left && !root.right) { 
    return true
  }
  return dfs(root.left, sum - root.val) || dfs(root.right, sum - root.val)
}
module.exports = {
  hasPathSum : hasPathSum
};

// 用求和的方式很难不太好处理
// 所以转折一下，使用 和去减当前节点，然后看看能不能找到符合的