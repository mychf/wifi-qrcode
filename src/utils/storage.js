

import config from '@/config'

class Storage {
    /** web存储命名空间 */
    #_storageNameSpace = config.storageNameSpace

    #_getFullKey(key) {
        return this.#_storageNameSpace
            ? `${this.#_storageNameSpace}_${key}`
            : key
    }

    // 增、改storage指定key
    set(key, value, type = 'localStorage') {
        const storage = window[type]
        try {
            if (!storage || !key) {
                throw new Error()
            }
            storage.setItem(
                this.#_getFullKey(key),
                JSON.stringify(value || null)
            )
            return true
        } catch (e) {
            return false
        }
    }

    get(key, type = 'localStorage') {
        const storage = window[type]
        try {
            if (!storage || !key) {
                throw new Error()
            }
            return JSON.parse(storage.getItem(this.#_getFullKey(key)) || 'null')
        } catch (e) {
            return null
        }
    }

    remove(key, type = 'localStorage') {
        const storage = window[type]
        try {
            if (!storage || !key) {
                throw new Error()
            }
            storage.removeItem(this.#_getFullKey(key))
            return true
        } catch (e) {
            return false
        }
    }

    removeAll(type = 'localStorage', ignoreKeys) {
        const storage = window[type]
        /* eslint-disable */
        try {
            if (!storage) {
                throw new Error()
            }
            Array.isArray(ignoreKeys)
                ? (ignoreKeys = ignoreKeys.map((key) => this.#_getFullKey(key)))
                : (ignoreKeys = [])
            Object.keys(storage).forEach((key) => {
                if (
                    !this.#_storageNameSpace ||
                    (key.startsWith(this.#_storageNameSpace) &&
                        !ignoreKeys.includes(key))
                ) {
                    storage.removeItem(key)
                }
            })
            return true
        } catch (e) {
            return false
        }
        /* eslint-disable */
    }
}

export default new Storage()
