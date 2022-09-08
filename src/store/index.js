
import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'
import { storage } from '@/utils'

const storeModules = import.meta.globEager('./modules/*.js')
let modules = {}

Object.keys(storeModules).forEach((pathKey) => {
    const key = pathKey.replace(/(\.\/modules\/|\.js)/g, '')
    modules[key] = storeModules[pathKey].default
})

export default createStore({
    modules,
    plugins: [
        persistedState({
            storage: {
                getItem: (key) => storage.get(key),
                setItem: (key, value) => storage.set(key, value),
                removeItem: (key) => storage.remove(key),
            },
            // 需要缓存 vuex 模块中的数据，刷新不失效
            reducer(val) {
                return {
                    userInfo: val.userInfo,
                    common: val.common,
                    inquiry: val.inquiry,
                }
            },
        }),
    ],
})
