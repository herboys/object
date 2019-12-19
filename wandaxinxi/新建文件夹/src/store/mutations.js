// 设置商品详细信息
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
    console.log(data, 'vuex')
    state.CrfTemplateChildFrom = data
}
export const TEMPLATELIST = (state, data) => {
    console.log(data, 'vuex')
    state.templatelist = data
}
export const LOOKFROM = (state, data) => {
    console.log(data, 'vuex')
    state.lookfrom = data
}
export const TEMPLATE_USER_ID = (state, data) => {
    console.log(data, 'vuex')
    state.template_user_id = data
}
export const ROUTERTYPE = (state, data) => {
    console.log(data, 'vuex')
    state.routertype = data
}