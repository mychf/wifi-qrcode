
// tailwind文档： https://windicss.org/guide/configuration.html
// windicss文档： https://cn.windicss.org/integrations/vite.html
import { defineConfig } from 'windicss/helpers'
// import colors from 'windicss/colors' // Tailwind 调色板工具。
import typography from 'windicss/plugin/typography' // Tailwind 官方提供的排版插件]
import plugin from 'windicss/plugin'

export default defineConfig({
    attributify: {
        prefix: 'w:',
    },
    preflight: true, // 样式重置
    extract: {
        include: ['./src/**/*.{vue,html,jsx,tsx}'],
        exclude: ['node_modules', '.git'],
    },
    darkMode: 'class',
    plugins: [
        typography(),
        require('@windicss/animations')({
            settings: {
                animatedSpeed: 300,
                heartBeatSpeed: 1000,
                hingeSpeed: 1000,
                bounceInSpeed: 750,
                bounceOutSpeed: 750,
                animationDelaySpeed: 100,
            },
        }),
        plugin(({ addComponents }) => {
            const components = {
                // 定位垂直居中
                '.centerY': {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                },
                // 文字两行溢出...
                '.ellipsis-2': {
                    'word-break': 'break-all',
                    'text-overflow': 'ellipsis',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': 2,
                },
                '.after-bg': {
                    position: 'relative',
                    '&:after': {
                        content: '',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        position: 'absolute',
                        background: 'currentColor',
                        opactiy: 0.1,
                    },
                },
            }
            addComponents(components)
        }),
    ],
    // 主题配置
    theme: {
        extend: {
            colors: {
                'inquiry-color-0': 'var(--inquiry-color-0)',
                'inquiry-color-1': 'var(--inquiry-color-1)',
                'login-color-0': 'var(--login-color-0)',
                'login-color-1': 'var(--login-color-1)',
                'pay-color-0': 'var(--pay-color-0)',
                'pay-color-1': 'var(--pay-color-1)',

                'primary-color': 'var(--primary-color)', // '#FE6058', // 主题色
                'success-color': '#00A263', // 成功色
                'warning-color': '#FF6F1E', // 警告色
                'error-color': '#FE6058', // 错误色
                'invalid-color': '#999', // 失效色
                'tips-color': '#6C3721', // tips提示文字颜色
                'link-color': '#0E7EFF', // 蓝色链接色
                'txt-default-color': '#333', // 主字体颜色
                'txt-next-color': '#666', // 次要字体颜色
                'txt-subs-color': '#999', // 辅助，说明字体颜色
                'bg-color': '#f5f5f5', // 页面背景色
                'section-color': '#fff', // 内容背景色
                'divider-color': '#e5e5e5', // 分割线
                'border-color': '#cacaca', // 边框线
            },
            backgroundImage: () => ({
                'my-card': `url('https://dxf-public.oss-cn-beijing.aliyuncs.com/%E7%A6%8F%E5%88%A9bg%402x.png')`,
            }),
        },
    },
})
