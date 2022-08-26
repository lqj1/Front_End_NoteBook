/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = function(nums) {
  let res = []
  let cur = []

  backtrack(nums, 0)
  return res

   function backtrack (nums, start) {
    // 第一次push进入的就是空数组
    res.push([...cur])
    for (let i = start; i < nums.length; i++) {
      cur.push(nums[i])
      backtrack(nums, i + 1)
      cur.pop()
    } 
  }
};