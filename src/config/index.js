
import development from './development'
import stage from './stage'
import production from './production'

export default {
    development,
    stage,
    production,
}[import.meta.env.MODE]
