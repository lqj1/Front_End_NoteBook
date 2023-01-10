<!--
针对 /hotpage 这条路径显示出来的
在这个组件中，通过子组件注册的方式，要显示出 Hot.vue 这个组件
-->
<template>
  <div class="com-page">
    <hot></hot>
  </div>
</template>

<script>
import Hot from '@/components/Hot'
export default {
  components: {
    hot: Hot
  }
}
</script>

<style lang="less" scoped>

</style>