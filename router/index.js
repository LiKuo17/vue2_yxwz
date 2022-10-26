import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index';
import axios from 'axios';
import { Toast } from 'vant';
Vue.use(Router);

//避免跳转相同地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                keepAlive: true,
                deepth: 1,
            },
            component: index,
            children: [
                {
                    path: '/',
                    name: 'ccbHome',
                    component: () => import('@/pages/home/ccbHome'),
                    meta: {
                        keepAlive: true,
                        deepth: 1,
                    },
                },
                {
                    path: '/ccbUser',
                    name: 'ccbUser',
                    component: () => import('@/pages/personalCenter/ccbUser'),
                },
                {
                    path: '/ccbOrder',
                    name: 'ccbOrder',
                    component: () => import('@/pages/personalCenter/ccbOrder'),
                },

                {
                    path: '/allGoods',
                    name: 'allGoods',
                    component: () => import('@/pages/allGoods/allGoods'),
                    meta: {
                        keepAlive: true,
                        deepth: 1,
                    },
                },

                //--------------------------------------------- 预约酒店---------------------------------------------------------
                {
                    path: '/openYearCard',
                    name: 'openYearCard',
                    component: () => import('@/pages/yearCard/openYearCard'),
                },
                {
                    path: '/hotelBooking',
                    name: 'hotelBooking',
                    component: () => import('@/pages/yearCard/hotelBooking'),
                },
               

                {
                    path: '/personalCenter',
                    name: 'personalCenter',
                    component: () => import('@/pages/personalCenter/personalCenter'),
                },
                {
                    path: '/shoppingcartForOld',
                    name: 'shoppingcartForOld',
                    component: () => import('@/pages/personalCenter/shoppingcartForOld'),
                },
            ],
        },

        {
            path: '/cityChoose',
            name: 'cityChoose',
            component: () => import('@/pages/yearCard/cityChoose'),
        },
        //酒店详情
        {
            path: '/hotelDetail',
            name: 'hotelDetail',
            component: () => import('@/pages/yearCard/hotelDetail'),
        },
        // ----------------------------------------------个人中心-------------------------------------------------------------------------------------------------------------------------------------------------------
        {
            path: '/shoppingcart',
            name: 'shoppingcart',
            component: () => import('@/pages/shoppingCart/shoppingcart'),
        },
        //返现
        {
            path: '/cashBack',
            name: 'cashBack',
            component: () => import('@/pages/personCenter/cashBack'),
        },
        //赠品
        {
            path: '/gift',
            name: 'gift',
            component: () => import('@/pages/personCenter/gift'),
        },
        //地址
        {
            path: '/address',
            name: 'address',
            component: () => import('@/pages/personCenter/address/address'),
        },
        //新增地址
        {
            path: '/addressAddNew',
            name: 'addressAddNew',
            component: () => import('@/pages/personCenter/address/addressAddNew'),
        },
        //编辑地址
        {
            path: '/addressEditNew',
            name: 'addressEditNew',
            component: () => import('@/pages/personCenter/address/addressEditNew'),
        },
        //个人信息
        {
            path: '/personalInformation',
            name: 'personalInformation',
            component: () => import('@/pages/personCenter/personalInformation/personalInformation'),
        },
        //卡
        {
            path: '/card',
            name: 'card',
            component: () => import('@/pages/personCenter/card/card'),
        },
        
        
        // --------------------------------------------------------------个人中心---------------------------------------------------------------------------------------------------------------------------------------

        {
            path: '/getcoupon',
            name: 'getcoupon',
            component: () => import('@/pages/home/getcoupon'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/login/testRegister'),
        },
        // {
        //   path: "/changePassword",
        //   name: "changePassword",
        //   component: () => import('@/pages/login/changePassword')
        // },
        // {
        //   path: "/login",
        //   name: "login",
        //   component: () => import("@/pages/login/login"),
        // },
        {
            path: '/active',
            name: 'active',
            component: () => import('@/pages/home/active'),
            meta: {
                keepAlive: true,
                deepth: 2,
            },
        },
        {
            path: '/logistics',
            name: 'logistics',
            component: () => import('@/pages/myOrder/logistics'),
        },
        //	,{
        //		path: '/popularityrank',
        //		name: 'popularityrank',
        //		component: () =>
        //		import('@/pages/popularityrank')
        //	}
        {
            path: '/detail',
            name: 'detail',

            component: () => import('@/pages/home/detail'),
        },
        {
            path: '/seckillList',
            name: 'seckillList',
            component: () => import('@/pages/home/seckillList'),
        },
        {
            path: '/seckillDetail',
            name: 'seckillDetail',
            component: () => import('@/pages/home/seckillDetail'),
            beforeEnter: (to, from, next) => {
                axios
                    .get('/m/products/common/api/getInfo', {
                        params: { prdId: to.query.prdid },
                    })
                    .then(res => {
                        if (res.result == 0) {
                            next();
                        } else {
                            Toast(res.msg);
                            window.history.go(-1);
                            next(false);
                        }
                    });
            },
        },
        {
            path: '/addcomment',
            name: 'addcomment',
            component: () => import('@/pages/myOrder/addcomment'),
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('@/components/test'),
        },
        {
            path: '/confirmOrder',
            name: 'confirmOrder',
            component: () => import('@/pages/myOrder/confirmOrder'),
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('@/pages/personalCenter/setting'),
        },
        {
            path: '/certificate',
            name: 'certificate',
            component: () => import('@/pages/myOrder/certificate'),
        },
        {
            path: '/addressManage',
            name: 'addressManage',
            component: () => import('@/pages/personalCenter/addressManage'),
        },
        {
            path: '/addressEdit',
            name: 'addressEdit',
            component: () => import('@/pages/personalCenter/addressEdit'),
        },
        {
            path: '/addressAdd',
            name: 'addressAdd',
            component: () => import('@/pages/personalCenter/addressAdd'),
        },
        {
            path: '/toPay',
            name: 'toPay',
            component: () => import('@/pages/myOrder/toPay'),
        },
        {
            path: '/return',
            name: 'return',
            component: () => import('@/pages/myOrder/return'),
        },
        {
            path: '/return1',
            name: 'return1',
            component: () => import('@/pages/myOrder/return1'),
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/pages/home/search'),
            meta: {
                keepAlive: true,
                deepth: 2,
            },
        },
        {
            path: '/testlogin',
            name: 'testlogin',
            component: () => import('@/pages/login/testlogin'),
        },
        {
            path: '/testlogin1',
            name: 'testlogin1',
            component: () => import('@/pages/login/testlogin_backup'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/testlogin'),
        },
        {
            path: '/ssologin',
            name: 'ssologin',
            component: () => import('@/pages/login/ssologin'),
        },
        {
            path: '/ssologin_callback',
            name: 'ssologinCallBack',
            component: () => import('@/pages/login/ssologin_callback'),
        },
        {
            path: '/toPaySuccess',
            name: 'toPaySuccess',
            component: () => import('@/pages/myOrder/toPaySuccess'),
        },
        {
            path: '/searchResult',
            name: 'searchResult',
            component: () => import('@/pages/home/searchResult'),
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: () => import('@/pages/myOrder/orderDetail'),
        },
        {
            path: '/orderDetail1',
            name: 'orderDetail1',
            component: () => import('@/pages/myOrder/orderDetail1'),
        },
        {
            path: '/bullentin',
            component: () => import('@/pages/bullentin'),
        },
        {
            path: '/collection',
            component: () => import('@/pages/personalCenter/collection'),
        },
        {
            path: '/customerService',
            component: () => import('@/pages/personalCenter/customerService'),
        },
        {
            path: '/chatList',
            component: () => import('@/pages/personalCenter/chatList'),
        },
        {
            path: '/coupons',
            component: () => import('@/pages/personalCenter/coupons'),
        },
        {
            path: '/helpCenter',
            component: () => import('@/pages/personalCenter/helpCenter'),
        },
        {
            path: '/helpQuestion',
            component: () => import('@/pages/personalCenter/helpQuestion'),
        },
        {
            path: '/aboutDetail',
            component: () => import('@/pages/personalCenter/aboutDetail'),
        },
        {
            path: '/feedBack',
            component: () => import('@/pages/personalCenter/feedBack'),
        },
        {
            path: '/storeDetail',
            component: () => import('@/pages/personalCenter/storeDetail'),
        },
        {
            path: '/myOrder',
            name: 'myOrder',
            component: () => import('@/pages/myOrder/myOrder'),
        },
        {
            path: '/myRights',
            name: 'myRights',
            component: () => import('@/pages/personalCenter/myRights'),
        },
        {
            path: '/venue',
            name: 'venue',
            component: () => import('@/pages/home/venue'),
        },
        {
            path: '/redirectToIntegral',
            name: 'redirectToIntegral',
            component: () => import('@/pages/redirectToIntegral'),
        },
        {
            path: '/authLogin',
            name: 'authLogin',
            component: () => import('@/pages/login/authLogin'),
        },
        {
            path: '/footPrint',
            name: 'footPrint',
            component: () => import('@/pages/personalCenter/footPrint'),
        },
        {
            path: '/equity',
            name: 'equity',
            component: () => import('@/pages/personalCenter/equity'),
        },
        {
            path: '/telCoupon',
            name: 'telCoupon',
            component: () => import('@/pages/personalCenter/telCoupon'),
        },
        {
            path: '/bindSaleCode',
            name: 'bindSaleCode',
            component: () => import('@/pages/personalCenter/bindSaleCode'),
        },
        {
            path: '/saleOrder',
            name: 'saleOrder',
            component: () => import('@/pages/personalCenter/saleOrder'),
        },
        {
            path: '*',
            component: () => import('@/pages/404'),
        },
        {
            path: '/yearcardDetail',
            name: 'yearcardDetail',
            component: () => import('@/pages/yearCard/yearcardDetail'),
        },
        {
            path: '/useExplain',
            name: 'useExplain',
            component: () => import('@/pages/yearCard/useExplain'),
        },
        {
            path: '/comfirmOrderr',
            name: 'comfirmOrderr',
            component: () => import('@/pages/newMyOrder/comfirmOrderr'),
        },
        
        {
            path: '/stayPay',
            name: 'stayPay',
            component: () => import('@/pages/newMyOrder/stayPay'),
        },
        {
            path: '/contactAdd',
            name: 'contactAdd',
            component: () => import('@/pages/newMyOrder/contactAdd'),
        },
    ],
});
