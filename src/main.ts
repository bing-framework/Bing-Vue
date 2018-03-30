import Vue from 'vue'
import VueRouter, { RouteConfig, Route, NavigationGuard } from 'vue-router'
import * as ElementUi from 'element-ui'
import Component from 'vue-class-component'
import { sync } from 'vuex-router-sync'

import App from './pages/App.vue'

import commonComponents from './components'

import routes from './routes'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])

Vue.use(ElementUi)
Vue.use(VueRouter)

commonComponents.forEach(x => {
    console.log('注册组件：' + x.name)
    Vue.component(x.name, x)
})

// 路由实例
const router = new VueRouter({
    // hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。history: 依赖 HTML5 History API 和服务器配置。
    mode: 'history',
    // 前进或后退,滚动到原来的位置
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    },
    routes: [
        ...routes
    ]
})

sync(store, router)

router.beforeEach((to, from, next) => {
    // if (to.path === '/login') {
    //     next()
    // }else if (!store.getters.authToken || store.getters.authToken === '') {
    //     next('/login')
    // } else {
    //     if (to.fullPath === '/') {
    //         next('/main')
    //     }
    //     else {
    //         next()
    //     }
    // }
    next()
})

Vue.config.productionTip = false

const app: Vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

export default app