<!--
针对 /mapperpage 这条路径显示出来的
在这个组件中，通过子组件注册的方式，要显示出 Map.vue 这个组件
-->
<template>
  <div class="com-page">
    <single-map></single-map>
  </div>
</template>

<script>
import Map from '@/components/Map'
export default {
  components: {
    'single-map': Map
  }
}
</script>

<style lang="less" scoped>

</style>