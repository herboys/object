import Vue from 'vue'
import App from './App.vue';
import EVueContextmenu from 'e-vue-contextmenu';
Vue.use(EVueContextmenu)
// import promise from 'es6-promise'
// promise.polyfills()
//引入路由配置
import router from './plugin/router';
// 引入base64
import { Base64 } from 'js-base64';
//引入公共样式
import './assets/css/reset.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import axios from './plugin/axios';

//日期格式化
import common from './filters/formDate';
Vue.prototype.common = common;

// //
// import transform from './filters/transform'
// Vue.prototype.transform = transform;


//配置baseUrl
// Vue.prototype.baseUrl = require('../congig/config').active;

//引入状态管理配置
import store from './store/store'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.config.productionTip = false
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')