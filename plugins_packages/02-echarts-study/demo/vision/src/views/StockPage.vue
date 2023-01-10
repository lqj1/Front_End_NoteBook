<!--
针对 /stockpage 这条路径显示出来的
在这个组件中，通过子组件注册的方式，要显示出 Stock.vue 这个组件
-->
<template>
  <div class="com-page">
    <stock></stock>
  </div>
</template>

<script>
import Stock from '@/components/Stock'
export default {
  components: {
    stock: Stock
  }
}
</script>

<style lang="less" scoped>

</style>