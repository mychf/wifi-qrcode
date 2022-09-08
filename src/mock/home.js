
import Mock from 'mockjs'
const { Random } = Mock

export default {
    login: (config) => {
        console.log('登录mock请求数据:', config)
        const { insurePolicyNo, channelSource } = JSON.parse(config.body)
        const resData = {
            code: '0000000',
            data: {
                accessToken: Random.guid(),
                businessId: 'businessId-123',
                name: '张三',
                phone: '18602082254',
                platformBusinessId: 'platformBusinessId-123',
                userId: 'userId-123',
                platformUserId: 'platformUserId-123',
                channelSource: channelSource || 'weibao',
                signFlag: 'Y',
                productCode: 'productCode-123',
                insurePolicyNo: insurePolicyNo || 'insurePolicyNo-123',
            },
        }

        console.log('登录mock返回数据:', resData)
        return resData
    },
    productionInfo: (config) => {
        console.log('获取首页配置mock请求数据:', config)

        const resData = {
            code: '0000000',
            message: '成功',
            data: {
                webaoPolicyRightRespList: new Array(4)
                    .fill('')
                    .map((item, i) => ({
                        idCard: Random.id(), // 被保人身份证号
                        suffererId: i, // 被保人id
                        suffererName: Random.cname(), // 被保人名称
                        sex: `${Random.integer(0, 1)}`, // 被保人性别
                        remainNum: Random.integer(0, 10), // 剩余理赔次数
                        remainMonthNum: Random.integer(0, 2), // 月度剩余理赔次数
                        singleAmount: 500, // 单次理赔限额
                        policyRemainAmount: Random.float(100, 1000, 2, 1), // 保单剩余理赔额度
                        claimedNum: Random.integer(0, 6), // 理赔次数
                        claimedAmount: Random.integer(200, 1000), // 累计理赔额度
                    })),
                webaoProductFunctionRespList: new Array(2)
                    .fill('')
                    .map((item, i) => ({
                        functionCode: Random.string(7, 10), // 功能编号
                        functionName: ['在线问诊', '理赔记录', '哈哈'][i], // 功能名称
                        functionDesc: [
                            '在线问诊开药',
                            '查看理赔记录',
                            '😄😄😄',
                        ][i], // 功能描述
                        functionLogoUrl:
                            'https://ai-test-1300948849.cos.ap-beijing.myqcloud.com/162970438673185057179.png', // 功能logo url
                        launchLink:
                            i === 0
                                ? '/guidance/chooseInsured'
                                : '/claim/claimRecord', // 投放链接
                        remark: '', // 备注
                        textColor: ['#4E1818', '#00A263'][i], // 文字颜色
                    })),
                webaoProductInfoRespList: new Array(2)
                    .fill('')
                    .map((item, i) => ({
                        productCode: '', // 产品编号
                        productType: '', // 产品类型
                        logoUrl: '', // 产品logourl
                        bannerUrl: '', // 产品首页banner url
                        introduceCode: '', // 产品介绍编码
                        introduceName: ['产品亮点', '理赔流程'][i], // 产品介绍名称
                        introduceDesc: '', // 产品介绍描述
                        introduceUrl:
                            i === 0
                                ? 'https://dxf-test.oss-cn-beijing.aliyuncs.com/temp/111.png'
                                : 'https://dxf-test.oss-cn-beijing.aliyuncs.com/temp/222.png', // 产品介绍url
                    })),
            },
        }
        console.log('获取首页配置mock返回数据:', resData)

        return resData
    },
    // 首页获取是否存在问诊中的flag
    inquiryRemind: (config) => {
        console.log('是否存在问诊中的mock请求数据:', config)
        const isExist = [true, false][Random.integer(0, 1)]
        const resData = {
            code: '0000000',
            data: {
                suffererId: Random.guid(),
                suffererName: Random.cname(),
                inquiryId: Random.guid(),
                inquiryStatus: 2,
                isExist,
            },
        }

        console.log('是否存在问诊中的mock返回数据:', resData)
        return resData
    },
}
