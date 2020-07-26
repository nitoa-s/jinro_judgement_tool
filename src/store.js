import Vue from 'vue'
import Vuex from 'vuex'
import characters from './store/modules/characters'
import jinroData from './store/modules/jinroData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    characters,
    jinroData
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})