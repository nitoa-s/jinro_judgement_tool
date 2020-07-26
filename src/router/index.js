import Vue from 'vue'
import Router from 'vue-router'
import Characters from '@/components/pages/Characters'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    }
  ]
})
