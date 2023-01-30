function minNumberInRotateArray(rotateArray)
{
    // write code here
  if (rotateArray.length == 0) {
    return 0
  }
  let l = 0, r = rotateArray.length - 1   
  while (l < r) {
    // 这里需要向下取整
    let m = l + Math.floor((r - l) / 2)
    if (rotateArray[m] > rotateArray[r]) {
      // 大于的话，证明在中间值的右半区，可以不包含中间值
      l = m + 1
    } else if (rotateArray[l] < rotateArray[r]) {
      // 小于的话，证明处在右边区域，需要包含中间值
      r = m
    } else {
      // 相等的话，将区域往左缩小，中间值也会往左缩小
      r-- 
    }
  }
  return rotateArray[l]
}
module.exports = {
    minNumberInRotateArray : minNumberInRotateArray
};

/**
 * 还是考虑复杂了，直接当成排好序的数组，然后使用二分法就可以了
 * 这里没有给数组去判断，因为最小数在右边，所以可以直接判断
 */