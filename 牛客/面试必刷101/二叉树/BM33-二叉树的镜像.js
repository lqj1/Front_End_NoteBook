/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param pRoot TreeNode类 
 * @return TreeNode类
 */
function Mirror( pRoot ) {
  // write code here
  if (!pRoot) {
    return null
  }
  // 先操作，再递归
  // 对当前根节点操作，就是将其左右子树交换
  let tempNode = pRoot.right 
  pRoot.right = pRoot.left
  pRoot.left = tempNode
  Mirror(pRoot.right)
  Mirror(pRoot.left)
  return pRoot
}
module.exports = {
  Mirror : Mirror
};


/**
 * 先序遍历，只是将右节点的递归移到左节点前面
 */