/**
 * 双向绑定原理
 * 在input上绑定监听事件
 * 通过Object.defineProperty劫持数据发生的改变
 * 如果数据发生改变(在set中赋值)，触发update进行更新dom节点内容({{}})
 * 从而实现双向绑定原理
 */
class Vue{
  constructor(options) {
    this.$options = options
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
        // 双向绑定部分，判断元素节点是否添加 v-model，这里是触发点，observe是监听并实现双向绑定
        if (item.hasAttribute('v-model')) {
          let vmKey = item.getAttribute('v-model').trim()
          // 判断对象中是否有属性
          if (this.hasOwnProperty(vmKey)) {
            // 将值放在绑定model的input的value上
            item.value = this[vmKey]
          }
          // 监听输入框的输入事件，这里修改会触发observe中的set函数，然后就会触发update，去更新·
          item.addEventListener('input', (event) => {
            // 将节点的value值赋给str
            this[vmKey] = item.value
            // this中的str和data中的str都改变了，因为它们做了数据劫持
            console.log(this);
          })
        }

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
            let watcher = new Watch(this,vmKey,item,'textContent')
            if (this.$watchEvent[vmKey]) {  
              this.$watchEvent[vmKey].push(watcher)
            } else {
              this.$watchEvent[vmKey] = []
              this.$watchEvent[vmKey].push(watcher)
            }
          }
          return this.$data[vmKey]
        })
      }
    })
  }
}
class Watch { 
  constructor(vm, key, node, attr) {
    this.vm = vm
    this.key = key
    this.node = node
    this.attr = attr
  }
  update () {
    this.node[this.attr] = this.vm[this.key]
  }
}