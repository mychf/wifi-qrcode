
import {
    Button,
    Toast,
    Tabbar,
    TabbarItem,
    Image as VanImage,
    Icon,
    CellGroup,
    Cell,
    List,
    PullRefresh,
    Empty,
    Tab,
    Tabs,
    ImagePreview,
    PasswordInput,
    NumberKeyboard,
    Search,
    Uploader,
    Form,
    Field,
    DatetimePicker,
    Popup,
    Checkbox,
    Sticky,
    Badge,
    Collapse,
    CollapseItem,
    Dialog,
    RadioGroup,
    Radio,
    Divider,
    Popover,
    Lazyload,
    Loading,
    Tag,
    Col,
    Row,
    NoticeBar
} from 'vant'
import { globalComponents } from '@/components'
import { move } from '@/directives'

export default {
    install: (app) => {
        app.config.globalProperties.$toast = Toast
        app.config.globalProperties.$dialog = Dialog
        app.config.globalProperties.$imagePreview = ImagePreview

        app.use(Button)
            .use(Tabbar)
            .use(TabbarItem)
            .use(VanImage)
            .use(Icon)
            .use(CellGroup)
            .use(Cell)
            .use(List)
            .use(PullRefresh)
            .use(Empty)
            .use(Tab)
            .use(Tabs)
            .use(ImagePreview)
            .use(PasswordInput)
            .use(NumberKeyboard)
            .use(Search)
            .use(Uploader)
            .use(Form)
            .use(Field)
            .use(DatetimePicker)
            .use(Popup)
            .use(Checkbox)
            .use(Sticky)
            .use(Badge)
            .use(Collapse)
            .use(CollapseItem)
            .use(Dialog)
            .use(RadioGroup)
            .use(Radio)
            .use(Divider)
            .use(Popover)
            .use(Lazyload, { lazyComponent: true })
            .use(Loading)
            .use(Tag)
            .use(Col)
            .use(Row)
            .use(NoticeBar)
        // 自定义指令
        app.directive('move', move)
        // 注册自定义全局组件
        Object.keys(globalComponents).forEach((key) => {
            app.component(key, globalComponents[key])
        })
    },
}
