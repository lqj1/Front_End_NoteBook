/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot)
{
  // write code here
  let res = []
  // 先按层序遍历正常输出
  preOrder(pRoot, res, 0)
  // 然后判断res下标为奇数的逆序
  for(let i = 0; i < res.length; i++) {
    if(i % 2 !== 0) {
        res[i].reverse()
    }
  }
  return res
}

function preOrder(root, res, level) {
    if(!root) {
        return
    }
    if(level >= res.length) {
        res.push([])
    }
    res[level].push(root.val)
    preOrder(root.left, res, level+1)
    preOrder(root.right, res, level+1)
}
module.exports = {
    Print : Print
};  