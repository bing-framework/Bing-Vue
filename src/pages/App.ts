import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'

@Component({
    computed:mapGetters(['isShowFullLoading'])
})
export class App extends Vue {
    list: string[] = []

    protected created() {
        for (let i = 0; i < 100; i++) {
            this.list.push('双击666:' + i)
        }

    }
}