const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

const commonCssLoader = [MiniCssExtractPlugin.loader, 'css-loader'];
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
    ],
  },
};
