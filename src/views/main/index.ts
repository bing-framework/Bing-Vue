import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'

import * as menuList from '@/mock_data/menu'

@Component
export class Main extends Vue {
    sysName: string = '后台管理系统'
    menuList: any = []
    currentMenus: any = []
    currentParentIndex: Number = 0

    protected created() {
        console.log('执行 created')
        this.menuList = menuList.menuList
        console.log(this.menuList)
    }

    mounted(){
        this.menuList = menuList.menuList
        console.log('执行 mounted')
    }
}