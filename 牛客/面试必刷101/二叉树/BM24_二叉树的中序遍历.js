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
 * @return int整型一维数组
 */
function inorderTraversal (root) {
  // write code here
  var res = []
  function traverse (node)
    if (!node) {
      return;
    }
    traverse(node.left)
    res.push(node.val)
    traverse(node.right)
  }
  traverse(root)
  return res
}
module.exports = {
  inorderTraversal : inorderTraversal
};