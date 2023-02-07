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
 * @param root TreeNode类 
 * @return bool布尔型
 */
function isValidBST( root ) {
  // write code here
  let res = []
  function midOrder (node) {
    if (!node) {
      return
    }
    // 左子树
    midOrder(node.left)
    // 操作
    res.push(node.val)
    // 右子树
    midOrder(node.right)
  }
  midOrder(root)
  for (let i = 0; i < res.length-1; i++) {
    if (res[i + 1] < res[i]) {
      return false
    } else {
      continue
    }
  }
  return true
}
module.exports = {
  isValidBST : isValidBST
};

/**
 * 使用中序遍历：结果是一个有序数组
 */