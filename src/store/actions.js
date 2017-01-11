import * as types from './mutation-types'
import * as api from './api'

export default {
  getArticleList({
    commit
  }) {
    return api.fetchArticleList()
      .then(body => Promise.resolve(body))
      .then(articleList => {
        commit(types.SET_ARTICLE_LIST, {
          articleList
        })
      })
  },
  getArticle({
    commit
  }, {
    id
  }) {
    return api.fetchArticle(id)
      .then(body => Promise.resolve(body))
      .then(article => {
        commit(types.SET_ARTICLE, {
          article
        })
      })
  },
}
