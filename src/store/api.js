import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'underscore'
import {
  API_ROOT
} from './config'

Vue.use(Vuex)

function creatLog(userId) {
  return encodeURIComponent(JSON.stringify({
    begTime: new Date().getTime(),
    app: "weixin",
    userId
  }))
}

function fetch(child) {
  return new Promise((resolve, reject) => {
    Vue.http.get(API_ROOT + child).then((response) => {
      if (typeof response.body == 'string') {
        resolve(JSON.parse(response.body))
      } else {
        resolve(response.body)
      }
    }, reject)
  })
}

function post(child, data) {
  return new Promise((resolve, reject) => {
    Vue.http.post(API_ROOT + child, data, {
        emulateJSON: true
      })
      .then((response) => {
        if (typeof response.body == 'string') {
          resolve(JSON.parse(response.body))
        } else {
          resolve(response.body)
        }
      }, reject)
  })
}

export function fetchRedpackConfig(wxId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/getRedpackConfig?_log=${_log}`).then(response => {
    return response.data
  })
}

export function fetchHasRedpack(wxId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/hasRedpack?wxId=${wxId}&_log=${_log}`).then(response => {
    return response.success
  })
}

export function postRedpack(wxId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/getRedpack?wxId=${wxId}&_log=${_log}`).then(response => {
    return response
  })
}

export function fetchUserInfo(wxId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/getUserinfo?wxId=${wxId}&_log=${_log}`).then(response => {
    return response.data.user
  })
}
