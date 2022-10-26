import axios from 'axios';
import Ipconfig from '../assets/js/config';
import $router from '../router';
axios.defaults.timeout = 10000; //设置超时时间

//设置默认路径
axios.defaults.baseURL = Ipconfig.serverAddress;

// 允许携带cookie
axios.defaults.withCredentials = true;

//请求拦截器
axios.interceptors.request.use(config => {
    // config.headers['Authorization'] = localStorage.getItem("amain_token").token;
    // console.log('0000000000000000000',config);
    if (config.method == 'get') {
        if (!config.params) {
            config.params = {};
        }
        config.params.bankId = Ipconfig.bankId;
        config.params.getTime = new Date().getTime();
    } else {
        if (!config.data) {
            config.data = {};
        }
        // config.data.bankId = Ipconfig.bankId;
        // config.data.getTime = new Date().getTime();
    }
    config.headers.Authorization = JSON.parse(window.localStorage.getItem('amain_token'));
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    return config;
});

//响应拦截器
axios.interceptors.response.use(response => {
    if (response.data.result == -9999) {
        // $router.push('/authLogin');
    }
    return response.data;
});

export default axios;
