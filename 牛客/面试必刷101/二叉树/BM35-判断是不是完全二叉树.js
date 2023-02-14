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
function isCompleteTree( root ) {
  // write code here
  let queue = [], flag = false
  queue.push(root)
  while (queue.length > 0) {
    const node = queue.shift()
    if (node === null) {
      flag = true  // 遇到空节点，相当于遇到 #
    } else {
      if (flag === true) {
        // 前面已经有空节点了，所以就不是完全二叉树
        return false 
      } else {
        // 层序遍历，放入左节点和右节点
        queue.push(node.left)
        queue.push(node.right)
      }
    }
  }
  return true
}
module.exports = {
  isCompleteTree : isCompleteTree
};


/**
 * 思路：层序遍历，然后判断左右子树，如果存在右子树有但左子树没有就返回 false，一直遍历到结束
 * 
 * 实际证明，这样是不可靠的，单单靠判断左右子树，有可能根节点有两层都有左右子树，而根节点没有右子树，这种情况可以通过程序，但其实是不满足的
 * 所以，还是需要将遍历结果存入数组中，然后通过数组中间是否存在 # 去判断
 * 
 * 还是借助层序遍历：
 * 
  只有x,x,x,#,#,#这样的才是完全二叉树
  如果出现x,#,y,#,#,#或者x,#,#,x,#,#,#证明不是完全二叉树
  碰到第一个#的时侯令flag=true
  如果再次碰到非#结点，且flag=true时候，说明不是完全二叉树
 */