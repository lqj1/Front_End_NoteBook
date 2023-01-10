function minNumberInRotateArray(rotateArray)
{
    // write code here
  
  let left = 0, right = rotateArray.length - 1
  while (left <= right) {
    let mid = left + (right - left) / 2
    if (rotateArray[mid] > rotateArray[right]) {
      // 中间的数大于右子数组最大值，最小值在右边，将范围缩小为右子数组
      left = mid + 1
    } else if (rotateArray[mid] < rotateArray[right]){
      // 在左边
       right = mid - 1
    } else {
      return mid
    }
  }
  return rotateArray[mid]
}
module.exports = {
    minNumberInRotateArray : minNumberInRotateArray
};

/**
 * 还是考虑复杂了，直接当成排好序的数组，然后使用二分法就可以了
 * 这里没有给数组去判断，因为最小数在右边，所以可以直接判断
 */