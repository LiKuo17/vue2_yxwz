import $router from '../router';
import Socket from '../socket';
import axios from '../axios';
import config from '@/assets/js/config';
//不让连接socket时状态码-9999跳登录，因此重创一个axios实例
const innerRequest = axios.create({
    timeout: 10000,
    baseURL: config.serverAddress,
    withCredentials: true,
});
export default {
    install(Vue, options) {
        Vue.prototype.$back = () => {
            if (window.history.length > 1) {
                $router.back();
            } else {
                $router.push('/');
            }
        };
        // Vue.prototype.$connectSocket = () => {
        //       //$socket不存在或连接状态不为1则建立socket连接
        //       if (!Vue.prototype.$socket || Vue.prototype.$socket.readyState != 1) {
        //             //连接webSocket
        //             innerRequest.get("/m/members/api/getInfo", { baseURL: config.serverAddress, withCredentials: true }).then(res => {
        //                   if (res.data && res.data.result === 0) {
        //                         let uid = res.data.data.uid;
        //                         new Socket({ Vue, uid });
        //                   }
        //             });
        //       }
        // };
        Vue.prototype.$toHttpAddress = val => {
            console.log(val);
            if (val.startsWith('http') || val == '') {
                return val;
            } else {
                return `http://${val}`;
            }
        };
        Vue.prototype.$getImageUrl = filePath => {
            let uploadsUrl = config.fileServerAddress;
            if (!filePath) {
                return uploadsUrl;
            } else if (filePath.indexOf('http') == 0) {
                return filePath;
            } else {
                var nPos = filePath.indexOf('upload');
                if (nPos == 0 || nPos == 1) {
                    var nPos2 = filePath.indexOf('/', nPos);
                    if (nPos2 > 0) {
                        filePath = filePath.substring(nPos2 + 1);
                    }
                }
                if (
                    uploadsUrl.lastIndexOf('/') == uploadsUrl.length - 1 ||
                    filePath.indexOf('/') == 0
                ) {
                    return uploadsUrl + filePath;
                } else {
                    return uploadsUrl + '/' + filePath;
                }
            }
        };
    },
};
