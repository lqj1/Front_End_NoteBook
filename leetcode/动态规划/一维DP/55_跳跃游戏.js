/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  let maxPos = 0
  for (let i = 0; i < nums.length-1; i++) {
    maxPos = Math.max(maxPos, i + nums[i])
    // 最大距离超不过倒数第二个位置，则无法达到
    if (maxPos <= i) {
      return false
    }
  }
  // return true
  return maxPos >= nums.length-1
};