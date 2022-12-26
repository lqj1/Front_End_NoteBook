
/**
 * 迭代法
 * 在遍历链表时，将当前节点的next 指针改为指向前一个节点。
 * 由于节点没有引用其前一个节点，因此必须事先存储其前一个节点。
 * 在更改引用之前，还需要存储后一个节点。最后返回新的头引用。
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead) {
  // write code here
    if(pHead == null) {
        return null
    }
    let cur = pHead, pre = null

    while(cur!=null) {
        let cur_next = cur.next
        //反转的关键：当前的节点指向其前一个节点(注意这不是双向链表，没有前驱指针)
        cur.next = pre
        pre = cur
        cur = cur_next
    }
    //为什么返回pre？因为pre是反转之后的头节点，在最后一个循环中 pre指向了最后一个节点，而cur指向下一个为 null
    return pre
  
}
module.exports = {
  ReverseList: ReverseList,
};
