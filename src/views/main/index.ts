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
    account: any

    protected created() {
        console.log('执行 created')
        this.menuList = menuList.menuList
        this.account = '超级管理员'
        this.currentMenus = this.menuList[this.currentParentIndex.toString()].children
        console.log(this.currentMenus)
    }

    mounted() {

        console.log('执行 mounted')
    }

    public parentMenusClick(index: Number, children: any) {
        this.currentParentIndex = index
        this.currentMenus = children
    }
}