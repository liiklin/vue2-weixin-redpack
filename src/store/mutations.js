import * as types from './mutation-types'

export default {
  [types.SET_REDPACKET_CONFING](state, {redpacketConfig}) {
    state.redpacketConfig = redpacketConfig
  },
  [types.SET_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [types.SET_REDPACKET](state, {redpack}) {
    state.redpack = redpack
  },
  [types.SET_HAS_REDPACK](state, {hasRedpack}) {
    state.hasRedpack = hasRedpack
  },
}
