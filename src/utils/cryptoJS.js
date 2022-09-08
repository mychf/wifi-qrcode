
import cryptoJS from 'crypto-js'
import config from '@/config'
import store from '@/store'

class CryptoJS {
    key = cryptoJS.enc.Utf8.parse(config.AESKey.slice(0, 16)) // 加密的私钥
    mode = cryptoJS.mode.ECB // 加密方式
    padding = cryptoJS.pad.Pkcs7 // 加密偏移量

    // 加密函數
    encrypt(word) {
        const encryptedObj = cryptoJS.AES.encrypt(
            cryptoJS.enc.Utf8.parse(
                word instanceof Object ? JSON.stringify(word) : word
            ),
            this.key,
            {
                mode: this.mode,
                padding: this.padding,
            }
        )
        return encryptedObj.toString()
    }

    // 解密函數
    decrypt(word) {
        const decrypt = cryptoJS.AES.decrypt(word, this.key, {
            mode: this.mode,
            padding: this.padding,
        })
        const decString = cryptoJS.enc.Utf8.stringify(decrypt).toString()
        return decString
    }
}
export default new CryptoJS()
