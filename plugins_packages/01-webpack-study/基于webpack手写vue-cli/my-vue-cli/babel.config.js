module.exports = {
  presets: [
    // 匹配规则
    "@babel/preset-env",
    // 支持vue中的jsx语法
    "@vue/babel-preset-jsx"
  ],
  // 匹配插件
  plugins: ["@babel/plugin-transform-runtime"]
}