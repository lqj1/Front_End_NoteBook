/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

//  只要把⼆叉树上的每⼀个节点的左右⼦节点进⾏交换，最后的结果就是完全翻转之后的⼆叉树

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  // 空节点
  if (root === null) {
      return null;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  // 左右一起遍历，就算遇到空节点也是和空值兑换
  root.left = right;
  root.right = left;
  return root;
};
// @lc code=end

