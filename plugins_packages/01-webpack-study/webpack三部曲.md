## webpack 三部曲

ref: https://juejin.cn/post/6844904079219490830#heading-2

### webpack 基础

#### webpack 是什么

webpack 是一个现代 JavaScript 应用程序的**静态模块打包器**，当 webpack 处理应用程序时，会递归构建一个**依赖关系图**，其中包含应用程序需要的每个模块，然后将这些模块**打包成一个或多个 bundle**。

#### 核心概念

- entry: 入口
- output: 出口
- loader: 模块转换器
- plugins: 插件

#### 初始化项目

- 要使用 webpack，那么必然需要安装 webpack、webpack-cli:
  `npm install webpack webpack-cli -D `
- 新建 src/index.js，写代码

```javascript
//index.js
class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const dog = new Animal('dog');
```

- 使用 `npx webpack --mode=development` 进行构建，默认是 `production` 模式，我们为了更清楚得查看打包后的代码，使用 `development` 模式。
- 可以看到项目下多了个 dist 目录，里面有一个打包出来的文件 main.js。
- webpack 有默认的配置，如默认的入口文件是 `./src`，默认打包到 `dist/main.js`。更多的默认配置可以查看: `node_modules/webpack/lib/WebpackOptionsDefaulter.js`。
- 查看 dist/main.js 文件，可以看到，src/index.js 并没有被转义为低版本的代码，这显然不是我们想要的。

#### 将 JS 转义为低版本

- 前面我们说了 webpack 的四个核心概念，其中之一就是 loader，loader 用于对源代码进行转换，这正是我们现在所需要的。
- 将 JS 代码向低版本转换，我们需要使用 babel-loader。

**babel-loader**

- 首先安装一下 babel-loader, `npm install babel-loader -D `
- 此外，我们还需要配置 babel，为此我们安装一下以下依赖:
  `npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime -D`
  `npm install @babel/runtime @babel/runtime-corejs3`
- 新建 webpack.config.js，如下:

```javascript
//webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/, //排除 node_modules 目录
      },
    ],
  },
};
```

- 建议给 loader 指定 include 或是 exclude，指定其中一个即可，因为 node_modules 目录通常不需要我们去编译，排除后，有效提升编译效率。
- 这里，我们可以在 .babelrc 中编写 babel 的配置，也可以在 webpack.config.js 中进行配置。

```javascript
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

- 现在，我们重新执行 npx webpack --mode=development，查看 dist/main.js，会发现已经被编译成了低版本的 JS 代码。

#### 在 webpack 中配置 babel

- loader 需要配置在 module.rules 中，rules 是一个数组。
- loader 的格式为:

```javascript
{
    test: /\.jsx?$/,//匹配规则
    use: 'babel-loader'
}
// 以下是适用于只有一个 loader 的情况
{
    test: /\.jsx?$/,
    loader: 'babel-loader',
    options: {
        //...
    }
}
```

- test 字段是匹配规则，针对符合规则的文件进行处理。
- use 字段有几种写法
  - 可以是一个字符串，例如上面的 use: 'babel-loader'
  - use 字段可以是一个数组，例如处理 CSS 文件是，use: ['style-loader', 'css-loader']
  - use 数组的每一项既可以是字符串也可以是一个对象，当我们需要在 webpack 的配置文件中对 loader 进行配置，就需要将其编写为一个对象，并且在此对象的 options 字段中进行配置，如：

```javascript
rules: [
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
    exclude: /node_modules/,
  },
];
```

- 不要说细心的小伙伴了，即使是粗心的小伙伴肯定也发现了，我们在使用 webpack 进行打包的时候，一直运行的都是 npx webpack --mode=development 是否可以将 mode 配置在 webpack.config.js 中呢？显然是可以的。

#### mode

- 将 mode 增加到 webpack.config.js 中:

```javascript
module.exports = {
  //....
  mode: 'development',
  module: {
    //...
  },
};
```

- mode 配置项，告知 webpack 使用相应模式的内置优化。
- mode 配置项，支持以下两个配置:
  - development：将 process.env.NODE_ENV 的值设置为 development，启用 NamedChunksPlugin 和 NamedModulesPlugin
  - production：将 process.env.NODE_ENV 的值设置为 production，启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
- 现在，我们直接使用 npx webpack 进行编译即可。

#### 在浏览器中查看页面

- 查看页面，难免就需要 html 文件，有小伙伴可能知道，有时我们会指定打包文件中带有 hash，那么每次生成的 js 文件名会有所不同，总不能让我们每次都人工去修改 html，这样不是显得我们很蠢嘛~
  - 我们可以使用 html-webpack-plugin 插件来帮助我们完成这些事情。
  - 首先安装插件, `npm install html-webpack-plugin -D`
- 新建 public 目录，并在其中新建一个 index.html 文件，( 文件内容使用 html:5 快捷生成即可)
- 修改 webpack.config.js 文件。

```javascript
//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //...
  plugins: [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
      },
      // hash: true //是否加上hash，默认是 false
    }),
  ],
};
```

- 此时执行 npx webpack，可以看到 dist 目录下新增了 index.html 文件，并且其中自动插入了 <script> 脚本，引入的是我们打包之后的 js 文件。
  - 这里要多说一点点东西，HtmlWebpackPlugin 还为我们提供了一个 config 的配置，这个配置可以说是非常有用了。
- html-webpack-plugin 的 config 的妙用
  - 有时候，我们的脚手架不仅仅给自己使用，也许还提供给其它业务使用，html 文件的可配置性可能很重要，比如：你公司有专门的部门提供 M 页的公共头部/公共尾部，埋点 jssdk 以及分享的 jssdk 等等，但是不是每个业务都需要这些内容。
    一个功能可能对应多个 js 或者是 css 文件，如果每次都是业务自行修改 public/index.html 文件，也挺麻烦的。首先他们得搞清楚每个功能需要引入的文件，然后才能对 index.html 进行修改。
    此时我们可以增加一个配置文件，业务通过设置 true 或 false 来选出自己需要的功能，我们再根据配置文件的内容，为每个业务生成相应的 html 文件，岂不是美美的。
- 首先，我们在 public 目录下新增一个 config.js ( 文件名你喜欢叫什么就叫什么 )，将其内容设置为:

```javascript
//public/config.js 除了以下的配置之外，这里面还可以有许多其他配置，例如,pulicPath 的路径等等
module.exports = {
  dev: {
    template: {
      title: '你好',
      header: false,
      footer: false,
    },
  },
  build: {
    template: {
      title: '你好才怪',
      header: true,
      footer: false,
    },
  },
};
```

- 现在，我们修改下我们的 webpack.config.js:

```javascript
//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];

