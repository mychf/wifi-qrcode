

// DOM拖拽指令  ontouchstart ontouchmove ontouchend
export const move = {
    mounted(el) {
        let dragBox = el
        dragBox.ontouchstart = dragBox.onmousedown = (e) => {
            // e.preventDefault()
            let disX = null
            let disY = null
            // 移动端
            if (e.type === 'touchstart') {
                disX = e.changedTouches[0].clientX - dragBox.offsetLeft
                disY = e.changedTouches[0].clientY - dragBox.offsetTop
            } else {
                // pc端
                disX = e.clientX - dragBox.offsetLeft
                disY = e.clientY - dragBox.offsetTop
            }

            dragBox.ontouchmove = dragBox.onmousemove = (e) => {
                // e.preventDefault()
                let innerWidth = window.innerWidth
                let innerHeight = window.innerHeight
                let left = null
                let top = null
                // 移动端
                if (e.type === 'touchmove') {
                    left = e.changedTouches[0].clientX - disX
                    top = e.changedTouches[0].clientY - disY
                } else {
                    // pc端
                    left = e.clientX - disX
                    top = e.clientY - disY
                }

                // console.log(left, top, disX, disY)
                if (left <= 0) {
                    dragBox.style.left = '0px'
                } else if (left >= innerWidth - dragBox.offsetWidth) {
                    dragBox.style.left = innerWidth - dragBox.offsetWidth + 'px'
                } else {
                    dragBox.style.left = left + 'px'
                }
                0

                if (top <= 0) {
                    dragBox.style.top = '0px'
                } else if (top >= innerHeight - dragBox.offsetHeight - 15) {
                    dragBox.style.top =
                        innerHeight - dragBox.offsetHeight - 15 + 'px'
                } else {
                    dragBox.style.top = top + 'px'
                }
            }
            dragBox.ontouchend = dragBox.onmouseup = (e) => {
                // e.preventDefault()
                dragBox.onmousemove = null
                dragBox.onmouseup = null
                dragBox.ontouchmove = null
                dragBox.ontouchend = null
                let innerWidth = window.innerWidth

                dragBox.style.transition = 'all .3s'
                if (
                    dragBox.offsetLeft + dragBox.offsetWidth / 2 >
                    innerWidth / 2
                ) {
                    // 右边
                    dragBox.style.left = innerWidth - dragBox.offsetWidth + 'px'
                } else {
                    // 左边
                    dragBox.style.left = '0'
                }
                setTimeout(() => {
                    dragBox.style.transition = 'unset'
                }, 500)
            }
        }
    },
}
