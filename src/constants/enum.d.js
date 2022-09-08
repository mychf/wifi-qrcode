

export default Object.freeze({
    // 理赔状态
    CLAIM_STATUS: {
        0: '审核中',
        1: '发票待上传',
        2: '审核失败',
        3: '审核成功',
        4: '已支付',
        5: '支付失败',
        6: '支付中',
        7: '已完结',
        8: '已取消',
        99: '资料待补充',
    },
    CLAIM_TYPE: {
        1: '自助理赔',
        2: '直赔',
        3: '代理赔',
    },

    // 订单状态
    ORDER_STATUE: {
        ALL: '全部',
        WAIT_PAY: '待付款',
        IN_PROGRESS: '进行中',
        COMPLETED: '已完成',
        CANCELED: '已取消',
    },

    // 性别
    SEX: {
        0: '女',
        1: '男',
    },
})