modue.exports = {
    //...
    mode: isDev ? 'development' : 'production'
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            config: config.template
        })
    ]
}
```

- 相应的，我们需要修改下我们的 public/index.html 文件(嵌入的 js 和 css 并不存在，仅作为示意)：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <% if(htmlWebpackPlugin.options.config.header) { %>
    <link rel="stylesheet" type="text/css" href="//common/css/header.css" />
    <% } %>
    <title><%= (htmlWebpackPlugin.options.config.title) %></title>
  </head>
  <body></body>
  <% if(htmlWebpackPlugin.options.config.header) { %>
  <script src="//common/header.min.js" type="text/javascript"></script>
  <% } %>
</html>
```

- process.env 中默认并没有 NODE_ENV，这里配置下我们的 package.json 的 scripts.
- 为了兼容 Windows 和 Mac，我们先安装一下 cross-env: `npm install cross-env -D`

- 然后我们运行 npm run dev 和 运行 npm run build ，对比下 dist/index.html ，可以看到 npm run build，生成的 index.html 文件中引入了对应的 css 和 js。并且对应的 title 内容也不一样。
- 我们还是可以在 webpack.config.js 中进行 webpack-dev-server 的其它配置，例如指定端口号，设置浏览器控制台消息，是否压缩等等:

```javascript
//webpack.config.js
module.exports = {
  //...
  devServer: {
    port: '3000', //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only', //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: 'silent', //日志等级
    compress: true, //是否启用 gzip 压缩
  },
};
```

- 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见 ———— 我是不会开启这个的，看不到错误日志，还搞个锤子
- stats: "errors-only" ， 终端中仅打印出 error，注意当启用了 quiet 或者是 noInfo 时，此属性不起作用。 ————— 这个属性个人觉得很有用，尤其是我们启用了 eslint 或者使用 TS 进行开发的时候，太多的编译信息在终端中，会干扰到我们。
- 启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。

#### devtool

- devtool 中的一些设置，可以帮助我们将编译后的代码映射回原始源代码。不同的值会明显影响到构建和重新构建的速度。

```javascript
//webpack.config.js
module.exports = {
  devtool: 'cheap-module-eval-source-map', //开发环境下使用
};
```

- 生产环境可以使用 none 或者是 source-map，使用 source-map 最终会单独打包出一个 .map 文件，我们可以根据报错信息和此 map 文件，进行错误解析，定位到源代码。
- source-map 和 hidden-source-map 都会打包生成单独的 .map 文件，区别在于，source-map 会在打包出的 js 文件中增加一个引用注释，以便开发工具知道在哪里可以找到它。hidden-source-map 则不会在打包的 js 中增加引用注释。

#### 如何处理样式文件呢

- webpack 不能直接处理 css，需要借助 loader。如果是 .css，我们需要的 loader 通常有： style-loader、css-loader，考虑到兼容性问题，还需要 postcss-loader，而如果是 less 或者是 sass 的话，还需要 less-loader 和 sass-loader，这里配置一下 less 和 css 文件(sass 的话，使用 sass-loader 即可):
- 安装依赖, `npm install style-loader less-loader css-loader postcss-loader autoprefixer less -D `

