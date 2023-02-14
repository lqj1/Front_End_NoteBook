
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 求二叉树的右视图
 * @param xianxu int整型一维数组 先序遍历
 * @param zhongxu int整型一维数组 中序遍历
 * @return int整型一维数组
 */
function solve( xianxu ,  zhongxu ) {
  // write code here
  if (!xianxu.length || !zhongxu.length) {
    return 
  }
  const root = new TreeNode(xianxu.shift()
}
module.exports = {
  solve : solve
};


/**
 * 思路：只能先重建，然后再利用 层序遍历 来获取
 */