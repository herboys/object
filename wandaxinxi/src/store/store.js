import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as mutations from './mutations.js'
import * as getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token:'',
        uid: '1111',

        // 点击我的Crf获取item
        CrfTemplateEditItems: [],
        templatelist:[], /// 我的模板总数据
        // 模板左侧列表的item
        CrfTemplateChildFrom: [],

        // Click->CrfTemplateLeftlist
        CrfTemplateLeftChildrenItem: [],
        tempaltetypes: 2,
        lookfrom:'',
        template_user_id:'',
        //跳转监听
        routertype:0,
        // 状态判断
        ispreview:''
    },
    getters,
    actions,
    mutations
})