```javascript
//webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({
                    overrideBrowserslist: ['>0.25%', 'not dead'],
                  }),
                ];
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
```

- 测试一下，新建一个 less 文件，src/index.less:

```javascript
//src/index.less
@color: red;
body{
    background: @color;
    transition: all 2s;
}

```

- 再在入口文件中引入此 less:

```javascript
//src/index.js
import './index.less';
```

- style-loader 动态创建 style 标签，将 css 插入到 head 中.
- css-loader 负责处理 @import 等语句。
- postcss-loader 和 autoprefixer，自动生成浏览器兼容性前缀 —— 2020 了，应该没人去自己徒手去写浏览器前缀了吧
- less-loader 负责处理编译 .less 文件,将其转为 css
- loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行，上面 loader 的执行顺序为: less-loader ---> postcss-loader ---> css-loader ---> style-loader

#### 图片/字体文件处理

- 我们可以使用 url-loader 或者 file-loader 来处理本地的资源文件。url-loader 和 file-loader 的功能类似，但是 url-loader 可以指定在文件大小小于指定的限制时，返回 DataURL，因此，个人会优先选择使用 url-loader。
- 安装依赖： `npm install url-loader -D`
- 安装 url-loader 的时候，控制台会提示你，还需要安装下 file-loader, `npm install file-loader -D`

```javascript
//webpack.config.js
module.exports = {
  //...
  modules: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
```

- 此处设置 limit 的值大小为 10240，即资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录。esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
- 将资源转换为 base64 可以减少网络请求次数，但是 base64 数据较大，如果太多的资源是 base64，会导致加载变慢，因此设置 limit 值时，需要二者兼顾。
- 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
- 当然，你也可以通过 options 参数进行修改。

```javascript
//....
use: [
  {
    loader: 'url-loader',
    options: {
      limit: 10240, //10K
      esModule: false,
      name: '[name]_[hash:6].[ext]',
    },
  },
];
```

- 当本地资源较多时，我们有时会希望它们能打包在一个文件夹下，这也很简单，我们只需要在 url-loader 的 options 中指定 outpath，如: outputPath: 'assets'
- 不过还没完，如果你在 public/index.html 文件中，使用本地的图片，例如，我们修改一下 public/index.html
  `<img src="./a.jpg" />`

#### 处理 html 中的本地图片

- 安装 html-withimg-loader 来解决咯
- 修改 webpack.config.js

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /.html$/,
        use: 'html-withimg-loader',
      },
    ],
  },
};
```

#### 入口配置

- 入口的字段为: entry

```javascript
//webpack.config.js
module.exports = {
  entry: './src/index.js', //webpack的默认配置
};
// 为数组时候的配置
entry: ['./src/polyfills.js', './src/index.js'];
```

#### 出口配置

- 配置 output 选项可以控制 webpack 如何输出编译文件。

```javascript
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'bundle.js',
    publicPath: '/', //通常是CDN地址
  },
};
```

- 编译时，可以不配置，或者配置为 /。可以在我们之前提及的 config.js 中指定 publicPath（config.js 中区分了 dev 和 public）， 当然还可以区分不同的环境指定配置文件来设置，或者是根据 isDev 字段来设置。
- 除此之外呢，考虑到 CDN 缓存的问题，我们一般会给文件名加上 hash.

```javascript
//webpack.config.js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'bundle.[hash].js',
    publicPath: '/', //通常是CDN地址
  },
};
```

- 如果你觉得 hash 串太长的话，还可以指定长度，例如 bundle.[hash:6].js。使用 npm run build 打包看看吧。

#### 每次打包前清空 dist 目录

- 反正我是懒得手动去清理的，只要你足够懒，你总是会找到好办法的，懒人推动科技进步。这里，我们需要插件: clean-webpack-plugin
- 以前，clean-webpack-plugin 是默认导出的，现在不是，所以引用的时候，需要注意一下。另外，现在构造函数接受的参数是一个对象，可缺省。

```javascript
//webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //...
  plugins: [
    //不需要传参数喔，它可以找到 outputPath
    new CleanWebpackPlugin(),
  ],
};
```

- 现在你再修改文件，重现构建，生成的 hash 值和之前 dist 中的不一样，但是因为每次 clean-webpack-plugin 都会帮我们先清空一波 dist 目录，所以不会出现太多文件，傻傻分不清楚究竟哪个是新生成文件的情况。

#### 希望 dist 目录下某个文件夹不被清空

- 不过呢，有些时候，我们并不希望整个 dist 目录都被清空，比如，我们不希望，每次打包的时候，都删除 dll 目录，以及 dll 目录下的文件或子目录，该怎么办呢？
- clean-webpack-plugin 为我们提供了参数 cleanOnceBeforeBuildPatterns

```javascript
//webpack.config.js
module.exports = {
  //...
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'], //不删除dll目录下的文件
    }),
  ],
};
```
