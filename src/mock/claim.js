
/* eslint-disable */
import Mock from 'mockjs'
const { Random } = Mock

const totalSize = Random.integer(40, 100)

export default {
    // 理赔列表
    claimList: (config) => {
        console.log('理赔列表mock请求数据:', config)
        const { pageNo, pageSize, status } = JSON.parse(config.body)
        const resData = {
            code: '0000000',
            data: new Array(pageSize).fill('').map((item) => ({
                claimType: [1, 2][Random.integer(0, 1)], // 理赔方式
                status: ['7', '8'][
                    status ? (status === '7' ? 0 : 1) : Random.integer(0, 1)
                ], // 状态
                storeName: Random.ctitle(2) + '路店', // 门店名称
                suffererName: Random.cname(), // 被保人名称
                payTime: Random.time('yyyy-MM-dd HH:mm:ss'), //时间
                amount: Random.float(100, 9999, 0, 2), // 理赔金额
                payCodeRefId: Random.guid(), // 支付id
            })),
            totalSize,
        }
        console.log('理赔列表mock返回数据:', resData)
        return resData
    },
    // 理赔详情
    claimDetail: (config) => {
        console.log('理赔详情mock请求数据:', config)
        const resData = {
            code: '0000000',
            data: {
                payCodeRefId: '577023190908211200',
                storeAddress: '玉渊潭(东门)',
                createdAt: null,
                orderStatus: 'FT_SUCCESS',
                status: null,
                boxNum: '1',
                amount: '1200.00',
                claimType: '2',
                suffererName: null,
                updatedAt: null,
                suffererId: null,
                productStatus: '0',
                productEffectiveDate: null,
                productExpireDate: null,
                logoUrl:
                    'https://dxf-public.oss-cn-beijing.aliyuncs.com/591623422810_.pic.jpg',
                orderId: '100860000000000006',
                payAmount: '1200.00',
                orderTime: null,
                province: '北京市',
                city: '市辖区',
                ftPayAmount: '1200.00',
                prescription: '22222222222222222',
                recordId: '0',
                inquiryChannelCode: null,
                isEnc: null,
                hmoChannel: null,
                invoiceInfoList: null,
                notes: null,
                productName: '5千额度',
            },
        }
        console.log('理赔详情mock返回数据:', resData)
        return resData
    },
}
