<!--
  商家销量统计(横向柱状图)
-->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,  // 服务器返回的数据
      currentPage: 1, // 当前显示页数
      totalPage: 0, // 总页数
      timeId: null, // 定时器标识
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    // 页面加载完成时，就主动进行屏幕的适配
    this.screenAdapter()
  },
  destroyed () {
    clearInterval(this.timeId)
    // 组件销毁的时候，需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化 echartInstance 对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, 'chalk')
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '▍ 商家销售统计',
          left: 20,
          top: 20,
        },
        // 坐标轴的位置配置
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true,  // 距离包含坐标轴上的文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          // data: sellerNames
        },
        // 提示
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2D3443'
            }
          }
        },
        series: [
          {
            type: 'bar',
            // data: sellerValue,
            // 条状文字中的配置
            label: {
              show: true,  // 文字展示
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            // 每一条目的配置
            itemStyle: {
              // 指明颜色渐变的方向
              // 指明不同百分比之下颜色的值
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [  // (0,0)->(1,0) 从左向右
                // 0%状态下的颜色值 
                {
                  offset: 0,
                  color: '#5052EE'
                },
                // 100%状态下的颜色值
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)  // 初始化的option
      // 对图表对象进行鼠标事件的监听
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // 获取服务器的数据
    async getData () {
      // http://127.0.0.1:8888/api/seller
      const { data: ret } = await this.$http.get('seller')
      this.allData = ret
      // 对数据排序
      this.allData.sort((a, b) => {
        return a.value - b.value  // 从小到大排序
      })
      // 每5个元素显示一页
      this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : (this.allData.length / 5 + 1)
      this.updateChart()
      this.startInterval()
    },
    // 更新图表
    updateChart () {
      const start = (this.currentPage - 1) * 5
      const end = (this.currentPage * 5)
      const showData = this.allData.slice(start, end)
      const sellerNames = showData.map((item) => {
        return item.name
      })
      const sellerValue = showData.map((item) => {
        return item.value
      })
      const dataOption = {
        yAxis: {
          data: sellerNames
        },
        series: [
          {
            data: sellerValue
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    // 定时器更新图表
    startInterval () {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 3000);
    },
    // 屏幕适配
    screenAdapter () {
      const titleFont = this.$refs.seller_ref.offsetWidth / 100 * 3.6
      // 和分辨率大小相关的配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFont
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFont,
            }
          }
        },
        series: [
          {
            barWidth: titleFont,
            itemStyle: {
              barBorderRadius: [0, titleFont / 2, titleFont / 2, 0]  // 左上，右上，右下，左下，为barWidth的一半
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      // 手动调用图表对象的resize才能产生效果
      this.chartInstance.resize()
    }
  }
}
</script>

<style lang="less" scoped>

</style>