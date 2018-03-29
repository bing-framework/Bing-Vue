import Vue from 'vue'
import Vuex, { ActionTree, MutationTree, GetterTree } from 'vuex'

Vue.use(Vuex)

import loading from './modules/loading'
import { IState } from './common';

// const getters:GetterTree<IState,any>={
//     loadingGetter:loading.getters
// }

export default new Vuex.Store({
    modules: {
        loading
    }
})