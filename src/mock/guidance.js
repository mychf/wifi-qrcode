
import Mock from 'mockjs'
const { Random } = Mock

export default {
    // 获取被保人
    sufferInfoList: (config) => {
        console.log('获取被保人mock请求数据', config)

        const resData = {
            code: '0000000',
            data: [],
        }

        console.log('获取被保人mock返回数据:', resData)
        return resData
    },
    // 添加导诊信息mock
    insertDisease: (config) => {
        console.log('导诊信息mock请求数据', config)

        const resData = {
            code: '0000000',
            data: 3116,
        }

        console.log('导诊信息mock返回数据:', resData)
        return resData
    },
}
