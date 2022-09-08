

/* eslint-disable */
import Mock from 'mockjs'
const { Random } = Mock

const totalSize = Random.integer(40, 100)

export default {
    // 订单列表
    orderList: (config) => {
        console.log('订单列表mock请求数据:', config)
        const { pageNo, pageSize, orderStatus } = JSON.parse(config.body)
        const resData = {
            code: '0000000',
            data: new Array(pageSize).fill('').map((item) => ({
                orderId: Random.guid(), // 订单号
                storeName: Random.ctitle(2) + '路店', // 门店名称
                orderStatus:
                    orderStatus && orderStatus !== 'ALL'
                        ? orderStatus
                        : ['WAIT_PAY', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'][
                              Random.integer(0, 3)
                          ], // 订单状态
                details: new Array(Random.integer(1, 3))
                    .fill('')
                    .map((item, i) => ({
                        skuName: [
                            '(处方药)洛赛克奥美拉唑镁肠溶片奥美拉唑镁肠溶片 0.35g*36粒',
                            '妇科养荣胶囊 0.35g*36粒',
                            '阿莫西林 0.3g*12粒',
                        ][i],
                        skuImage:
                            'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1628158130577/60ea0334-21e3-46c9-927b-06bd3c21f85a.jpg',
                        skuCount: Random.integer(1, 3),
                        skuPrice: Random.float(10, 300, 0, 2), // 单价
                        goodsUnit: '盒', // 单位
                    })),
                totalAmount: Random.float(100, 9999, 0, 2), // 商品总金额
                remainTime:
                    [0.1, 0.3, 0.4, 0.5, 1, 2, 8][Random.integer(0, 6)] *
                    60 *
                    1000, // 剩余支付时间 单位: 毫秒
            })),
            totalSize,
        }
        console.log('订单列表mock返回数据:', resData)
        return resData
    },
}
