class Vue{
  // options 就是html文件中 new Vue 后面的实例
  constructor(options) {
    // console.log(options);
    // 获取根节点dom
    this.$el = document.querySelector(options.el)
    // 模板编译，找到 html 中 #app 下面的 {{}} 中的值，然后赋值为 data 中的数据
    // 先获取data中的值
    this.$data = options.data
    this.compile(this.$el)
  }
  /**
   * 模板编译函数
   * @param {节点元素} node 
   */
  compile (node) {
    // <div id="app"> <h1>{{ str }}</h1> {{ str }} </div>
    // 上面的子节点为 NodeList(3)
    // 1: 文本节点，空字符包括回车
    // 2: 元素节点，<h1>{{ str }}</h1>
    // 3: 文本节点，"  {{ str }} "，空字符+{{str}}
    // console.log(node.childNodes);
    node.childNodes.forEach((item, index) => {
      // console.log(item);
      // 判断元素类型，文本节点为3，元素节点为1
      // 元素节点 <h1>{{ str }}</h1>
      if (item.nodeType === 1) {
        this.compile(item)
      }
      // 文本节点  {{ str }} 
      if (item.nodeType === 3) {
        // 给节点赋值
        // 正则匹配 {{}}
        // (.*?)表示除换行符以外的任意字符
        // .*？  表示匹配任意字符到下一个符合条件的字符
        // 例子：正则表达式a.*?xxx   可以匹配 abxxx  axxxxx  abbbbbxxx

        // 所以这里匹配到有两个右括号就结束
        let reg = /\{\{(.*?)\}\}/g
        let text = item.textContent
        // 给节点赋值
        item.textContent = text.replace(reg, (match, vmKey) => {
          // 去除{{}}中 str 的空格
          vmKey = vmKey.trim()
          return this.$data[vmKey]
        })
      }
    })
  }
}