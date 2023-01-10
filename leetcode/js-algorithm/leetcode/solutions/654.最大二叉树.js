/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
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

// 思路：
// 我们肯定要遍历数组把找到最⼤值 maxVal，把根节点 root 做出来，然后对 maxVal 左边的数组和右边的数组进⾏递归调⽤（这里是左右数组而不是左右子树），作为 root 的左右⼦树。
// 1. 先找到数组中的最大值
// 2. 分开左右两个数组进行处理
// 3. 对左右两个数组按照步骤1,2进行递归处理


/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var buildTree = function (arr, left, right) {
  if (left > right) {
    return null
  }
  let maxValue = -1, maxIndex = Number.MIN_VALUE
  for (let i = left; i <= right; i++) {
    let element = arr[i];
    if (element > maxValue) {
      maxValue = element
      maxIndex = i
    }
  }
  let root = new TreeNode(maxValue)
  // 不需要再构建新的数组传入，直接在原数组中通过下标截取即可
  root.left = buildTree(arr, left, maxIndex-1)
  root.right = buildTree(arr, maxIndex + 1, right)
  return root
}

var constructMaximumBinaryTree = function(nums) {
  let root = buildTree(nums, 0, nums.length - 1)
  return root
};
// @lc code=end

