class Vue{
  constructor(options) {
    this.$options = options
    if (typeof options.beforeCreate === 'function') {
      options.beforeCreate.bind(this)()
    }
    this.$data = options.data
    // 数据劫持函数，放在数据初始化之后
    this.proxyData()
    if (typeof options.created === 'function') {
      options.created.bind(this)()
    }
    if (typeof options.beforeMount === 'function') {
      options.beforeMount.bind(this)()
    }
    this.$el = document.querySelector(options.el)
    this.compile(this.$el)
    if (typeof options.mounted === 'function') {
      options.mounted.bind(this)()
    }
  }
  /**
   * 数据劫持函数
   * 1. 给Vue大对象赋属性，来自于data中
   * 2. data中的属性值和Vue大对象的属性值保持双向（数据劫持）
   * 3. 
   */
  proxyData () {
    for (let key in this.$data) {
      // 监测data数据，key 表示data中的键
      Object.defineProperty(this, key, {
        get () {
          return this.$data[key]
        },
        set (val) {
          this.$data[key] = val
        }
      })  
    }
  }
  /**
   * 模板编译函数
   * @param {节点元素} node 
   */
  compile (node) {
    node.childNodes.forEach((item, index) => {
      if (item.nodeType === 1) {
        if (item.hasAttribute('@click')) {
          let vmKey = item.getAttribute('@click').trim()
          item.addEventListener('click', (event) => {
            this.eventFn = this.$options.methods[vmKey].bind(this) 
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