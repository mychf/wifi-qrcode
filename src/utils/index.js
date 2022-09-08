
import storage from './storage'
import _ from 'lodash'
import qs from 'qs'
import request from './request'
import dayjs from 'dayjs' // 文档: https://dayjs.fenxianglu.cn/category/
import cookies from 'js-cookie' // 文档: https://github.com/js-cookie/js-cookie
import tools from './tools'
import duration from 'dayjs/plugin/duration' // dayjs插件
import cryptoJS from './cryptoJS' // 加解密方法
import base64 from 'base-64' // base64加密
import { v4 as uuidv4 } from 'uuid'
dayjs.extend(duration)

window.T = {
    storage,
    request,
    _,
    qs,
    dayjs,
    cookies,
    tools,
    cryptoJS,
    base64,
    uuidv4,
}

export { storage, request, _, qs, dayjs, cookies, tools }
