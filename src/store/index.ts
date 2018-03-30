import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'

Vue.use(Vuex)

import getters from './getters'

import loading, { State as LoadingState } from './modules/loading'


// const getters:GetterTree<IState,any>={
//     loadingGetter:loading.getters
// }

export default new Vuex.Store({
    getters: getters,
    modules: {
        loading
    }
})

export interface State {
    loading: LoadingState
}

export interface ActionContextBasic {
    commit: Commit,
    dispath: Dispatch
}