class Vue{
  constructor(options) {
    if (typeof options.beforeCreate === 'function') {
      console.log('this1: ', this);
      // options.beforeCreate()
      // 上面的this，指向的new Vue对象，使用bind改变this，指向 constructor 内部
      options.beforeCreate.bind(this)()
    }
    // created 阶段就可以访问到数据了
    this.$data = options.data
    if (typeof options.created === 'function') {
      options.created.bind(this)()
    }
    if (typeof options.beforeMount === 'function') {
      options.beforeMount.bind(this)()
    }
    // 挂载后，mounted阶段，el就有dom值了
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
    node.childNodes.forEach((item, index) => {
      if (item.nodeType === 1) {
        this.compile(item)
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