// 设置商品详细信息
import da from "element-ui/src/locale/lang/da";

export const UID = (state, data) => {
    state.uid = data
}
export const CRFTEMPLATEEDITEMS = (state, data) => {
    state.CrfTemplateEditItems = data
}
export const CRFTEMPLATELEFTCHILDRENITEM = (state, data) => {
    state.CrfTemplateLeftChildrenItem = data
}
export const TEMPALTETYPES = (state, data) => {
    state.tempaltetypes = data
}
export const CTFTEMPLATECHILDFROM = (state, data) => {
    state.CrfTemplateChildFrom = data
}
export const TEMPLATELIST = (state, data) => {
    state.templatelist = data
}
export const LOOKFROM = (state, data) => {
    state.lookfrom = data
}
export const TEMPLATE_USER_ID = (state, data) => {
    state.template_user_id = data
}
export const ROUTERTYPE = (state, data) => {
    state.routertype = data
}
export const ISPREVIEW = (state, data) => {
    state.ispreview = data
}
export const TOKEN = (state, data) => {
    console.log(data,'TOKEN')
    state.token = data
}