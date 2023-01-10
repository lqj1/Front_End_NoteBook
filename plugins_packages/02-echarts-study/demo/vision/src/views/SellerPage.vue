<!--
针对 /sellerpage 这条路径显示出来的
在这个组件中，通过子组件注册的方式，要显示出 Seller.vue 这个组件
-->
<template>
  <div class="com-page">
    <Seller></Seller>
  </div>
</template>

<script>
import Seller from '@/components/Seller'
export default {
  components: {
    Seller
  }
}
</script>

<style lang="less" scoped>

</style>