function Find(target, array)
{
  // write code here
  let rows = array.length    // 行数
  let cols = array[0].length // 列数
  let r = rows - 1, c = 0;
  while (c < cols && r >= 0) {
    if (target > array[r][c]) {
      c++
    } else if (target < array[r][c]) {
      r--
    } else {
      return true
    }
  }
  
}
module.exports = {
    Find : Find
};

/**
 * 思路：
 *  二分法：左下角或者右上角的元素为起点开始
 */