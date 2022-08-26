/**
 * @param {character[][]} grid
 * @return {number}
 */

/**
 * 
  思路：
    海水(0)将岛屿分割，遇到新的岛屿，就+1
 */
var numIslands = function(grid) {
  let res = 0;
  let row = grid.length, col = grid[0].length
  // 遍历grid
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] == '1') {
        // 新岛屿被发现，就+1个岛屿数量
        res++;
        // 将陆地变成海，直到遇到下一个陆地
        dfs(grid, i, j)
      }
    }
  }
  return res

  function dfs (grid, i, j) {
    let row = grid.length, col = grid[0].length;
    if (i < 0 || j < 0 || i >= row || j >= col) {
      // 超出索引边界
      return
    }
    if (grid[i][j] == '0') {
      // 此处已经是海水
      return
    }
    // 将此处变为海水
    grid[i][j] = '0'
    // 遍历周围的
    dfs(grid, i - 1, j)
    dfs(grid, i + 1, j)
    dfs(grid, i, j - 1)
    dfs(grid, i, j + 1)
  }
};
