import Index from '@/views/main/index.vue'

export default [
    {
        path: '/main',
        name: '工作台',
        component: Index,
        meta: {
            title: '管理系统',
            auth: true
        }
    }
]