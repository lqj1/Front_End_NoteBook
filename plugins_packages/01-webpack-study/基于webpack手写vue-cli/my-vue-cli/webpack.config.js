const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  // 模式
  mode: 'development',
  // 入口文件
  entry: {
    main: './src/main.js'
  },
  // 输出
  output: {
    // 输出到 dist 文件夹
    path: path.resolve(__dirname, './dist'),
    // js文件下
    filename: 'js/chunk-[contenthash].js',
    // 每次打包前自动清除旧的 dist
    clean: true,
  },
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets',
      tools: '~/tools'
    },
    // 引入文件时省略后缀
    extensions: ['.js','.ts','.less','.vue']
  },
  // 插件 plugins
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板 public/index.html
      template: './public/index.html',
      // 打包后的名字
      filename: 'index.html',
      // js文件插入body中
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      // 将css代码输出到 dist/styles 文件夹下
      filename: 'styles/chunk-[contenthash].css',
      ignoreOrder: true
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        // 匹配文件后缀的规则，css处理
        test: /\.(css|s[cs]ss)$/,
        use: [
          // loader执行顺序是从右到左
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        // 匹配文件后缀的规则，图片处理
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          // 转 base64 的条件
          dataUrlCondition: {
            maxSize: 25 * 1024,   // 25kb
          }
        },
        generator: {
          // 打包到 dist/image 文件下
          filename: 'images/[contenthash][ext][query]',
        }
      },
      {
        // 匹配 js后缀文件
        test: /\.js$/,
        // 排除 node_modules中的 js
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  }
}
