/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function(grid) {
  let res = 0;
  let row = grid.length, col = grid[0].length;
  // 将左右的岛屿变成海(0)，淹了
  for (let i = 0; i < row; i++) {
    // 将左边的陆地淹了
    dfs(grid, i, 0)
    // 将右边的陆地淹了
    dfs(grid, i, col - 1)
  }
  // 将上下的岛屿变成海(0)，淹了
  for (let j = 0; j < col; j++) {
    // 将上边的陆地淹了
    dfs(grid, 0, j)
    // 将下边的陆地淹了
    dfs(grid, row - 1, j)
  }
  // 遍历grid，统计岛屿面积
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      // dfs(grid, i, j)
      // 这里已经把该淹的地方都淹了，剩下的1都是符合要求的陆地
      if (grid[i][j] == '1') {
        res += 1
      }
    }
  }
  return res
  
  function dfs (grid, i, j) {
    let row = grid.length, col = grid[0].length
    if (i < 0 || j < 0 || i >= row || j >= col) {
      // 越界
      return 
    }
    if (grid[i][j] == '0') {
      // 此处是海水，直接返回
      return
    }
    // 将这里变成海水
    grid[i][j] = '0'
    // 将临边的陆地也变成海水，如果边缘是海水，就不会遍历到里面的陆地
    dfs(grid, i - 1, j)
    dfs(grid, i + 1, j)
    dfs(grid, i, j - 1)
    dfs(grid, i, j + 1)
  }
};