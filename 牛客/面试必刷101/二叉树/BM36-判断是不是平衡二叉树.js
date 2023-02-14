/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function IsBalanced_Solution(pRoot)
{
    // write code here
  if (!pRoot) {
    return true
  }
  // 条件1，当前是平衡二叉树
  let con1 = Math.abs(getMaxDepth(pRoot.left) - getMaxDepth(pRoot.right)) <= 1
  // 条件2，左右子树也是
  let con2 = IsBalanced_Solution(pRoot.left) && IsBalanced_Solution(pRoot.right)
  return con1 && con2

}
function getMaxDepth (root) {
  if (!root) {
    return 0
  } 
  return Math.max(getMaxDepth(root.left) + 1, getMaxDepth(root.right) + 1)
}
module.exports = {
    IsBalanced_Solution : IsBalanced_Solution
};

/**
 * 层序遍历，存左右子树的高度，判断高度差
 * 要点：递归获取 树的高度，了解获取树的最高深度
 */