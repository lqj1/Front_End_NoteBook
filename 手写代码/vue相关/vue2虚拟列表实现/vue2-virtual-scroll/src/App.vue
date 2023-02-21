<!-- 
List组件上面有几个参数，分别介绍一下这几个参数的意义：
  items：要进行渲染的列表数据；
  size：每一条数据的高度；
  showNumber：每次渲染的数据条数（DOM个数）；
后续还可以继续给这个组件添加属性，用来决定一些数据的性质等

  -- 虚拟列表需要，手动滑动滚动条，触发 scroll 事件，监听 scrollTop
 -->

<template>
  <div>
    <List
      :items="items"
      :size="60"
      :shownumber="10"
    />
  </div>
</template>

<script>
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    List
  },
  computed: {
    // 要进行渲染的数据列表
    items () {
      // 自己模拟一万条数据，将其内容进行填充
      return Array(10000).fill('').map((item, index) => ({
        id: index,
        content: '列表项内容' + index
      }))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>