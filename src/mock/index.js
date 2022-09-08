
import Mock from 'mockjs'
import config from '@/config'
import home from './home'
import order from './order'
import diagnose from './diagnose'
import claim from './claim'
import guidance from './guidance'

// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '100-300',
})

if (config.mock) {
    // 登录
    Mock.mock(/\/loginService\/silentLogin/, 'post', home.login)
    // 首页信息配置数据
    Mock.mock(
        /\/weInsuranceProductService\/queryWeInsuranceProductInfo/,
        'post',
        home.productionInfo
    )
    // 首页信息-获取是否存在问诊重的flag
    Mock.mock(
        /\/weInsuranceProductService\/inquiryRemind/,
        'post',
        home.inquiryRemind
    )

    // 订单列表
    Mock.mock(/\/orderService\/orderList/, 'post', order.orderList)

    // 问诊记录列表
    Mock.mock(
        /\/dataStatistics\/getChannelInquiryInfoList/,
        'post',
        diagnose.diagnoseRecord
    )
    // 问诊记录详情
    Mock.mock(/\/hmoServices\/getInquiryInfo/, 'post', diagnose.diagnoseDetail)

    // 理赔列表
    Mock.mock(/\/orderInfoService\/orderInfoList/, 'post', claim.claimList)

    // 理赔详情
    Mock.mock(
        /\/orderInfoService\/showOrderInfoList/,
        'post',
        claim.claimDetail
    )

    // 导诊-获取被保人
    Mock.mock(
        /\/sufferInfoService\/sufferInfoList/,
        'get',
        guidance.sufferInfoList
    )
    // 导诊-添加导诊信息
    Mock.mock(
        /\/hospitalGuideService\/insertDisease/,
        'post',
        guidance.insertDisease
    )
}
