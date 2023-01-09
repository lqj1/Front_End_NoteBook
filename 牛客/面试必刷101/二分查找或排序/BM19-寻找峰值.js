/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param nums int整型一维数组 
 * @return int整型
 */
function findPeakElement( nums ) {
  // write code here
  let index = 1
  let len = nums.length 
  if(len <= 1) {
    return 0
  } else if (len <= 2) {
    if(nums[index-1] < nums[index]) {
        return index
    } else {
        return index-1
    }
  } else {
    while (index < nums.length - 1) {
        if (nums[index - 1] < nums[index] && nums[index] < nums[index + 1]) {
            index++
        } else if(nums[index - 1] < nums[index]) {
            return index
        } else {
            return index-1
        }
    }
    if(index === nums.length - 1) {
        return index
    } else {
        return 0
    }
  }
  
}
module.exports = {
  findPeakElement : findPeakElement
};