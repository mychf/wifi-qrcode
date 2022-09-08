
import Axios from 'axios'
import { Toast as toast } from 'vant'
import config from '@/config'
import store from '@/store'

// import router from '@/router'

// axios取消重复请求： https://mp.weixin.qq.com/s/5ypx39bWK6JO6xPyeBfgMw

const getErrorCode2text = (response) => {
    const code = response.status
    let message = 'Request Error'
    /* eslint-disable indent */
    switch (code) {
        case 400:
            message = 'Request Error'
            break
        case 401:
            message = 'Unauthorized, please login'
            break
        case 403:
            message = '拒绝访问'
            break
        case 404:
            message = '访问资源不存在'
            break
        case 408:
            message = '请求超时'
            break
        case 500:
            message = '位置错误'
            break
        case 501:
            message = '承载服务未实现'
            break
        case 502:
            message = '网关错误'
            break
        case 503:
            message = '服务暂不可用'
            break
        case 504:
            message = '网关超时'
            break
        case 505:
            message = '暂不支持的 HTTP 版本'
            break
        default:
            message = '位置错误'
    }
    /* eslint-enable indent */
    return message
}

const request = Axios.create()

Object.assign(request.defaults, {
    baseURL: '', // 本地用proxy代理，线上使用nginx代理
    timeout: config.timeout,
    loading: true,
    withCredentials: true,
    crossDomain: true,
    'Cache-Control': 'no-cache',
    headers: {
        'Content-Type': 'application/json',
    },
})

const pendingRequest = new Map()

// 当请求方式、请求 URL 地址和请求参数都一样时，我们就可以认为请求是一样的, 根据当前请求的请求方式、请求 URL 地址和请求参数来生成一个唯一的 key
function generateReqKey(config) {
    const { method, url, params, data } = config
    return [method, url, T.qs.stringify(params), T.qs.stringify(data)].join('&')
}

// addPendingRequest 用于把当前请求信息添加到pendingRequest对象中
function addPendingRequest(config) {
    const requestKey = generateReqKey(config)
    config.cancelToken =
        config.cancelToken ||
        new Axios.CancelToken((cancel) => {
            if (!pendingRequest.has(requestKey)) {
                pendingRequest.set(requestKey, cancel)
            }
        })
}

// removePendingRequest 检查是否存在重复请求，若存在则取消已发的请求
function removePendingRequest(config) {
    const requestKey = generateReqKey(config)
    if (pendingRequest.has(requestKey)) {
        const cancel = pendingRequest.get(requestKey)
        cancel(requestKey)
        pendingRequest.delete(requestKey)
    }
}

request.interceptors.request.use(
    (config) => {
        if (config.loading) {
            toast.loading({
                message: config.loadingText || '加载中...',
                duration: 0,
                forbidClick: true,
            })
        }

        removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
        addPendingRequest(config) // 把当前请求添加到pendingRequest对象中

        const { token_type, access_token } = store.state.userInfo.userInfo
        if (
            access_token &&
            !config.url.includes('/uaa/api/loginFromThirdSys')
        ) {
            config.headers.authorization = `${token_type} ${access_token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    /** 请求有响应 */
    (response) => {
        toast.clear()
        removePendingRequest(response.config) // 从pendingRequest对象中移除请求
        if (response.status === 200) {
            // 直接调用北京uaa的接口返回拦截
            if (
                response.config.url.startsWith('/uaa/') ||
                response.config.url.startsWith('/his/') ||
                response.config.url.startsWith('/hmo/his-query/')
            ) {
                if (response.config.url.includes('tovalidatecode')) {
                    if (response.data.success) {
                        return Promise.resolve(response.data)
                    } else {
                        toast(response.data.resultContant || '系统内部异常')
                        return Promise.reject(new Error(message))
                    }
                } else {
                    return Promise.resolve(response.data)
                }
            }

            // hmo保险的接口返回拦截
            const { code, message } = response.data
            if (code === '0000000') {
                return Promise.resolve(response.data)
            } else {
                toast(message)
                return Promise.reject(new Error(message))
            }
        } else {
            const __text = getErrorCode2text(response)
            toast(__text)
            return Promise.reject(new Error(__text))
        }
    },
    /** 请求无响应 */
    (error) => {
        toast.clear()
        removePendingRequest(error.config || {}) // 从pendingRequest对象中移除请求
        if (Axios.isCancel(error)) {
            console.log('已取消的重复请求：' + error.message)
        } else {
            // 添加异常处理
        }
        let __emsg = error.message || ''

        if (error.response) {
            __emsg =
                error.response.data.message || error.response.data.errorMessage
                    ? error.response.data.message ||
                      error.response.data.errorMessage
                    : error.response.data.error
        }
        // timeout
        if (__emsg.indexOf('timeout') >= 0) {
            __emsg = '请求超时'
        }
        if (__emsg.indexOf('Network Error') >= 0) {
            __emsg = '网络连接错误'
        }
        toast(__emsg)
        // if (error?.response?.status === 401) {
        //     if (router.currentRoute.value.path !== '/entry/login') {
        //         Message.info('登录凭证已过期，请重新登录')
        //         router.push('/entry/login')
        //     }
        //     return Promise.reject(new Error('401'))
        // }
        return Promise.reject(new Error(__emsg))
    }
)

export default request
