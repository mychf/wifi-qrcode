
const svgsModules = import.meta.globEager('./**/*.svg')
const imagessModules = import.meta.globEager('./**/*.{png,jpg,jpeg}')

const svgs = {}
const images = {}

Object.keys(svgsModules).forEach((pathKey) => {
    const key = pathKey.replace(/(\.\/svg\/|\.svg)/g, '')
    svgs[key] = svgsModules[pathKey].default
})

Object.keys(imagessModules).forEach((pathKey) => {
    const key = pathKey
        .replace(/(\.\/images\/|\.png|\.jpg|\.jpeg)/g, '')
        .replace('/', '_')
    images[key] = imagessModules[pathKey].default
})

export { svgs, images }
