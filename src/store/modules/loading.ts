import { Commit } from 'vuex'

import * as types from '../mutationTypes'
import { IState } from '../common'

interface State extends IState {
    isShowFullLoading: boolean,
    localLoading: string
}

const state: State = {
    isShowFullLoading: false,
    localLoading: ''
}

const getters = {
    /**
     * 显示全局加载动画
     */
    isShowFullLoading: (state: State) => state.isShowFullLoading,
    /**
     * 显示局部加载动画
     */
    localLoading: (state: State) => state.localLoading,
}

const actions = {
    showFullLoading(context: { commit: Commit }, isShowFullLoading: boolean) {
        console.log('输出内容全屏加载')
        context.commit(types.SHOW_FULL_LOADING, isShowFullLoading)
    },
    showLocalLoading(context: { commit: Commit }, localLoading: string) {
        context.commit(types.SHOW_LOCAL_LOADING, localLoading)
    }
}

const mutations = {
    [types.SHOW_FULL_LOADING](state: State, isShowFullLoading: boolean) {
        state.isShowFullLoading = isShowFullLoading
    },
    [types.SHOW_LOCAL_LOADING](state: State, localLoading: string) {
        state.localLoading = localLoading
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}