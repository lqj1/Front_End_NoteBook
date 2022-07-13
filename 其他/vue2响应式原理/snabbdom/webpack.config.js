module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: __dirname + "/public",
    filename: './js/[name].js'
  },
  devServer: {
    // 注意这里是相对路径
    contentBase: './public',
    inline: true
  }
}