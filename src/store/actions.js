import * as types from './mutation-types'
import * as api from './api'

export default {
  getUserInfo({
    commit
  }, {
    wxId
  }) {
    return api.fetchUserInfo(wxId)
      .then(body => Promise.resolve(body))
      .then(userInfo => {
        commit(types.SET_USER_INFO, {
          userInfo
        })
      })
  },
  getRedpacket({
    commit
  }, {
    wxId
  }) {
    return api.postRedpack(wxId)
      .then(body => Promise.resolve(body))
      .then(redpack => {
        commit(types.SET_REDPACKET, {
          redpack
        })
      })
  },
  getHasRedpack({
    commit
  }, {
    wxId
  }) {
    return api.fetchHasRedpack(wxId)
      .then(body => Promise.resolve(body))
      .then(hasRedpack => {
        commit(types.SET_HAS_REDPACK, {
          hasRedpack
        })
      })
  },
  getRedpacketConfig({
    commit
  },{
    wxId
  }) {
    return api.fetchRedpackConfig(wxId)
      .then(body => Promise.resolve(body))
      .then(redpacketConfig => {
        commit(types.SET_REDPACKET_CONFING, {
          redpacketConfig
        })
      })
  },
}
