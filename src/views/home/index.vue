<template>
    <div class="container">
        <div class="form">
            <el-form ref="formRef" label-position="right" :model="ruleForm" :rules="rules">
                <p class="proposal">有疑问？有建议？欢迎到github上提Issues,查看<a href="https://github.com/mychf/wifi-qrcode.git" class="source-code">源码</a>。</p>
                <el-form-item label="WiFi名称：" prop="wifiName">
                    <el-input v-model="ruleForm.wifiName" placeholder="mychf"/>
                </el-form-item>
                <el-form-item label="WiFi密码：" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="Mars2022"/>
                </el-form-item>
                <el-form-item class="button-list">
                    <el-button v-if="!state.isMobile" plain class="print" @click="submitForm(formRef,1)">打印</el-button>
                    <el-button plain @click="submitForm(formRef,2)">下载</el-button>
                </el-form-item>
            </el-form>
            <div class="detail" v-html="detail"></div>
        </div>
        <div class="preview">
            <h2 class="title">预览</h2>
            <div id="print">
                <svg height="100%" width="100%" viewBox="0 0 480 621" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="480" height="621">
                        <rect width="480" height="621" fill="white"></rect>
                    </mask>

                    <g mask="url(#mask0)">
                        <rect width="480" height="621" fill="white"></rect>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M197.924 53.9119C187.377 43.3627 169.547 43.3627 159 53.9119L162.262 57.1738C171.044 48.3916 185.879 48.3916 194.662 57.1738L197.924 53.9119ZM191.543 60.8671C188.113 57.4345 183.467 55.5452 178.461 55.5452C173.455 55.5452 168.809 57.4345 165.379 60.8671L168.64 64.129C171.201 61.5684 174.687 60.1566 178.461 60.1566C182.235 60.1589 185.72 61.5684 188.281 64.129L191.543 60.8671ZM183.074 69.3863C183.074 71.9344 181.009 74 178.461 74C175.913 74 173.847 71.9344 173.847 69.3863C173.847 66.8382 175.913 64.7726 178.461 64.7726C181.009 64.7726 183.074 66.8382 183.074 69.3863Z"
                              fill="black"></path>
                        <path
                            d="M436.375 307.806L449.353 311.314C451.02 311.765 452.684 310.809 453.135 309.142L459.057 287.234C459.507 285.567 458.551 283.903 456.884 283.452L443.906 279.944L416.997 272.671L404.018 269.163C402.351 268.712 400.687 269.668 400.237 271.335L394.315 293.243C393.864 294.91 394.82 296.574 396.487 297.025L409.466 300.533"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M438.467 300.067L411.557 292.793L406.955 309.82L433.865 317.094L438.467 300.067Z"
                              stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                        <path d="M445.354 274.586L418.445 267.313L416.964 272.79L443.874 280.063L445.354 274.586Z"
                              stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                        <path d="M449.64 289.927L451.426 290.41" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M448.643 293.618L450.429 294.101" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                            d="M381.347 237.554C381.625 237.462 381.776 237.163 381.685 236.885C381.593 236.607 381.294 236.456 381.016 236.547C380.738 236.639 380.587 236.938 380.679 237.216C380.77 237.494 381.069 237.645 381.347 237.554Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M389.803 238.117L374.71 243.083C372.949 243.662 371.054 242.705 370.475 240.944L360.048 209.248C359.469 207.487 360.426 205.593 362.186 205.013L377.28 200.048C379.041 199.469 380.935 200.426 381.515 202.186L391.941 233.883C392.521 235.644 391.564 237.538 389.803 238.117Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M368.405 206.685L373.101 205.14" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M369.652 237.312L390.615 230.416" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                            d="M79.635 316.644C79.956 316.727 80.2829 316.533 80.3653 316.212C80.4476 315.891 80.2541 315.564 79.9331 315.482C79.6121 315.4 79.2852 315.593 79.2029 315.914C79.1205 316.235 79.314 316.562 79.635 316.644Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M94.5496 324.909L62.6809 316.736C60.6467 316.214 59.4223 314.145 59.944 312.111L71.5948 266.681C72.1165 264.647 74.1855 263.422 76.2197 263.944L108.088 272.117C110.123 272.639 111.347 274.708 110.825 276.742L99.1744 322.172C98.6528 324.206 96.5837 325.43 94.5496 324.909Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M88.2283 271.463L93.5559 272.829" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M61.7723 306.592L100.228 316.454" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M34.6845 192.666L33.4106 196.516" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M40.5065 190.939L36.6465 201.475" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                            d="M96.5384 201.125L39.6654 228.081L23.5031 193.981C22.4751 191.812 23.3624 189.326 25.5313 188.298L74.8132 164.94C76.9821 163.912 79.4685 164.799 80.4965 166.968L96.6589 201.067L96.5384 201.125Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M99.5841 206.616L42.1087 233.858C38.7349 235.457 34.6311 234.894 30.9899 232.193L105.334 196.955C105.063 201.364 102.958 205.017 99.5841 206.616Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M402.15 121.574L398.169 123.649" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M408.054 124.403L397.107 130.109" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                            d="M441.422 178.307L383.135 159.96C380.864 159.246 379.653 156.923 380.368 154.652L392.838 115.037C393.552 112.766 395.875 111.556 398.145 112.271L456.433 130.617C458.704 131.332 459.914 133.654 459.199 135.925L446.73 175.541C445.929 177.646 443.567 178.982 441.422 178.307Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M413.906 163.961C414.325 164.093 414.77 163.86 414.902 163.442C415.033 163.024 414.801 162.579 414.383 162.447C413.965 162.316 413.519 162.548 413.388 162.966C413.256 163.384 413.488 163.829 413.906 163.961Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M417.634 181.635L400.602 176.274L405.552 167.155L418.925 171.365L417.634 181.635Z"
                              stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                        <path d="M396.691 175.043L421.545 182.866" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M382.671 147.335L448.907 168.183" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                            d="M119.424 118.805C116.824 114.248 113.009 108.025 109.311 103.157C105.857 98.622 99.1141 98.2236 95.1025 102.437L93.7343 103.855C92.9951 104.693 92.0506 105.292 91.031 105.705L86.1185 107.694C85.099 108.107 84.0043 108.334 82.8898 108.246L81.0138 108.143C75.2932 107.87 70.6349 112.885 71.309 118.546C72.0405 124.615 73.6682 131.832 74.9336 136.822C75.5763 139.474 79.1253 139.979 80.5639 137.67C82.6115 134.468 84.8046 130.559 85.8304 127.23C86.3068 125.743 87.472 124.624 89.03 124.208C90.9964 123.736 92.9804 123.04 94.9269 122.252C96.966 121.426 98.8374 120.453 100.616 119.517C102.024 118.731 103.64 118.724 105.017 119.461C108.069 121.138 112.457 122.382 116.064 123.295C118.611 123.99 120.716 121.195 119.424 118.805Z"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M78.8152 119.498L84.0985 117.359" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M80.4522 115.814L82.5917 121.098" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M102.822 109.777L103.656 109.439" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M97.9091 111.766L98.7433 111.428" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M101.646 112.734L101.946 113.476" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M99.6564 107.822L99.9567 108.563" stroke="#DDDDDD" stroke-width="1.652"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                            d="M88.5836 106.588C88.5836 106.588 88.2121 102.207 84.2105 100.051C78.9242 97.1212 83.2048 90.6407 83.2048 90.6407"
                            stroke="#DDDDDD" stroke-width="1.652" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </g>
                    <foreignObject x="0" y="135" width="480" height="260">
                        <div class="wifi-qrcode" xmlns="http://www.w3.org/1999/xhtml">
                            <img id="qrcode-image" alt="QR Code" width="160" height="160" :src="state.qrCodeImg"/></div>
                    </foreignObject>
                    <foreignObject x="211" y="36" width="270" height="50">
                        <div class="wifi-title" xmlns="http://www.w3.org/1999/xhtml">WiFi</div>
                    </foreignObject>
                    <foreignObject x="0" y="424" width="480" height="20">
                        <p class="input-label" xmlns="http://www.w3.org/1999/xhtml">名称</p>
                    </foreignObject>
                    <foreignObject x="0" y="497" width="480" height="20">
                        <p class="input-label" xmlns="http://www.w3.org/1999/xhtml">密码</p>
                    </foreignObject>
                    <foreignObject x="0" y="442" width="480" height="50">
                        <div class="input-wrapper" xmlns="http://www.w3.org/1999/xhtml">
                            <p class="default-network" xmlns="http://www.w3.org/1999/xhtml">
                                {{ ruleForm.wifiName || 'mychf' }}</p>
                        </div>
                    </foreignObject>
                    <foreignObject x="0" y="515" width="480" height="50">
                        <div class="input-wrapper" xmlns="http://www.w3.org/1999/xhtml">
                            <p class="default-network" xmlns="http://www.w3.org/1999/xhtml">
                                {{ ruleForm.password || 'Mars2022' }}</p>
                        </div>
                    </foreignObject>
                    <foreignObject x="0" y="325" width="480" height="85">
                        <div class="input-wrapper" xmlns="http://www.w3.org/1999/xhtml">
                            <p class="subtext" xmlns="http://www.w3.org/1999/xhtml">
                                要连接WiFi，请用手机或平板自带的相机扫描二维码。<br>其他设备请用下方的WiFi名称和密码连接。
                            </p>
                        </div>
                    </foreignObject>
                    <foreignObject x="0" y="580" width="480" height="50">
                        <div class="input-wrapper" xmlns="http://www.w3.org/1999/xhtml">
                            <p id="password" class="footer" xmlns="http://www.w3.org/1999/xhtml">
                                创建你自己的WiFi卡片：<b>http://public-static.yndxz.com/index.html</b>
                            </p>
                        </div>
                    </foreignObject>
                </svg>
            </div>
        </div>
        <div class="footers" v-html="detail"></div>
    </div>
