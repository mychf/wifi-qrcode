
export default {
    env: 'production',
    port: 8002, // devServer端口
    host: 'https://xxxx.xxxx.cn', // 前端域名地址
    timeout: 20 * 1000, // 请求超时时间， 单位ms
    cosURL: 'https://xxxx.cos.ap-beijing.myqcloud.com', // cos文件存储地址
    storageNameSpace: 'hmo', // 本地存储的命名空间
    AESKey: '9oWwzrZELSHPlfWzLvNIbbsbpbqIIaLW', // 对称加密的key-私钥
    mock: false, // 是否开启mock拦截
    compressor: {
        maxWidth: 1284, // 压缩图片最大的宽度
        maxHeight: 2778, // 压缩图片最大的高度
        quality: 0.6, // 压缩率
        maxSizeToCompress: 3 * 1024 * 1024, // 超过3M开始压缩
        resultMaxSize: 5 * 1024 * 1024, // 压缩之后如果超过5M则阻止上传
    },
}
