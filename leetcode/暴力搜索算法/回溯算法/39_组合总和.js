/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function(candidates, target) {
  // input: candidates = [2,3,5], target = 8;  output: [[2,2,2,2],[2,3,3],[3,5]]
  let res = []  // 返回各个满足条件的数组
  let cur = []  // 记录某一个满足条件的数组
  if (candidates.length == 0) {
    return []
  }
  backtrack(candidates, 0, target, 0)
  return res
  
  function backtrack (candidates, start, target, sum) {
    if (sum == target) {
      // 找到，返回结果
      res.push([...cur])  // 使用 res.push(cur) 会返回空数组(因为最终跳出后cur为空)，注意引用类型，需要深克隆  
    }
    if (sum > target) {
      // 超过目标和，直接结束
      return 
    }
    for (let i = start; i < candidates.length; i++) {
      cur.push(candidates[i])
      sum += candidates[i]
      // 递归遍历下一层回溯树，这里的 i 不会 +1, 考虑重复元素，遍历完再 +1
      backtrack(candidates, i, target, sum)
      // 移出当前元素
      sum -= candidates[i]
      cur.pop()
    }
  }
};