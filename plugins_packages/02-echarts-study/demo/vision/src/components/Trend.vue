<!--销量趋势图表(折线图)
-->
<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{'▍ ' + showTitle}}</span>
      <span class="iconfont title-icon" :style="comStyle" @click="showChoice=!showChoice">&#xe6eb;</span>
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div class="select-item" v-for="item in selectTypes" :key="item.key" @click="handleSelect(item.key)">
          {{item.text}}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,  // 从服务器获取的所有数据
      showChoice: false, // 是否显示可选项
      choiceType: 'map', // 显示的类型
      titleFont: 0, // 指明标题的字体大小
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  computed: {
    selectTypes () {
      if (!this.allData) {
        return []
      } else {
        return this.allData.type.filter(item => {
          return item.key !== this.choiceType
        })
      }
    },
    showTitle () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },
    // 设置给标题的样式
    comStyle () {
      return {
        fontSize: this.titleFont + 'px'
      }
    },
    marginStyle () {
      return {
        marginLeft: this.titleFont + 'px'
      }
    }
  },
  methods: {
    handleSelect (currentType) {
      // console.log('curr', currentType)
      this.choiceType = currentType
      this.updateChart()
      this.showChoice = false
    },
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, 'chalk')
      const initOption = {
        grid: {
          left: '3%',
          top: '30%',
          right: '4%',
          bottom: '1',
          containLabel: true  // 坐标轴文字设置
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,  // 对y轴进行延伸，图的左侧没有间隙
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    async getData () {
      // this.$http.get()
      const { data: ret } = await this.$http.get('trend')
      this.allData = ret
      this.updateChart()
    },
    updateChart () {
      // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 210, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)',
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 210, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)',
      ]
      // 类目轴数据
      const timeArr = this.allData.common.month
      // y轴数据 series 下的数据
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name, // 图例的值需要和series下的name保持一致 
          type: 'line',
          data: item.data,
          // stack: 'map',  // 堆叠图，每一条类目轴使用相同值
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              // 0%的颜色值
              {
                offset: 0,
                color: colorArr1[index]
              },
              // 100%的颜色值
              {
                offset: 1,
                color: colorArr2[index]
              }
            ])
          }  // 填充与x轴的间隙
        }
      })
      // 图例的数据
      const legendArr = valueArr.map(item => {
        return item.name
      })
      // 处理数据的option
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      this.titleFont = this.$refs.trend_ref.offsetWidth / 100 * 3.6
      // 处理适配的option
      const adapterOption = {
        legend: {
          itemWidth: this.titleFont,
          itemHeight: this.titleFont,
          itemGap: this.titleFont,
          textStyle: {
            fontSize: this.titleFont / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .select-con  {
    background: #222333;
    .select-item {
      cursor: pointer;
    }
  }
}
</style>