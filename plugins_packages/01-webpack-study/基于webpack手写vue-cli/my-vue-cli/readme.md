### 基于webpack，手写vue-cli

ref: https://juejin.cn/post/7184989376848347195

#### 1.新建文件夹并进入
- mkdir my-vue-cli && cd my-vue-cli

#### 2.初始化npm
- npm init

>npm init会生成一个pakeage.json文件，这个文件主要是用来记录这个项目的详细信息的，它会将我们在项目开发中所要用到的包，以及项目的详细信息等记录在这个项目中。方便在以后的版本迭代和项目移植的时候会更加的方便。也是防止在后期的项目维护中误删除了一个包导致的项目不能够正常运行。
>使用npm init初始化项目还有一个好处就是在进行项目传递的时候不需要将项目依赖包一起发送给对方，对方在接受到你的项目之后再执行npm install就可以将项目依赖全部下载到项目里。

#### 3.安装webpack、webpack-cli
- webpack:打包工具
- webpack-cli：为webpack提供命令行的工具
- npm i webpack webpack-cli -D 

#### 4.新建src、public
- 在根目录下新建src、public这两个文件夹，前者用来放置项目主要代码，后者用来放项目公用静态资源

#### 5.入口文件
- main.js文件就是项目的入口文件，也就相当于整个引用树的根节点，webpack打包需要从入口文件开始查找，根据引用关系，一直打包所有引用文件。
- 进行入口文件的配置，在根目录下新建webpack.config.js:

- path.resolve() 该方法将一些的 路径/路径段 解析为绝对路径。
- __dirname：用来动态获取当前文件模块所属目录的绝对路径
```
path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', 'baz')     // returns '/foo/bar/baz'
path.resolve('/foo/bar', '/baz')    // returns '/baz'
path.resolve('/foo/bar', '../baz')  // returns '/foo/baz'
```

#### 6.配置打包命令
- 去到 package.json 中配置打包命令
```
"scripts": {
  "build":"webpack"
}
```
但这其实不是我们想要的目的，我们的目标是将这个打包后的最终js文件，插入到刚刚的index.html中，
因为js文件得让html文件引用才有意义，所以不仅要打包js,还要打包html。

#### 在 webpack 中有三种生成哈希值规则的方式，可以用来区分文件是否修改
- hash 与整个项目有关，项目里有文件修改，所有文件的哈希值都会变化。
- chunkhash 与入口有关，同一入口的文件被视为一个整体，当其中一个文件修改时，同入口的所有文件哈希值发生改变。
- contenthash 只与文件内容有关，文件内容发生改变，才会更改该文件的哈希值。

hash、contenthash 和 chunkhash 是通过散列函数处理之后，生成的一串字符，可用于区分文件。
每一次编译后，生成的文件名都一样，这样会存在一个问题，通过 webpack 编译生成的静态文件会被我们放置到服务器中，当编译后的文件更新时，由于浏览器或者服务器设置的缓存策略，同名文件可能不会立刻被更新，导致用户访问到的仍然是上一次的版本。
为了解决这个问题，我们通常会在文件名上加一些哈希值，保证当更新文件时，浏览器会重新下载资源。
a. 这里使用 hash这个占位符
当项目里没有文件发生改变时，无论如何重新编译，文件哈希值都不会变。但此时，改变了 index.js文件，增加一句输出，所有文件的哈希值都会同时改变。
所有文件的哈希值都发生了变化，导致即使只更新了一个文件都需要重新加载所有资源，还是有些浪费性能的。
b. chunkhash
这里是多入口的项目，只改变了 index.js这个入口，不希望 main.js入口的文件也被修改，就可以使用占位符 chunkhash来解决，另外哈希值比较长，截取八位显示。
```
module.exports = {
  // 部分配置省略
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name]_[chunkhash:8].css',
    }),
  ],
};
```
可以看到同一个 chunk 打包出来的哈希值是一样的
当修改了 css 文件时，只有同 chunk 的 main.js 和 main.css 文件的哈希值发生了改变
css 文件是在 main.js这个 chunk 的，但其实 main.js本身没有发生任何修改，可以不用重新加载。
c. contenthash
同一个 chunk 中，部分文件修改导致所有文件的哈希值发生变化的问题，可以使用 contenthash 来解决，contenthash 只和每一个文件的内容有关，内容发生变化，则重新生成哈希值。
```
module.exports = {
  // 部分配置省略
  output: {
    filename: '[name]_[contenthash:8].js',
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name]_[contenthash:8].css',
    }),
  ],
};
```
- 每一个文件生成的哈希值都不一样

