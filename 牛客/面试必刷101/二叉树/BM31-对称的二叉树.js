/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot)
{
    // write code here
  if (!pRoot) {
    return true
  }
  function compare (node1, node2) {
    if (node1 === null && node2 === null) {
      return true 
    } 
    if (node1 === null || node2 === null) {
      return false
    }
    if (node1.val !== node2.val) {
      return false
    } 
    return compare(node1.left, node2.right) && compare(node1.right, node2.left)
  }
  return compare(pRoot.left, pRoot.right)
}
module.exports = {
    isSymmetrical : isSymmetrical
};

// 思路：中序遍历，然后将结果存入数组，再判断，但是这种方法效率非常低

// 思路2：如上代码