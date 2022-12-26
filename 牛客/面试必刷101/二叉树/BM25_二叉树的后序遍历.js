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
function postorderTraversal (root) {
  // write code here
  let result = []
  function postTraversal (node) {
    if (node.left) {
      postTraversal(node.left)
    }
    if (node.right) {
      postTraversal(node.right)
    }
    result.push(node.val)
  }
  if (root) {
    postTraversal(root)
  }
  return result
}
module.exports = {
  postorderTraversal : postorderTraversal
};