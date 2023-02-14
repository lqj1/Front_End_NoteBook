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
 * @param o1 int整型 
 * @param o2 int整型 
 * @return int整型
 */

// 判断是否找到
let isFind = false
function lowestCommonAncestor( root ,  o1 ,  o2 ) {
  // write code here
  let arr1 = [], arr2 = []
  dfs(arr1, root, o1)
  // 重置标识
  isFind = false 
  dfs(arr2, root, o2)

  console.log('arr1: ', arr1)
  console.log('arr2: ', arr2)
}
function dfs (arr, root, target) {
  // 记得需要加上 isFind 的限制，找到或者空节点就直接退出了
  if (isFind || !root) 
    return 
  arr.push(root.val)
  // 如果当前节点为目标节点，就设置标识为 true
  if (root.val === target) {
    isFind = true
    return
  }
  dfs(arr, root.left, target)
  dfs(arr, root.right, target)
  // 不匹配的当前节点就回溯
  if(!isFind) {
    arr.pop()
  }
  // 有个回溯，如果不在这条路径，需要将一开始塞入的节点给弹出去
}
module.exports = {
  lowestCommonAncestor : lowestCommonAncestor
};

/**
 * 这个不是二叉搜索树，所以不能按照 BM37 的思路来
 * 
 * 方法1：dfs，直接深度搜索两条路径，然后进行比较
 * 
 */