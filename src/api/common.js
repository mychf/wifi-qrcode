
export class CommonService {
    // 通用图片上传
    static uploadImage(payload) {
        return T.request.post('/hmo/aiproduct/upload/uploadImage', payload, {
            loading: true,
            loadingText: '图片上传中...',
        })
    }
    static getAddressList(params) {
        return T.request.get('/order/api/order-user-address/list', {params: params}, { loading: false })
    }
}
