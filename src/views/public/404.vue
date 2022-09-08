
<template>
    <van-empty description="404" image="search" class="centerY">
        <van-button round type="danger" class="bottom-button" @click="goHome">
            返回首页
        </van-button>
    </van-empty>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()

const a = {
    orderNo: 'asdf1234qwe',
    ecifId: 'asdf1234qwe',
    serviceProductId: '10000116360983100000051900010036',
    policyNo: 'asdf1234qwe',
    cardNo: '350781196403071908', // 身份证号
    custName: '小熊3',
}

const state = reactive({
    timestamp: Date.now(),
    str: 'KE8vdj9yaWyHHMfp',
    baseInfo: {
        orderNo: a.orderNo, // 工单号
        ecifId: a.ecifId, // 客户id
        serviceProductId: a.serviceProductId,
        startTime: '2021-11-21 18:56:09',
        endTime: '2022-11-21 18:56:09',
        orgCode: '31000000',
    },
    voucherNo: '',
    suffererInfo: {
        voucherNo: '', // 对应
        orderNo: a.orderNo, // 对应
        sex: '1',
        cardType: 1,
        policyNo: T.cryptoJS.encrypt(a.policyNo), // 保单号
        ecifId: a.ecifId, // 对应
        custName: T.cryptoJS.encrypt(a.custName), // 名字
        serviceProductId: a.serviceProductId, // 对应
        cardNo: T.cryptoJS.encrypt(a.cardNo), // 身份证号
    },
})

const goHome = () => {
    router.replace('/home')
}
onMounted(() => {
    getUrl()
})

const getUrl = async () => {
    const { timestamp, str, baseInfo } = state

    // 1.权益获取sign
    const {
        data: { sign },
    } = await T.request.post(
        '/hmo/aiproduct/continentProductInfoService/getSign',
        {
            jsonStr: JSON.stringify(state.baseInfo),
            str,
            timestamp,
        },
        {
            loading: false,
        }
    )

    // 2.权益-生成券码 voucherNo
    const {
        data: { voucherNo },
    } = await axios.post(
        '/hmo/aiproduct/continentService/applyRights',
        baseInfo,
        {
            headers: {
                sign,
                timestamp,
            },
            loading: false,
        }
    )
    state.voucherNo = voucherNo
    state.suffererInfo.voucherNo = voucherNo

    // 3.前端链接-获取sign
    const {
        data: { sign: sign2 },
    } = await T.request.post(
        '/hmo/aiproduct/continentProductInfoService/getSign',
        {
            jsonStr: JSON.stringify(state.suffererInfo),
            str,
            timestamp,
        },
        {
            loading: false,
        }
    )

    // 4.大地获取高济前端地址
    const {
        data: { redirectUrl },
    } = await axios.post(
        '/hmo/aiproduct/continentService/useRights',
        state.suffererInfo,
        {
            headers: {
                sign: sign2,
                timestamp,
            },
            loading: false,
        }
    )

    console.log('redirectUrl', redirectUrl)
}
</script>
