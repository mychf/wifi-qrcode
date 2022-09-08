

// 移动端手势库 文档：https://github.com/any86/any-touch

// import core from '@any-touch/core'
// import pan from '@any-touch/pan' // 划动手势

// export default function (el) {
//     console.log('el', el)
//     const anyTouch = core(el)
//     anyTouch.use(pan)
//     return anyTouch
// }

import AnyTouch from 'any-touch'

export default function (el) {
    const anyTouch = new AnyTouch(el, { preventDefault: false })
    return anyTouch
}
