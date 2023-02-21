<template>
  <div
    class="container"
    :style="{ height: containerHeight }"
    @scroll="handleScroll"
    ref="container"
  >
    <!-- 数据列表 -->
    <div
      class="list"
      :style="{ top: listTop }"
    >
      <!-- 列表项 -->
      <div
        v-for="item in showData"
        :key="item.id"
        :style="{ height: size + 'px' }"
      >
        {{ item.content }}
      </div>

      <!-- 用于撑开高度的元素，展示滑动条 -->
      <div
        class="bar"
        :style="{ height: barHeight }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VircualList',
  props: {
    // 要渲染的数据
    items: {
      type: Array,
      required: true
    },
    // 每条数据渲染的节点的高度
    size: {
      type: Number,
      required: true
    },
    // 每次渲染的 DOM 节点个数
    shownumber: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      start: 0, // 要展示的数据的起始下标
      end: this.shownumber // 要展示的数据的结束下标
    }
  },

  /**
   * 
   * 在每次滚动的时候，就需要去修改要重新渲染的数据的起始和结束下标：
   * 起始下标的计算 = 区域向上卷去的高度 scrollTop ÷每个数据的高度 size ，然后向下取整
   * 结束下标的计算 = 起始的下标 + 页面展示的数据的条数 shownumber
   */

  computed: {
    // 最终筛选出的要展示的数据，变动
    showData () {
      return this.items.slice(this.start, this.end)
    },
    // 容器的高度，固定
    containerHeight () {
      return this.size * this.shownumber + 'px'
    },
    // 撑开容器内容高度的元素的高度，固定
    barHeight () {
      return this.size * this.items.length + 'px'
    },
    // 列表向上滚动时要动态改变 top 值，变动
    listTop () {
      return this.start * this.size + 'px'
    }
  },
  methods: {
    // 容器的滚动事件
    /**
     * 主要参数：scrollTop, scrollTop除以大小，就得到开始的下标
     *         对总数据，进行 slice 取需要展示的数量
     */
    handleScroll () {
      // 获取容器顶部滚动的尺寸
      const scrollTop = this.$refs.container.scrollTop
      console.log('scrollTop: ', scrollTop);
      // 计算卷去的数据条数，用计算的结果作为获取数据的起始和结束下标
      // 起始的下标就是卷去的数据条数，向下取整
      this.start = Math.floor(scrollTop / this.size)
      console.log('start: ', this.start);
      // 结束的下标就是起始的下标加上要展示的数据条数
      this.end = this.start + this.shownumber
      console.log('end: ', this.end);
    }
  }
}
</script>

<style scoped>
.container {
  overflow-y: scroll;
  background-color: rgb(150, 195, 238);
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
}

.list {
  position: relative;
  height: 100%;
}
</style>