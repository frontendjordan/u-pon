import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import Home from './views/Home.vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:school',
      name: 'school',
      component: () => import(/* webpackChunkName: "school" */ './views/School.vue')      
    }
    //old initial view
    // {
    //   path: '/:school/categories',
    //   name: 'categories',
    //   component: () => import(/* webpackChunkName: "venues" */ './views/Categories.vue')       
    // }
  ]
})