</template>

<script setup>
import QRCode from 'qrcode'
import PrintJs from 'print-js'
import html2canvas from 'html2canvas'
import {jsPDF} from 'jspdf'
import {ref, reactive, onMounted, getCurrentInstance, computed, watch, nextTick} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {images, svgs} from '@/assets'
import {useTouch} from '@/hooks'
import config from '@/config'

const router = useRouter()
const route = useRoute()
const store = useStore()
const {proxy} = getCurrentInstance()
const formRef = ref(null)
const detail = `<h3>这是什么?</h3>
            <p> 这个网站可以让你方便地创建一张A4大小的卡片，包含你的WiFi信息和可供手机扫描连接WiFi的二维码。你只需要在👆上面的表格输入WiFi信息，就可以 🖨打印或者下载PDF了。</p>
            <h5>好吧，我要这个二维码干嘛？</h5>
            <p>问得好！ 🤓 这个二维码可以让你用手机或者平板自带的相机，一步到位连接WiFi，省去了寻找WiFi，输入密码等等繁杂的手续。</p>
            <h5>用这个安全吗？</h5>
            <p>非常安全！你的WiFi信息会被安全地传输，只用于创建一张卡片，绝不会被储存或者分享给任何人。</p>`
const state = reactive({
    qrCodeImg: '',
    patientInfo: computed(() => store.getters['userInfo/GUTTER_PATIENT_INFO']),
    isMobile: computed(() => {
        return T.tools.getUserAgent().isAndroid || T.tools.getUserAgent().isIOS || T.tools.getUserAgent().isWeChat
    }),
})
const ruleForm = reactive({
    wifiName: '',
    password: '',
})
const rules = reactive({
    wifiName: [
        {required: true, message: '请输入WiFi名称', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '请输入WiFi密码', trigger: 'blur'},
        {min: 8, message: '密码最小长度为8位', trigger: 'blur'},
    ]
})
watch(() => [ruleForm.wifiName, ruleForm.password], (newValList) => {
    console.log(newValList)
    if (newValList.some(item => item.length > 25)) {
        const nodeList = document.querySelectorAll('.default-network')
        nodeList.forEach(item => {
            if (parseInt(item.style.fontSize) > 12) {
                item.style.fontSize = `${(parseInt(item.style.fontSize) - 1)}px`
            }
        })
    } else {
        const nodeList = document.querySelectorAll('.default-network')
        nodeList.forEach(item => {
            if (parseInt(item.style.fontSize) < 32) {
                item.style.fontSize = `${(parseInt(item.style.fontSize) + 1)}px`
            }
        })
    }
    creatQrCode()
})
onMounted(() => {
    setStyle()
    creatQrCode()
})
const setStyle = () => {
    let cssList = ''
    const textNodes = document.querySelectorAll('svg .wifi-qrcode, svg .wifi-title,svg .input-wrapper,svg .subtext,svg .input-label,svg .default-network')
    // 根据需要修改要重新赋值的属性
    const styles = ['margin', 'text-align', 'font-style', 'font-weight', 'font-size', 'line-height', 'color', 'display', 'align-items', 'justify-content', 'width', 'padding']
    textNodes.forEach((ele) => {
        const textStyle = window.getComputedStyle(ele)
        styles.forEach(item => {
            const value = textStyle.getPropertyValue(item)
            console.log(ele)
            cssList += `${item}:${value};`
        })
        ele.setAttribute('style', cssList)
        cssList = ''
    })
}
const getDataUrl = async () => {
    let topImage = document.getElementById('print')
    const imgHeight = topImage.clientHeight
    const imgWidth = topImage.clientWidth
    const canvas = await html2canvas(topImage, {
        width: imgWidth, // 宽设置为div标签的宽
        height: imgHeight,
        scale: 2
    })
    return canvas.toDataURL('image/jpg')
}
const creatQrCode = async () => {
    const url = await QRCode.toDataURL(`WIFI:T:WPA;S:${ruleForm.wifiName};P:${ruleForm.password};`, {
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        margin: 1,
    }).catch(err => {
        console.error(err)
    })
    state.qrCodeImg = url
}
const submitForm = async (formEl, type) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (type === 1) {
                handlePrint()
            } else if (type === 2) {
                downLoad()
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
const handlePrint = async () => {
    const imgBase64 = await getDataUrl()
    PrintJs({
        printable: imgBase64, // 'printFrom', // 标签元素id
        type: 'image',
        targetStyles: ['*'],
        style: '@page {margin:0 10mm};', // 可选-打印时去掉眉页眉尾
    })
}
const downLoad = async () => {
    let topImage = document.getElementById('print')
    const imgHeight = topImage.clientHeight
    const imgWidth = topImage.clientWidth
    //  a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgBase64 = await getDataUrl()
    const pdf = new jsPDF('', 'pt', 'a4')
    // state.qrCodeImg = imgBase64
    if(state.isMobile) {
        pdf.addImage(imgBase64, 'JPEG', 0, 0, imgWidth * 2, imgHeight * 2)
    } else {
        pdf.addImage(imgBase64, 'JPEG', 0, 0, imgWidth, imgHeight)
    }
    pdf.save('wifiQrcode.pdf')
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    min-height: 100vh;

    .form, .preview {
        flex: 1;
    }

    .preview {
        background-color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            font-style: normal;
            font-weight: 500;
            font-size: 42px;
            line-height: 48px;
            color: white;
            margin-top: 120px;
            margin-bottom: 50px;
        }

        svg {
            width: 576px;

            .wifi-qrcode {
                text-align: center;
            }

            .wifi-title {
                font-style: normal;
                font-weight: 400;
                font-size: 42px;
                line-height: 48px;
                color: #000000;
            }

            .input-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .subtext {
                font-size: 14px;
                text-align: center;
                color: #000000;
                width: 400px;
                margin: 14px 0;
            }

            .input-label {
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: #000000;
                margin: 0;
            }

            .default-network {
                font-style: normal;
                font-weight: normal;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                font-size: 32px;
                line-height: 32px;
                color: #000000;
                margin: 0;
                width: 100%;
            }
        }
    }

    /deep/ .el-form {
        padding: 0 15%;
        margin: 50px auto 0 auto;
        .proposal {
            margin-bottom: 50px;
            text-align: center;
            .source-code {
                color: blue;
            }
        }
        .el-form-item__label {
            height: 48px;
            line-height: 48px;
            font-weight: 400;
        }

        .el-input__inner {
            //width: 360px;
            height: 48px;
            line-height: 48px;
        }

        .button-list {
            margin-top: 50px;
            margin-left: 93px;

            .el-form-item__content {
                display: flex;
                justify-content: center;

                .el-button {
                    width: 160px;
                    height: 48px;

                    &.print {
                        margin-right: 30px;
                    }
                }
            }
        }
    }

    /deep/.detail,/deep/.footers {
        padding: 8% 10% 5% 10%;

        h3 {
            font-style: normal;
            font-weight: 400;
            font-size: 42px;
            line-height: 48px;
            margin-bottom: 28px;
            text-align: center;
        }

        p {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            margin-top: 8px;
        }

        h5 {
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: #000000;
            margin-top: 28px;
        }
    }
    .footers {
        display:none;
    }
}

@media screen and (min-width: 320px) and (max-width: 1200px) {
    .container {
        flex-direction: column;

        .preview svg {
            width: 300px;
        }

        /deep/ .el-form {
            width: auto;

            .el-form-item {
                flex-direction: column;
            }

            .el-form-item__label {
                justify-content: center;
            }

            .button-list {
                margin-left: auto;

                .el-form-item__content {
                    justify-content: center;
                }
            }
        }
        .footers {
            display:block;
        }
        .detail {
            display:none;
        }
    }
}
</style>
