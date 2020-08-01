import Vue from 'vue'
import Router from 'vue-router'
import Characters from '@/components/pages/Characters'
import AddRoles from '@/components/pages/AddRoles'
import Home from '@/components/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    },
    {
      path: '/roles',
      name: 'AddRoles',
      component: AddRoles
    }
  ]
})
