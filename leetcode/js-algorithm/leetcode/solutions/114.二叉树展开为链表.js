/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
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

// <========思路========>
// 1.将二叉树的左/右节点拉平
// - 如何把 root 的左右⼦树拉平？其实很简单，按照 flatten 函数 的定义，对 root 的左右⼦树递归调⽤ flatten 函数即可，然后在递归的最后一层进行处理最后就是拉平
// 2.将右节点接到左节点上
// <========思路========>

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  if (root == null) {
    return root
  }
  flatten(root.left)
  flatten(root.right)
  /** 后序遍历位置 */
  // 此时左右子树已经拉平为一条直线，假设从最底层的二叉树开始处理
  // 将左子树变成右子树
  // 临时保存
  left = root.left
  right = root.right
  root.left = null
  root.right = left
  // 将右子树接到当前右子树的末端
  p = root
  while (p.right != null) {
    p = p.right
  }
  // 将原来保存的根的右节点放入末尾
  p.right = right  
};
// @lc code=end

