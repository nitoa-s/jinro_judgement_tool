import Vue from 'vue'
import Router from 'vue-router'
import Characters from '@/components/pages/Characters'
import Roles from '@/components/pages/Roles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    },
    {
      path: '/roles',
      name: 'Roles',
      component: Roles
    }
  ]
})
