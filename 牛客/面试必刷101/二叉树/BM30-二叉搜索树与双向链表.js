/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Convert(pRootOfTree)
{
    // write code here
  let head = null
  let pre = null
  function MidOrderDFS (cur) {
    if (cur === null) {
      return 
    }
    // 左子树
    MidOrderDFS(cur.left)
    // 进行相关操作
    if (pre === null) {
      head = cur
    } else {
      pre.right = cur
    }
    // cur 不能修改，因为要遍历右子树
    cur.left = pre 
    pre = cur
    // 遍历右子树
    MidOrderDFS(cur.right)
  }
  MidOrderDFS(pRootOfTree)
  return head

}
module.exports = {
    Convert : Convert
    
};

// 其实就是：中序遍历
/**
 * 伪代码如下
function Convert(pRootOfTree) {
    // 新建一个引用变量head，用于指向双向链表头结点
    let head = null;
    // 新建一个引用变量pre，用于记录上一结点
    let pre = null;
    // 新建递归方法，中序深度优先搜索,当前结点为参数
    function MediumOrderDFS(cur) {
        // 遍历左子树
        MediumOrderDFS(cur.left);
        // 操作当前结点
        1.确定递归结束的条件和头结点
        2.pre的right指向cur
        3.cur的left指向pre
        4.更新pre为引用当前结点cur
        // 遍历右子树
        MediumOrderDFS(cur.right);
    }
    // 将root结点作为参数调用递归函数开始遍历     
    MediumOrderDFS(pRootOfTree);
    // 返回head引用的结点(即最左边的叶子结点)
    return head;
}
 */