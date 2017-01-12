import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  redpacketConfig:{},
  userInfo:{},
  redpack:{},
  hasRedpack:false,//是否已经获取红包
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
