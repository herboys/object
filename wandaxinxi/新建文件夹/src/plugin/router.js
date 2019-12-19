import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import main from '../components/main'
import Login from '../pages/Login.vue';
import Retrieval from '../pages/Retrieval.vue';
import Advanced from '../pages/Advanced.vue';
import SearchResult from '../pages/SearchResult.vue';
import ReportDetails from '../pages/ReportDetails.vue';
import LookData from '../pages/LookData.vue';
import Grouping from '../pages/Grouping.vue';
import AfterGrouping from '../pages/AfterGrouping.vue';
import ConditionGrouping from '../pages/conditionGroup/ConditionGrouping.vue'
import GroupQuery from '../pages/GroupQuery.vue'
import ErrorPage from '../components/ErrorPage.vue';
//======================================================
import PreviewForm from '../ChildCrfTenplate/PreviewForm.vue';
import AddTempale from '../Crf/AddTempale.vue';
import CrfTemplateFistPage from '../Crf/CrfTemplateFistPage.vue';
import CrfTemplate from '../Crf/CrfTemplate.vue';
import CrfTemplateMain from '../Crf/CrfTemplateMain.vue';
import ChildCrfTemplatMainRightHeader from '../ChildCrfTemplatMainRight/ChildCrfTemplatMainRightHeader.vue';
import CrfTemplateEditItem from "../ChildCrfTemplatMainRight/CrfTemplateEditItem";
import PhonePage from "../phone/PhonePage";
import CrfAiFill from "../CrfAiFill/CrfAiFill"
import LookCrfCoustom from "../ChildCrfTemplatMainRight/LookCrfCoustom";
import SmallTemplateGe from '../CrfSmallTemplate/SmallTemplateGe'
// User
import UserAdministration from "../User/UserAdministration";
import UserAdd from "../User/UserAdd";
import UserFillTemplate from "../User/UserFillTemplate";
import UserFillInForm from "../User/UserFillInForm";
let routes = [{
        path: '/login',
        component: Login
    },
    {
        path: '/PreviewForm',
        component: PreviewForm,
    },
    {
        path: '/main',
        component: main
    },
    {
        path: '/retrieval',
        component: Retrieval
    },
    {
        path: '/advanced',
        component: Advanced
    },
    {
        path: '/searchResult',
        component: SearchResult
    }, {
        path: '/AddTempale',
        component: AddTempale
    },
    { path: '/reportDetails/:aid', name: 'reportDetails', component: ReportDetails },
    { path: '/lookData/:dataId', name: 'lookData', component: LookData },
    { path: '/grouping', name: 'grouping', component: Grouping },
    { path: '/aftergrouping', name: 'aftergrouping', component: AfterGrouping },
    { path: '/conditionGrouping', name: 'conditionGrouping', component: ConditionGrouping },
    { path: '/groupQuery/:dataId', name: 'groupQuery', component: GroupQuery },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '*',
        component: ErrorPage
    },
    {
        path: '/CrfTemplateFistPage',
        component: CrfTemplateFistPage,
        children: [{
            path: '/',
            component: CrfTemplate,
        }, {
            path: '/CrfTemplateMain',
            component: CrfTemplateMain,
            children: [{
                path: '/ChildCrfTemplatMainRightHeader',
                component: ChildCrfTemplatMainRightHeader
            }]
        }, ]
    },
    {

        path: 'CrfTemplateEditItem',
        component: CrfTemplateEditItem,

    }, {
        path: '/UserAdministration',
        component: UserAdministration,
    }, {
        path: '/UserAdd',
        component: UserAdd,
    }, {
        path: '/UserFillTemplate',
        component: UserFillTemplate,
    }, {
        path: '/PhonePage',
        component: PhonePage,
    }, {
        path: '/CrfAiFill',
        component: CrfAiFill,
    }, {
        path: '/LookCrfCoustom',
        component: LookCrfCoustom,
    }, {
        path: '/SmallTemplateGe',
        component: SmallTemplateGe,
    },
    {
        path:'/UserFillInForm',
        component:UserFillInForm,
    }

];

let router = new VueRouter({
    routes
})

export default router;