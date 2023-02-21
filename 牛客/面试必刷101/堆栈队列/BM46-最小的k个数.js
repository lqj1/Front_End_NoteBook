function GetLeastNumbers_Solution(input, k)
{
    // write code here
  let arr = input.sort((a, b) => a - b)
  return arr.splice(0, k)
}
module.exports = {
    GetLeastNumbers_Solution : GetLeastNumbers_Solution
};