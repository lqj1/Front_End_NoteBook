/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 
 * @param t1 TreeNode类 
 * @param t2 TreeNode类 
 * @return TreeNode类
 */
function mergeTrees( t1 ,  t2 ) {
  // write code here
  // 存在空节点，就直接返回有值的节点，节点的值也会返回
  if (t2 === null) 
    return t1 
  if (t1 === null) 
    return t2 
  // 如果节点都不为空，才开始相加计算
  t1.val = t1.val + t2.val
  // 先序遍历，递归处理左右节点
  t1.left = mergeTrees(t1.left, t2.left)
  t1.right = mergeTrees(t1.right, t2.right)
  // 加总的和都赋到 t1，最后返回 t1 节点
  return t1
}
module.exports = {
  mergeTrees : mergeTrees
};