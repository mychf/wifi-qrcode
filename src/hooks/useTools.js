

import { Toast as toast } from 'vant'
import numeral, { fn } from 'numeral' // numeral文档：http://numeraljs.com/
import clipboard from 'vue-clipboard3' // 点击复制到粘贴板
import store from '@/store'

export default function () {
    // 千分位数字格式化， 例如： 100000 格式化 100,000.00
    const numeralHooks = (val, formatRule = '0,0.00') => {
        if (typeof val !== 'number' && typeof val !== 'string') return val
        if (formatRule === '000,000') {
            const pointBackNum = `${val}`.split('.')[1]
            return numeral(val).format(
                pointBackNum
                    ? `0,0.${pointBackNum.replace(/[0-9]/g, '0')}`
                    : '0,0'
            )
        }
        return numeral(val).format(formatRule)
    }

    // 文件上传的一些公共方法
    const uploadHooks = (options) => {
        return {
            // 上传前置勾子
            asyncBeforeRead(file) {
                return new Promise((resolve, reject) => {
                    if (!options.fileType.includes(file.type)) {
                        const fileTypeStr = options.fileType
                            .map((item) => item.split('/')[1])
                            .join('|')
                        toast(`请上传 ${fileTypeStr} 格式图片`)
                        reject()
                    } else {
                        // 文件压缩
                        T.tools.compressor(
                            file,
                            (compressFile) => {
                                resolve(compressFile)
                            },
                            () => {
                                reject()
                            }
                        )
                    }
                })
            },

            // 文件上传
            async afterRead(file, detail) {
                options.preSuccessCallback(detail)
                const formData = new FormData()
                formData.append('file', file.file)
                formData.append('location', 'COS')
                try {
                    const { data } = await store.dispatch(
                        'common/UPLOAD_IMAGE',
                        formData
                    )
                    options.afterSuccessCallback(data, detail)
                } catch (error) {
                    options.failCallback(detail)
                }
            },
        }
    }

    return {
        numeralHooks,
        copyHooks: clipboard(),
        uploadHooks,
    }
}
