/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin)
{
    // write code here
  if (!pre.length || !vin.length) {
    return null
  }
  // 根节点
  const root = new TreeNode(pre.shift())
  // 找当前前序遍历的节点在中序遍历中的下标
  const index = vin.indexOf(root.val)

  // 对左右子树分别进行相同操作，递归
  root.left = reConstructBinaryTree(pre, vin.slice(0, index))
  root.right = reConstructBinaryTree(pre, vin.slice(index + 1))

  return root
} 
module.exports = {
    reConstructBinaryTree : reConstructBinaryTree
};

/**
 * 从前序遍历中去找到根节点，然后在中序遍历中，将根节点左右部分分为 左右子树
 * 对左右子树进行相同操作，直到最后
 */