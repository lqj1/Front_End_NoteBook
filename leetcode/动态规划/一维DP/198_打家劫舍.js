/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 动态规划的的四个解题步骤是：
  1. 定义子问题
  2. 写出子问题的递推关系
  3. 确定 DP 数组的计算顺序
    动态规划有两种计算顺序，一种是自顶向下的、使用备忘录的递归方法，一种是自底向上的、使用 dp 数组的循环方法。
    不过在普通的动态规划题目中，99% 的情况我们都不需要用到备忘录方法，所以我们最好坚持用自底向上的 dp 数组。
    DP 数组也可以叫”子问题数组”，因为 DP 数组中的每一个元素都对应一个子问题。
  4. 空间优化（可选）

 * 
  将这个问题分为每个房子抢与不抢的状态：面前房子的索引就是状态，抢和不抢就是选择
  不需要备忘录如下：
  截止到 rob(nums[4..])的累加值 分为两种情况：
    1. rob(nums[3...])            // 3不抢
    2. nums[3] + rob(nums[2...])  // 3抢了
既然 DP 数组中的依赖关系都是向右指的，DP 数组的计算顺序就是从左向右。这样我们可以保证，计算一个子问题的时候，它所依赖的那些子问题已经计算出来了
 */

var rob = function (nums) {
  if (nums.length == 0) {
    return 0
  }
  // 子问题：
  // f(k) = 偷 [0...k) 房间中的最大金额
  // f(0) = 0
  // f(1) = nums[0]
  // f(k) = max{ rob(nums[k-1]), nums[k-1]+rob(k-2) }

  let dp = []
  dp[0] = 0
  dp[1] = nums[0]
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i-1])
  }
  return dp[nums.length]
};