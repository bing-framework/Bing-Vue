import { GetterTree, Getter } from 'vuex'
import { State } from '../index'

const loading:Getter<State,any>=(state:State)=>{
    return state.loading.isShowFullLoading;
}

const getterTree: GetterTree<State, any> = {
    loading
}

export default getterTree