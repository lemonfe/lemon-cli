import Vuex from 'vuex'

import defaultState from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
    // 在plugin中可以利用watch,subscribe来做一些具体的操作，这些方法只会被执行一次
    // plugins: [
    //   (store) => {
    //     console.log('store plugin')
    //   }
    // ],
    // modules: {
    //   a: {
    //     // 默认mutations，actions是在全局中可以使用的
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textAdd (state, getters, rootState) {
    //         return rootState.count + 'sss'
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) {
    //         commit('updateCount', {num: 1234}, {root: true})
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       test ({commit}) {
    //         commit('a/updateText', 'test', {root: true})
    //       }
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state.js',
      './mutations/mutations.js',
      './getters/getters.js',
      './actions/actions.js'
    ], () => {
      const newState = require('./state/state.js').default
      const newMutations = require('./mutations/mutations.js').default
      const newGetters = require('./getters/getters.js').default
      const newActions = require('./actions/actions.js').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
