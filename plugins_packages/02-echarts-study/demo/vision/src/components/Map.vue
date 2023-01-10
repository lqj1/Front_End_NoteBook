<!--
  商家销量统计(地图+散点图)
-->
<template>
  <div class="com-container" @dblclick="returnChinaMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      mapData: {} // 获取的省份的地图矢量数据
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
  methods: {
    // 回到中国地图
    returnChinaMap () {
      alert()
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    },
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, 'chalk')
      // 获取中国地图的矢量数据
      // http://localhost:8999/static/map/china.json
      // 由于我们现在获取的地图矢量数据并不是位于KOA2的后台，所以不能使用this.$http
      // 可以直接使用 axios
      const ret = await axios.get('http://localhost:8999/static/map/china.json')
      // console.log('ret', ret)
      this.$echarts.registerMap('china', ret.data) // 参数1: 名字， 参数2: 数据
      const initOption = {
        title: {
          text: '▎ 商家分布',
          left: 20,
          top: 20,
        },
        geo: {
          type: 'map',
          map: 'china', // 上面定义的名字
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        }
      }
      this.chartInstance.setOption(initOption)
      // 监听点击事件
      this.chartInstance.on('click', async (arg) => {
        // console.log('arg', arg)
        const provinceInfo = getProvinceMapInfo(arg.name)
        // console.log('ppp', provinceInfo);
        // 获取这个省份的地图矢量数据
        // 判断当前所点击这个省份的地图矢量数据在mapData中是否存在，不存在才发axios请求
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get('http://localhost:8999' + provinceInfo.path)
          this.mapData[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        // 切换地图显示
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    async getData () {
      // 获取后台服务器的地图的散点数据，对this.allData进行赋值之后，调用updateChart方法更新图表
      const { data: ret } = await this.$http.get('map')
      // console.log('ret', ret)
      this.allData = ret
      this.updateChart()
    },
    updateChart () {
      // 处理地图需要的数据
      // 图例的数据
      const legendArr = this.allData.map(item => {
        return item.name
      })
      const seriesArr = this.allData.map(item => {
        // return 一个类别下的所有散点数据
        // 如果想在地图中显示散点的数据，需要给散点的图表增加一个配置，coordinateSystem:geo
        return {
          type: 'effectScatter',
          // 控制涟漪效果
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize() // 自适应
    }
  }
}
</script>

<style lang="less" scoped>

</style>