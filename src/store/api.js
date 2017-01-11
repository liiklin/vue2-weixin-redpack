import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'underscore'
import {
  API_ROOT
} from './config'

Vue.use(Vuex)

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

export function fetchArticleList() {
  return fetch(`WxBus/getArticleList`).then(response => {
    return response.data
  })
}

export function fetchArticle(id) {
  return fetch(`WxBus/getArticle?id=${id}`).then(response => {
    return response.data
  })
}
