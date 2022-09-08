
import { CommonService } from '@/api'

const state = {
    keepAliveList: [],
    forgetPwdTimer: 0, // 忘记密码发送短信倒计时
    loginTimeDuration: 0, // 登录页面发送短信倒计时
    addressConfirmList: [],
    theme: {}, // 主题色
}

const getters = {}

const mutations = {
    SET_KEEP_ALIVE_LIST(state, payload) {
        state.keepAliveList = payload
    },
    SET_TIMER(state, { name, value }) {
        state[name] = value
    },
    SET_ADDRESS_CONFIRM_LIST(state, payload) {
        state.addressConfirmList.push(payload)
    },
    SET_THEME(state, payload) {
        state.theme = payload
        document.documentElement.style.setProperty(
            '--inquiry-color-0',
            payload.inquiryColor[0] || '#FE6058'
        )
        document.documentElement.style.setProperty(
            '--inquiry-color-1',
            payload.inquiryColor[1] || '#FE6058'
        )

        document.documentElement.style.setProperty(
            '--login-color-0',
            payload.loginColor[0] || '#FE6058'
        )
        document.documentElement.style.setProperty(
            '--login-color-1',
            payload.loginColor[1] || '#FE6058'
        )

        document.documentElement.style.setProperty(
            '--pay-color-0',
            payload.payColor[0] || '#FE6058'
        )
        document.documentElement.style.setProperty(
            '--pay-color-1',
            payload.payColor[1] || '#FE6058'
        )
    },
}

const actions = {
    // 通用图片上传
    async UPLOAD_IMAGE(ctx, payload) {
        return await CommonService.uploadImage(payload)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
