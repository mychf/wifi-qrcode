import store from '@/store'
import {createRouter, createWebHashHistory} from 'vue-router'

const routeModules = import.meta.globEager('./modules/*.js')

const modules = []
Object.keys(routeModules).forEach((pathKey) => {
    modules.push(...routeModules[pathKey].default)
})

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'), // 在vite中导入.vue文件时后缀不能省，配置extensions也不行，官方已经不允许不使用vue文件后缀导入了
        meta: {
            title: 'wifi-qrCode',
            requireAuth: true,
        },
    },
    ...modules,
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/public/404.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                top: 0,
            }
        }
    },
})

router.beforeEach(async (to, from, next) => {
    if (to.query.info) {
        store.commit('userInfo/SET_PATIENT_INFO', to.query.info)
        const {productCode} = store.getters['userInfo/GUTTER_PATIENT_INFO']
        if (productCode) {
            const {data} = await store.dispatch('common/QUERY_BACK_COLOR', {
                productCode,
            })
            store.commit('common/SET_THEME', data)
        }
    }
    const theme = store.state.common.theme
    if (Object.keys(theme).length) {
        store.commit('common/SET_THEME', theme)
    }
    next()
})

router.afterEach((to, from) => {
    // 在dass跳转回来判断，如果不是dass返回回来，则晴空recordId
    // console.log(from)
    // if (to.path === '/inquiry/chat' && from.path !== '/') {
    //     store.commit('userInfo/SET_RECORD_ID', '')
    // }

    if (
        from.path === '/inquiry/prescriptionDetail' ||
        (to.path === '/inquiry/chat' && from.path === '/') ||
        (to.path === '/inquiry/prescriptionDetail' && from.path === '/')
    ) {
        // 不清空
    } else {
        // 清空
        store.commit('userInfo/SET_RECORD_ID', '')
    }

    const {title} = to.meta
    if (title) {
        document.title = title
    }
})

export default router
