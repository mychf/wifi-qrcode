import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // JSX 语法支持
import legacy from '@vitejs/plugin-legacy' // 为打包后的文件提供传统浏览器兼容性支持
import { resolve } from 'path'
import windiCSS from 'vite-plugin-windicss' // vite-plugin-windicss 文档: https://windicss.org/integrations/vite.html
import colors from 'colors'
// import rollupCommonjs from 'rollup-plugin-commonjs' // 将非ES6语法的包转为ES6可用
// import rollupExternalGlobals from 'rollup-plugin-external-globals'
import styleImport from 'vite-plugin-style-import'

import development from './src/config/development'
import stage from './src/config/stage'
import production from './src/config/production'

const envConf = {
    development,
    stage,
    production,
}

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd()).VITE_ENV
    console.log('当前环境：', colors.rainbow(env))
    console.log('当前环境配置：', envConf[env])
    return defineConfig({
        plugins: [
            vue(),
            vueJsx(),
            windiCSS(),
            legacy({
                polyfills: ['es.promise.finally', 'es/map', 'es/set'],
                modernPolyfills: ['es.promise.finally'],
                targets: ['defaults', 'not IE 11'],
            }),
            styleImport({
                libs: [
                    {
                        libraryName: 'vant',
                        esModule: true,
                        // resolveStyle: (name) => `vant/es/${name}/style/less`,
                    },
                ],
            }),
        ],
        // 强制预构建插件包
        optimizeDeps: {
            include: ['vue', 'vue-router', 'axios', 'lodash', 'dayjs', 'vant'],
        },
        // 打包配置
        build: {
            baseUrl: '/',
            manifest: true,
            target: 'es2015', // 设置最终构建的浏览器兼容目标，默认modules，
            outDir: 'dist', // 指定输出路径
            cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
            assetsDir: 'assets', // 指定生成静态资源的存放路径
            minify: 'terser', // 混淆器，terser构建后文件体积更小
            sourcemap: env !== 'production',
            terserOptions: {
                compress: {
                    drop_console: env === 'production', // 去除console
                    drop_debugger: true, // 去除debugger
                    pure_funcs: [
                        'console.log',
                        'console.marn',
                        'console.error',
                    ],
                },
            },
            // rollup配置项 https://github.com/rollup/rollup/issues/3188
            // rollupOptions: {
            //     input: 'src/main.js',
            //     // 告诉 rollup 碰到下面模块时候不要去打包, 而作为外部依赖， 使用CDN的方式引入
            //     external: ['vue', 'vue-router', 'vuex'],
            //     plugins: [
            //         rollupCommonjs(),
            //         rollupExternalGlobals({
            //             vue: 'Vue',
            //             'vue-router': 'VueRouter',
            //             vuex: 'Vuex',
            //         }),
            //     ],
            // },
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    // 覆盖vant默认的样式变量
                    modifyVars: {
                        hack: `true; @import "src/assets/styles/vant.theme.less";`,
                    },
                },
            },
        },

        resolve: {
            alias: [
                { find: /^~/, replacement: '' },
                { find: '@', replacement: resolve(__dirname, 'src') },
            ],
        },
        server: {
            port: envConf[env].port, // 设置服务启动端口号
            open: true, // 设置服务启动时是否自动打开浏览器
            cors: true, // 允许跨域
            host: '0.0.0.0',
            hmr: {
                overlay: false,
            },
            // 本地开发环境设置代理
            proxy: {
                // 北京uaa的接口
                '/uaa': {
                    target: envConf[env].uaaHttpRequestURL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace('/uaa', ''),
                },
                // 保险接口转发
                '/hmo': {
                    target: envConf[env].hmoHttpRequestURL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace('/hmo', ''),
                },
                // 互医接口转发
                '/his': {
                    target: envConf[env].hisRequestUrl,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path,
                },
            },
        },
    })
}
