import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'
import store from '../store'

@Component({
    computed: mapGetters({
        isShowFullLoading:'isShowFullLoading'
    }),
    methods: {
        showLoading(show: boolean) {
            store.commit('showFullLoading', true)
        }
    }
})
export class App extends Vue {
    list: string[] = []

    protected created() {
        // console.log(this.$store.getters['isShowFullLoading'])
        // this.$store.dispatch('showFullLoading', true)
        // console.log(this.$store.getters['isShowFullLoading'])
        // for (let i = 0; i < 100; i++) {
        //     this.list.push('双击666:' + i)
        // }

    }
}