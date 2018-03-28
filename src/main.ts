import Vue from 'vue'
import * as ElementUi from 'element-ui'
import Component from 'vue-class-component'

import App from './layout/App.vue'

// Component.registerHooks([
//     'beforeRouteEnter',
//     'beforeRouteLeave',
//     'beforeRouteUpdate'
// ])

Vue.use(ElementUi)

Vue.config.productionTip = false

const app: Vue = new Vue({
    el: '#app',
    render: h => h(App)
})

export default app