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
 * @param p int整型 
 * @param q int整型 
 * @return int整型
 */
function lowestCommonAncestor( root ,  p ,  q ) {
  // write code here
  let arr1 = [], arr2 = []
  // 获取遍历路径
  arr1 = getPath(root, p)
  arr2 = getPath(root, q)
  for (let i = arr1.length - 1; i >= 0; i--) {
    for (let j = arr2.length - 1; j >= 0; j--) {
      if (arr1[i] === arr2[j]) {
        return arr1[i]
      }
    }
  }
}
function getPath (root, target) {
  let curNode = root
  let arr = []
  while (root.val !== target) {
    arr.push(root.val)
    if (root.val > target) {
      root = root.left
    } else if (root.val < target) {
      root = root.right
    }
  }
  // 需要将目标节点也添加进数组
  arr.push(target)
  return arr
}
module.exports = {
  lowestCommonAncestor : lowestCommonAncestor
};

/**
 * 思路：二叉搜索树，一般会想到中序遍历
 * 
 * 这里有递归和非递归法
 * 但其实非递归法会更容易理解一些，
 * 从根节点开始，记录到达两个节点的路径，然后存入两个数组，这里可以利用二叉搜索树的特性
 *    如果当前节点小于目标节点，则往左子树查找，否则往右子树
 * 
 * 递归法的代码量会小很多，如下：
 * 主要是对两个目标节点进行判断！！！
 */

function lowestCommonAncestor( root ,  p ,  q ) {
  // write code here
  if (!root) {
    return null
  }
  if (root.val > p && root.val > q) {
    // 如果两个目标节点小于当前节点，说明两个目标节点的公共父元素在当前节点的左子树上
    return lowestCommonAncestor(root.left, p, q)
  } else if (root.val < p && root.val < q) {
    // 如果两个目标节点小于当前节点，说明两个目标节点的公共父元素在当前节点的右子树上
    return lowestCommonAncestor(root.right, p, q)
  } else {
    // 如果存在一大一小，说明当前节点就是公共父节点
    return root.val
  }
}