#### 7.打包html、loader和plugin
- loader:加载和解析非js文件，如css、图片、ts等等
- plugin:插件，拓展webpack打包功能，如优化体积、显示进度条等等
npm
打包html需要用到html-webpack-plugin这个插件，也就是plugin,所以需要安装一下：
- npm i html-webpack-plugin -D

#### 8.打包css
在src下新建styles文件夹，用来存放样式文件
- src/styles/index.scss
```
body {
    background-color: #31a8fa;
}
```
然后我们在入口文件main.js中引入
- import './styles/index.scss'

我们想要的效果是打包index.scss文件，并且让index.html自动引入打包后的css文件，所有需要安装一下几个东西：
- sass、sass-loader：可以将scss代码转成css
- css-loader：使webpack具有打包css的能力
- sass-resources-loader：可选，支持打包全局公共scss文件
- mini-css-extract-plugin：可将css代码打包成一个单独的css文件
- npm i sass sass-loader sass-resources-loader mini-css-extract-plugin css-loader -D

然后配置webpack.config.js

#### 9.打包图片
webpack5中已经废弃了url-loader，打包图片可以使用asset-module，
我们先放置一张图片在src/assets/images中：
改一下index.scss，将颜色背景改为将图片作为背景
```
body {
  // background-color: #ccc;
  width: 100vw;
  height: 100vh;
  // 引入背景图片
  background-image: url('../assets/images/test.png');
  background-size: 100% 100%;
}
```
然后在webpack.config.js中添加打包图片的配置

#### 10.配置babel
babel可以将我们项目中的高级语法转化成比较低级的语法，比如可以将ES6转为ES5，这样可以兼容一些低版本浏览器，所以是很有必要的
首先安装所需的包：
- @babel/core、babel-loader：转换语法的工具
- @babel/preset-env：转换的一套现成规则
- @babel/plugin-transform-runtime：转换async/await所需插件

- npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime -D

由于babel是针对js文件的语法转换，所以我们需要在webpack.config.js中去针对js进行操作
单单配置了babel-loader还是不够的，我们还需要配置babel转换的规则，所以需要在 根目录下创建babel.config.js
在 babel.config.js 中写入内容

#### 11.打包Vue
打包Vue需要用到以下几个包：
- vue：Vue开发所需的依赖
- vue-loader：解析.vue文件的loader
- vue-template-compiler：解析vue中模板的工具
- @vue/babel-preset-jsx：支持解析vue中的jsx语法
注意：vue和vue-template-compiler版本需要一致，这里我使用2.6.14这个版本，vue-loader使用了15.9.8这个版本
先安装一下：
- npm i vue@2.6.14 vue-template-compiler@2.6.14 vue-loader@15.9.8 @vue/babel-preset-jsx -D
然后需要在webpack.config.js中配置对.vue文件的解析
```
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
   //刚才的代码...
    plugins: [
       //刚才的代码...
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            //刚才的代码...
            {
                test:/\.vue$/,
                use:'vue-loader'
            }
        ]
    }
}
```
再到babel.config.js中配置一下，让webpack支持.vue文件中的jsx语法
```
// babel.config.js
module.exports = {
    presets: [
        // 配置规则
        "@babel/preset-env",
        //支持vue中的jsx语法
        "@vue/babel-preset-jsx"
    ],
    // 配置插件
    plugins: ["@babel/plugin-transform-runtime"]
}
```
现在到src下创建一个App.vue文件
```
<template>
    <div class="box">我是app.vue</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.box {
    width: 500px;
    height: 200px;
    color: #fff;
    background-color: #000;
}
</style>
```
然后改写一下src/main.js
```
import Vue from 'vue'
import App from './app.vue'

new Vue({
    render:(h)=>h(App)
}).$mount('#app')
```

#### 12.配置路径别名
- 有时候文件引用隔着太多层，引用起来会看起来很不明确，比如 ../../../../../app.vue， 需要配置一下别名alias可以完善这个问题:
```
module.exports = {
   //刚才的代码...
    resolve: {
        //路径别名
        alias: {
            '@':path.resolve('./src'),
            assets:'~/assets',
            tools:'~/tools'
        },
        //引入文件时省略后缀
        extensions:['.js','.ts','.less','.vue'],
    }
}
```
别名配置好后：
- 配置前：../../../../../app.vue
- 配置后：@/app.vue

#### 13.webpack-dev-server
- 我们发现，每改一次代码，就得重新打包一次，非常繁琐，有没有可以改代码后就自动重新打包的呢？这就要用到webpack-dev-server