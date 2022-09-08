
// vite Glob 导入:  https://www.vitejs.net/guide/features.html#glob-%E5%AF%BC%E5%85%A5
const globalComponentsModules = import.meta.globEager('./global/*/*.vue')

const globalComponents = {}
Object.keys(globalComponentsModules).forEach((pathKey) => {
    const key = pathKey.replace(/(\.\/global\/|\/index\.vue)/g, '')
    globalComponents[key] = globalComponentsModules[pathKey].default
})

export { globalComponents }
