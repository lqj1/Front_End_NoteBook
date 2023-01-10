import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/sellerpage',
    component: () => import('@/views/SellerPage')
  },
  {
    path: '/trendpage',
    component: () => import('@/views/TrendPage')
  },
  {
    path: '/mappage',
    component: () => import('@/views/MapPage')
  },
  {
    path: '/rankpage',
    component: () => import('@/views/RankPage')
  },
  {
    path: '/hotpage',
    component: () => import('@/views/HotPage')
  },
  {
    path: '/stockpage',
    component: () => import('@/views/StockPage')
  }
]

const router = new VueRouter({
  routes
})

export default router