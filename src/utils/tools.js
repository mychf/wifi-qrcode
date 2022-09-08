

import Compressor from 'compressorjs'
import { Toast as toast } from 'vant'
import config from '@/config'

export default {
    // 获取数据类型 返回结果为 Number、String、Object、Array等
    getRawType(value) {
        return Object.prototype.toString.call(value).slice(8, -1)
    },

    // 银行卡格式化 例如卡号 ‘21213213123131312334’ 变为 ‘2121 3213 1231 3131 2334’
    formatBankCard(cardNo = '') {
        return cardNo
            .replace(/\s/g, '')
            .replace(/\d{4}/g, ($0) => $0 + ' ')
            .replace(/\s$/, '')
    },

    // 手机号码脱敏 '13802082233' 变为 '138****2233'
    filterPhone(phone) {
        if (!phone || typeof phone !== 'string') return phone
        return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
    },

    // 身份证号码脱敏 '110101199012280337' 变为 '110101********0337'
    filterIDCard(cardNo) {
        if (!cardNo || typeof cardNo !== 'string') return cardNo
        return cardNo.replace(/(\d{6})\d*(\d{4})/, '$1********$2')
    },

    // 验证是否是身份证号码
    isIDCard(code) {
        const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
        const arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2] // 校验码
        if (/^\d{17}\d|x$/i.test(code)) {
            let sum = 0
            // 对前17位数字与权值乘积求和
            for (let i = 0; i < code.length - 1; i++) {
                sum += parseInt(code.substr(i, 1), 10) * arrExp[i]
            }
            // 计算模（固定算法）
            const idx = sum % 11
            // 检验第18为是否与校验码相等
            return arrValid[idx].toString() === code.substr(17, 1).toUpperCase()
        }
        return false
    },

    // 浏览器 UA 判断
    getUserAgent() {
        let inBrowser = typeof window !== 'undefined'
        let inWeex =
            typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
        let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
        let UA = inBrowser && window.navigator.userAgent.toLowerCase()

        return {
            isIE: UA && /msie|trident/.test(UA),
            isIE9: UA && UA.indexOf('msie 9.0') > 0,
            isEdge: UA && UA.indexOf('edge/') > 0,
            isAndroid:
                (UA && UA.indexOf('android') > 0) || weexPlatform === 'android',
            isIOS:
                (UA && /iphone|ipad|ipod|ios/.test(UA)) ||
                weexPlatform === 'ios',
            isChrome:
                UA && /chrome\/\d+/.test(UA) && !(UA.indexOf('edge/') > 0),
            isWeChat: UA && UA.match(/MicroMessenger/i) === 'micromessenger',
        }
    },

    // 图片压缩
    compressor(file, successCallback, failCallback) {
        if (file.size <= config.compressor.maxSizeToCompress) {
            console.warn(`文件未压缩，文件大小：${file.size} b`)
            successCallback(file)
            return
        }
        console.warn(`文件压缩前大小：${file.size} b`)

        new Compressor(file, {
            mineType: 'image/png', //  输出图片的格式，
            convertSize: 5000000, // 超过5M的 PNG 文件将转换为 JPEG。要禁用此功能，只需将该值设置为Infinity
            maxWidth: config.compressor.maxWidth,
            maxHeight: config.compressor.maxHeight,
            quality: config.compressor.quality, // 压缩率
            success(result) {
                console.warn(`文件压缩后大小：${result.size} b`)
                // 压缩完之后如果还是大于5M就不让上传
                if (result.size >= config.compressor.resultMaxSize)
                    return toast.fail('图片过大,上传异常，请重新拍照上传!')
                if (result.size === 0)
                    return toast.fail('图片上传异常，请重新拍照上传!')
                if (
                    Object.prototype.toString.call(result) === '[object Blob]'
                ) {
                    console.warn('result is Blob:', result)
                    const files = new File([result], result.name, {
                        type: result.type,
                    })
                    console.warn('result is File:', files)
                    successCallback(files)
                } else {
                    console.warn('result is not Blob:', result)
                    successCallback(result)
                }
            },
            error(err) {
                console.err('文件压缩失败', err)
                failCallback(err)
            },
        })
    },

    /**
     * 仿照微信中的消息时间显示逻辑，将时间戳（单位：毫秒）转换为友好的显示格式.
     *
     * 1）7天之内的日期显示逻辑是：今天、昨天(-1d)、前天(-2d)、星期？（只显示总计7天之内的星期数，即<=-4d）；
     * 2）7天之外（即>7天）的逻辑：直接显示完整日期时间。
     *
     * @param {[long]} timestamp 时间戳（单位：毫秒），形如：1550789954260
     * @param {boolean} mustIncludeTime true表示输出的格式里一定会包含“时间:分钟”
     * ，否则不包含（参考微信，不包含时分的情况，用于首页“消息”中显示时）
     *
     * @return {string} 输出格式形如：“刚刚”、“10:30”、“昨天 12:04”、“前天 20:51”、“星期二”、“2019/2/21 12:09”等形式
     * @author 即时通讯网([url=http://www.52im.net]http://www.52im.net[/url])
     * @since 1.1
     */
    getTimeStringAutoShort(timestamp, mustIncludeTime) {
        // 当前时间
        let currentDate = new Date()
        // 目标判断时间
        let srcDate = new Date(parseInt(timestamp))

        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth() + 1
        let currentDateD = currentDate.getDate()

        let srcYear = srcDate.getFullYear()
        let srcMonth = srcDate.getMonth() + 1
        let srcDateD = srcDate.getDate()

        let ret = ''

        // 要额外显示的时间分钟
        let timeExtraStr = mustIncludeTime
            ? ' ' + T.dayjs(srcDate).format('HH:mm')
            : ''

        // 当年
        if (currentYear === srcYear) {
            let currentTimestamp = currentDate.getTime()
            let srcTimestamp = timestamp
            // 相差时间（单位：毫秒）
            let deltaTime = currentTimestamp - srcTimestamp

            // 当天（月份和日期一致才是）
            if (currentMonth === srcMonth && currentDateD === srcDateD) {
                // 时间相差60秒以内
                if (deltaTime < 60 * 1000) ret = '刚刚'
                // 否则当天其它时间段的，直接显示“时:分”的形式
                else ret = T.dayjs(srcDate).format('HH:mm')
            }
            // 当年 && 当天之外的时间（即昨天及以前的时间）
            else {
                // 昨天（以“现在”的时候为基准-1天）
                let yesterdayDate = new Date()
                yesterdayDate.setDate(yesterdayDate.getDate() - 1)

                // 前天（以“现在”的时候为基准-2天）
                let beforeYesterdayDate = new Date()
                beforeYesterdayDate.setDate(beforeYesterdayDate.getDate() - 2)

                // 用目标日期的“月”和“天”跟上方计算出来的“昨天”进行比较，是最为准确的（如果用时间戳差值
                // 的形式，是不准确的，比如：现在时刻是2019年02月22日1:00、而srcDate是2019年02月21日23:00，
                // 这两者间只相差2小时，直接用“deltaTime/(3600 * 1000)” > 24小时来判断是否昨天，就完全是扯蛋的逻辑了）
                if (
                    srcMonth === yesterdayDate.getMonth() + 1 &&
                    srcDateD === yesterdayDate.getDate()
                )
                    ret = '昨天' + timeExtraStr
                // -1d
                // “前天”判断逻辑同上
                else if (
                    srcMonth === beforeYesterdayDate.getMonth() + 1 &&
                    srcDateD === beforeYesterdayDate.getDate()
                )
                    ret = '前天' + timeExtraStr
                // -2d
                else {
                    // 跟当前时间相差的小时数
                    let deltaHour = deltaTime / (3600 * 1000)

                    // 如果小于或等 7*24小时就显示星期几
                    if (deltaHour <= 7 * 24) {
                        let weekday = new Array(7)
                        weekday[0] = '星期日'
                        weekday[1] = '星期一'
                        weekday[2] = '星期二'
                        weekday[3] = '星期三'
                        weekday[4] = '星期四'
                        weekday[5] = '星期五'
                        weekday[6] = '星期六'

                        // 取出当前是星期几
                        let weedayDesc = weekday[srcDate.getDay()]
                        ret = weedayDesc + timeExtraStr
                    }
                    // 否则直接显示完整日期时间
                    else
                        ret =
                            T.dayjs(srcDate).format('YYYY年MM月DD') +
                            timeExtraStr
                }
            }
        }
        // 往年
        else {
            ret = T.dayjs(srcDate).format('YYYY年MM月DD') + timeExtraStr
        }

        return ret
    },
}
