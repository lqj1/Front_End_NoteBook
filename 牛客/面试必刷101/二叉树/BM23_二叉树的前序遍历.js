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
 function preorderTraversal(root) {
  // write code here
  let result = [];
  function preTraversal(node) {
      result.push(node.val);
      if(node.left) {  // 左子树不为空进入
          preTraversal(node.left);
      }
      if(node.right) {  // 右子树不为空进入
          preTraversal(node.right);
      }
  }
  if(root) {  // 此处if排除{}的情况
      preTraversal(root);
  }
  return result;
}
module.exports = {
  preorderTraversal: preorderTraversal,
};
