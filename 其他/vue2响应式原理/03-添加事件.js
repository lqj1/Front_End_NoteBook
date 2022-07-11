class Vue{
  constructor(options) {
    // 赋值给下面的函数使用
    this.$options = options
    if (typeof options.beforeCreate === 'function') {
      options.beforeCreate.bind(this)()
    }
    this.$data = options.data
    if (typeof options.created === 'function') {
      options.created.bind(this)()
    }
    if (typeof options.beforeMount === 'function') {
      options.beforeMount.bind(this)()
    }
    this.$el = document.querySelector(options.el)
    // 有节点之后就可以 模板解析
    this.compile(this.$el)
    if (typeof options.mounted === 'function') {
      options.mounted.bind(this)()
    }
  }
  /**
   * 模板编译函数
   * @param {节点元素} node 
   */
  compile (node) {
    /**
     * 添加事件流程
     * 在模板编译中，先判断节点是否包含 '@click'
     * 有的话，获取 '@click' 的属性为 vmKey，然后给元素添加 click 方法，方法名为 vmKey，并执行
     */
    node.childNodes.forEach((item, index) => {
      if (item.nodeType === 1) {
        // console.log(item.hasAttribute('@click'));
        // 判断元素节点是否绑定了 @click
        if (item.hasAttribute('@click')) {
          // @click 后绑定的属性值
          let vmKey = item.getAttribute('@click').trim()
          // 其中 event 为事件对象
          item.addEventListener('click', (event) => {
            // 改变this指向并改变this指向
            this.eventFn = this.$options.methods[vmKey].bind(this) 
            // 执行method中的函数
            this.eventFn(event)
          })
        }
        // 如果节点元素多个，就一直递归到底层
        if (item.childNodes.length > 0) {
          this.compile(item)
        }
      }
      if (item.nodeType === 3) {
        let reg = /\{\{(.*?)\}\}/g
        let text = item.textContent
        item.textContent = text.replace(reg, (match, vmKey) => {
          vmKey = vmKey.trim()
          return this.$data[vmKey]
        })
      }
    })
  }
}