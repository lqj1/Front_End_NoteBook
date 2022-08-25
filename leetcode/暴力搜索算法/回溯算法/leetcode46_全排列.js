/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/**
 * 排列问题，需要使用 标识符号,避免重复使用
 */
 var permute = function(nums) {
  // 输⼊：nums = [1,2,3]
  // 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
  let res = []
  let cur = []
  let used = new Array(nums.length).fill(0)
  backtrack(nums, used)
  return res
   
  function backtrack (nums, used) {
    if (cur.length == nums.length) {
      res.push([...cur])
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        // used已经在cur中,剪枝
        continue
      }
      cur.push(nums[i])
      used[i] = 1
      backtrack(nums, used)
      cur.pop()
      used[i] = 0
    }
  }
};