import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './axios';
import VueTouch from 'vue-touch';
import fun from './assets/js/fun';
import globalFun from './utils/globalFun';
import { getData, postData, getOnlyData, delOnlyData } from '@/api';
import { Notify, Toast, Lazyload, Dialog } from 'vant';
import store from './store';
import VueCookies from 'vue-cookies';
import './utils/filters';
import Vant from 'vant';
import 'vant/lib/index.css';
// import VConsole from 'vconsole';
// const vConsole = new VConsole();
Vue.use(Vant);

import indexScss from './style/index.scss';
//自动化全局注册组件
import components from '@/plugins/components';
Vue.use(components);
Object.entries(indexScss).forEach(([key, value]) => {
    //把scss变量设为vue全局变量
    Vue.prototype[`$${key}`] = value;
});
Vue.use(VueCookies);
//注册全局方法
Vue.use(globalFun);
Vue.use(getData);
Vue.use(postData);
Vue.use(getOnlyData);
Vue.use(delOnlyData);

Vue.use(Lazyload, {
    preLoad: 2,
});
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$fun = fun;
Vue.prototype.$notify = Notify;
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;

Vue.use(VueTouch, { name: 'v-touch' });

VueTouch.config.swipe = {
    hreshold: 100, //手指左右滑动距离
};

//连接webSocket
// Vue.prototype.$connectSocket();

Vue.filter('NumFormat', function(value) {
    if (!value) return '0.00';
    return Number(value).toFixed(2); //获取整数部分
});
m_vue = new Vue({
    el: '#app',
    router,
    components: {
        App,
    },
    store,
    template: '<App/>',
});
