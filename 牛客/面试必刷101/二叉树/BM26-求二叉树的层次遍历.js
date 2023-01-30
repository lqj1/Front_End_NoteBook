/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
  * 
  * @param root TreeNode类 
  * @return int整型二维数组
  */
function levelOrder( root ) {
  // write code here
  let res = []
  function preOrder(root, level) {
    if(!root) {
      return
    }
    // 一层只需要一个[]，所以当层数大于了res的元素个数再增加[]
    if(level >= res.length) {
        res.push([])
    }   
    res[level].push(root.val)
    preOrder(root.left, level + 1)
    preOrder(root.right, level + 1)
  }
  preOrder(root, 0)
  return res
}

module.exports = {
  levelOrder : levelOrder
};