

/* eslint-disable */
import Mock from 'mockjs'
const { Random } = Mock

const totalSize = Random.integer(40, 100)

export default {
    // 问诊列表
    diagnoseRecord: (config) => {
        console.log('问诊记录mock请求数据:', config)
        const { pageNo, pageSize, productCode } = JSON.parse(config.body)

        const resData = {
            code: '0000000',
            data: new Array(pageSize).fill('').map((item, i) => ({
                patientName: Random.cname(), // 患者姓名
                clinicalTime: Random.date('yyyy-MM-dd HH:mm:ss'), // 问诊日期
                inquiryStatusStr: '', // 问诊状态描述
                doctorName: Random.cname(), // 医生姓名
                laboratoryName: ['耳鼻咽喉科', '内科', '外科'][
                    Random.integer(0, 2)
                ], // 医生科室
                professionalTitle: ['主任医师', '副主任医师', '实习医生'][
                    Random.integer(0, 2)
                ], // 医生职位
                doctorId: `doctorId-${(pageNo - 1) * pageSize + i}`, // 医生编号
                patientId: '123', // 患者编号
                bizType: 1, // 业务类型
                recordId: '4531863', // 问诊记录id
                inquiryId: (pageNo - 1) * pageSize + i, // 预购主键id
                headUrl: Random.dataImage('60x60', '头像'), // 医生头像
            })),
            totalSize,
        }
        console.log('问诊记录mock返回数据:', resData)
        return resData
    },
    // 问诊详情
    diagnoseDetail: (config) => {
        console.log('问诊详情mock请求数据:', config)

        const resData = {
            code: '0000000',
            data: {
                reviewPrescriptionType: 0,
                prescriptionType: '饮片处方',
                createDate: '2021-07-05',
                inquiryType: 1,
                inquiryMode: '图文问诊',
                doctorNo: 'GJYS2021070111282',
                auditUserNo: null,
                patientName: '天天',
                doctorRealName: '吴信康',
                gender: 1,
                age: 23,
                ageType: '岁',
                laboratoryName: '神经内科',
                laboratoryId: 13,
                headUrl:
                    'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/scrm/1625130856881/1625130856817',
                diseaseName: '头位顺产',
                clinicalTime: '2021-07-05',
                clinicalTimeOrg: '2021-07-05 10:01:14',
                doctorAdvice: '无',
                patientDrugDTOList: null,
                patientDrugMap: null,
                chineseDrugDTOList: [
                    {
                        recordId: 4531863,
                        paChDrugId: 2136,
                        totalDosage: 2,
                        dailyDosage: 2,
                        frequency: '1日1次(qd)',
                        usage: '口服',
                        price: 0,
                        requirement: '水煎400ml；分早晚两次空腹温服',
                        chineseDrugPiecesDTOList: [
                            {
                                paChDrugId: 2136,
                                drugId: 122446,
                                drugName: '龙齿',
                                value: 1,
                                unit: '克',
                                comment: '捣碎',
                                price: 0,
                                specification: '净制',
                                manufacturer: null,
                                goodsNo: '1051073',
                            },
                        ],
                        prescriptionId: 'ONZY816254504469195093',
                        goodsNo: null,
                        prescription: '816254504469195093',
                        diseaseInfo: {
                            id: 14932,
                            recordId: 4531863,
                            prescriptionNo: 816254504469195093,
                            symptom: '头疼',
                            presentIllness: null,
                            previousHistory: '无',
                            allergyHistory: '无',
                            doctorAdvice: '无',
                            extend: null,
                            gmtCreate: '2021-07-05T10:01:15.000+0800',
                            gmtUpdate: '2021-07-05T10:01:15.000+0800',
                            diseasesType: 0,
                            diseasesTypeName: '普通',
                            supplement: null,
                            chiefComplaint: null,
                        },
                        diagnosis: [
                            {
                                id: null,
                                recordId: 4531863,
                                diseaseId: null,
                                diseaseName: '头位顺产(O80.0)',
                                status: 0,
                                prescriptionNo: 816254504469195093,
                                diseaseCode: 'O80.0',
                                createDate: null,
                                modifyDate: null,
                                extend: null,
                            },
                        ],
                        diagnosisStr: '头位顺产(O80.0)',
                        expiredFlag: null,
                        orderId: null,
                        totalCharge: 2,
                        frequencyCode: '41',
                    },
                ],
                patientId: 14440,
                hospitalName: null,
                storeName: '海南自动测试门店',
                storeId: 187558199999,
                doctorId: 194171723410000,
                recordId: 4531863,
                hospitalId: null,
                userId: null,
                photoUrl: '',
                auditing: 1,
                auditStatus: 0,
                auditDate: '2021-07-05 10:01',
                auditUserId: null,
                auditUserName: '',
                auditStatusValue: '未审核',
                auditImgStamp: '',
                rejectReason: null,
                businessId: 99999,
                businessName: 'aa积分商城连锁',
                outDoctorImgStamp:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABQCAMAAABrs8qCAAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALI7fhAAAAAXRSTlMAQObYZgAAAYRJREFUeNrtmNuOgzAMRDPd/P8vz17YloTcEHZJVM15qgoIT2yP3YYghBBCCCGEEEIIIYQQQghxCqwRAlcRgkYsOBOiixI4ZpVtgf1Y/+6CTQ08JHD70BEyVhLCTCGjE09OuXrg+9vNpRXdepbXLjNYi8pbyNgCUFFEr3fFcIddpPegiJ1wcC44yODAjNpHj//KckhPfHNrjIPDb0Y297U0C7yaoQwht+TaLbvnEdasxHc2yDO8/piAy3D3cS32txMOpdJcGtGuAOHylpWM01XmyLF6jjpqMwSH8uJUIchCegaDyiRsFOCeWUyxX3R75OT4Zl5aFiWwPMrSZdsrSmFM++SYv8a3qj8T0sodUg1m+/1yWQxRPxAUuz7LiwRCMhCv8vCaI7j01KtCaS2Oh0dCzsVRS8hPNsjXWWCekDS4ZhxsfY30cQaTFFj7nN2Jx/wlPFzatkUid2HeLaTavKwKYWeB8flf67prlYMYxY/BO39KLAA+RokQQgghhBBCCCHE8nwDhHR6Tpj/6BYAAAAASUVORK5CYII=',
                outPharmacistImgStamp: null,
                outDoctorSignStatus: 2,
                outPharmacistSignStatus: null,
                outPharmacistRejectSignReason: null,
                outDoctorRejectSignReason: null,
                allergyHistory: '',
                patientDescription: null,
                previousHistory: '',
                expiredDesc: '当天有效',
                expiredFlag: '已过期',
                consultationTypeCode: 0,
                consultationTypeName: '开方拿药',
                inquiryPeriod: '01:49',
                symptom: '头疼',
                height: null,
                weight: null,
                videoUrl: null,
                doctorVideo: null,
                patientVideo: null,
                allergicHistoryDetail: '',
                diseaseHistoryDetail: '',
                orderId: null,
                patientPhotoAndDescriptionInfo: null,
                inquiryDrugDTOS: {
                    businessId: null,
                    recordId: null,
                    userId: null,
                    patientId: null,
                    doctorId: null,
                    storeId: null,
                    inquiryId: null,
                    status: null,
                    drugList: [
                        {
                            id: 37360,
                            drugName: '龙齿',
                            barCode: '无',
                            specification: '净制',
                            manufacturer: '以批次为准',
                            picUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/goods_pic_url/丹参粉组合.jpg',
                            drugType: 1,
                            goodsNo: '1051073',
                            totalDosageUnit: '克',
                            amount: 1,
                        },
                    ],
                    inquiryBizType: null,
                },
                hospitalPlatform: null,
                fyysUserId: null,
                fyysUserName: null,
                hlwyyysAuditUserId: null,
                hlwyyysAuditUserName: '',
                hlwyyysAuditStatus: 0,
                imgBase: null,
                hlwyyysAuditImgStamp: '',
                hlwyyysRejectReason: null,
                tpysPharmacistName: null,
                fyysPharmacistImgStamp: null,
                tpysPharmacistImgStamp: null,
                tpfyApproveType: null,
                outpatientId: null,
                price: null,
                priceType: null,
                hideStore: null,
                inquiryStatusCurrent: null,
            },
        }
        console.log('问诊详情mock返回数据:', resData)
        return resData
    },
}
