class Vue{
  constructor(options) {
    this.$options = options
    // 更新视图部分，存放数据变化元素的结合
    this.$watchEvent = {}
    if (typeof options.beforeCreate === 'function') {
      options.beforeCreate.bind(this)()
    }
    this.$data = options.data
    this.proxyData()
    // 更新视图部分
    this.observe()
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
   * 视图更新
   * 将所有数据存储到数组/对象
   * 找到改变去，去更新它
   */
  proxyData () {
    for (let key in this.$data) {
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
  /**
   * 更新视图部分，触发data中的数据发生变化来执行watch中的update
   * 1. 
   */
  observe () {
    for (let key in this.$data) {
      let value = this.$data[key]
      let that = this
      Object.defineProperty(this.$data, key, {
        get () {
          return value
        },
        set (val) {
          value = val
          if (that.$watchEvent[key]) {
            // 某一个改变了，就会执行 update，将this.$watchEvent[vmKey]，也就是 this.$watchEvent中改变的全都更新
            that.$watchEvent[key].forEach((item, index) => {
              item.update()
            })
          } 
        }
      })
    }
  }
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
          if (this.hasOwnProperty(vmKey)) {
            // vmKey是data中的数据
            // 将数据存储到 watch
            let watcher = new Watch(this,vmKey,item,'textContent')
            if (this.$watchEvent[vmKey]) {  // 第一次，watchEvent没有键值，存放进去
              this.$watchEvent[vmKey].push(watcher)
            } else {
              this.$watchEvent[vmKey] = []
              this.$watchEvent[vmKey].push(watcher)
            }
            // console.log(this.$watchEvent); // 这里最终有三个值，一个b，两个str
          }
          return this.$data[vmKey]
        })
      }
    })
  }
}
class Watch { 
  constructor(vm, key, node, attr) {
    // 对象
    this.vm = vm
    // 属性名称
    this.key = key
    // 节点
    this.node = node
    // 改变文本节点内容的字符串
    this.attr = attr
  }
  // 执行改变(update)操作
  update () {
    // this.vm[this.key]是修改后的对象的值
    this.node[this.attr] = this.vm[this.key]
  }
}