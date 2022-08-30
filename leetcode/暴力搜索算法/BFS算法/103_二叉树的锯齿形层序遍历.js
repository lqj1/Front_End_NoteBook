/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  let res = []
  if (!root) {
    return res
  }
  let q = []  // q用于存放从左向右每一层节点信息，用于遍历
  let flag = true
  q.push(root)
  while (q.length != 0) {
    let sz = q.length
    let level = []  // level用于返回当前层的信息，按照题目要求写入数据
    for (let i = 0; i < sz; i++) {
      let cur = q.shift()
      // 在储存到当前层 level 的时候，根据 flag 来选择存入左边还是右边
      if (flag) {
        level.push(cur.val)  // flag为真，从左向右
      } else {
        level.unshift(cur.val)  // flag为假，从右向左
      }
      // 存的时候，还是类似于层次遍历，从左到右
      if (cur.left != null) { q.push(cur.left) }
      if (cur.right != null) { q.push(cur.right) }
    }
    res.push(level)
    flag = !flag  // 当前层遍历完毕，改变方向
  }
  return res
};