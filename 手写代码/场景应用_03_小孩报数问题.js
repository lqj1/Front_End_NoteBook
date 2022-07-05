/**
 * 有30个小孩儿，编号从 1-30，围成一圈依次报数，1,2,3数到3的小孩儿退出这个圈，然后下一个小孩重新报数1,2,3，
 * 问最后剩下的那个小孩儿的编号是多少
 */

/**
 * 
 * @param {总人数} num 
 * @param {间隔人数} count 
 */
function childNum (num, count) {
  let allplayer = []
  // 给小孩子编号 1-30
  for (let i = 0; i < num; i++) {
    allplayer[i] = i + 1
  }
  let exitCount = 0;  // 离开人数
  let counter = 0; // 记录报数
  let curIndex = 0; // 当前下标
  // exitCount < 29
  while (exitCount < num - 1) {
    // 开始计数
    if (allplayer[curIndex] !== 0) {
      counter++
    }
    // 数到3，将当前下标的值赋为0
    if (counter === count) {
      allplayer[curIndex] = 0
      // counter 重新计数
      counter = 0
      // 退出人数+1，等到 exitCount 为29的时候，就退出循环，刚考剩下一个人
      exitCount++
    }
  }
  // 寻找数组中，不为0的那个数的下标
  for (let i = 0; i < num; i++) {
    if (allplayer[i] !== 0) {
      return allplayer[i]
    }
  }
}
childNum(30, 3)