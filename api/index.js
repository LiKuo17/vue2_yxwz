import request from '../axios';
const apis = {
    //-----------------------------------------------------------------------会员卡-----------------------------------------------------------------------
    getViplist: '/m/product/vip/list', // 获取会员卡信息

    //-----------------------------------------------------------------------自助餐-----------------------------------------------------------------------
    getBenefits: '/m/product/benefits/getBenefits', //  获取自助餐详情

    //-----------------------------------------------------------------------订单管理-----------------------------------------------------------------------
    getOrderList: '/m/order/list', //获取订单列表
    delOrderList: '/m/order/removeOrder', //删除订单
    canOrderList: '/m/order/cancelOrder', //取消订单
    orderDetail: '/m/order/getOrder', //获取订单详情
    createOrder: '/m/order/createOrder', //确认酒店订单信息提交接口(创建订单)

    // -------------------------------------------------------------------酒店-------------------------------------------------------
    getHotelList: '/m/product/hotel/list', //获取酒店列表
    getHotelDetail: '/m/product/hotel/getHotel', //获取酒店详情

    // -------------------------------------------------------------------收获地址管理-------------------------------------------------------
    addAdress: '/m/addr/createAddr', // 新增地址
    editAdress: '/m/addr/editAddr', // 修改地址
    getOneAddress: '/m/addr/getAddr', // 获取单条地址详细
    getAdressList: '/m/addr/list', // 获取地址列表
    delAdress: '/m/addr/removeAddr', // 删除地址
    getDefaultAdress: '/m/addr/getDefaultAddr', // 获取默认地址

    // -------------------------------------------------------------------个人中心-------------------------------------------------------
    getUserInfo: '/m/user/getUser', // 获取个人信息
    editUserInfo: '/m/user/editUser', // 修改个人信息 /m/common/upload
    uploadImg: '/m/common/upload', // 上传图片
};

// GET 请求
export function getData(key, data) {
    return request({
        url: key ? apis[key] : '',
        method: 'get',
        data,
        headers: {
            Authorization: JSON.parse(localStorage.getItem('amain_token')),
        },
    });
}

// 获取单条数据
export function $getOnlyData(key, id) {
    return request({
        url: `${apis[key]}?id=${id}`,
        method: 'get',
    });
}

// 删除单条数据
export function delOnlyData(key, id) {
    return request({
        url: `${apis[key]}?id=${id}`,
        method: 'post',
    });
}
export function $postOnlyData(key, id) {
    return request({
        url: `${apis[key]}?id=${id}`,
        method: 'post',
    });
}

// 回去订单列表
export function getOrderList(key, num) {
    return request({
        url: `${apis[key]}?status=${num ? num : ''}`,
        method: 'get',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('amain_token')),
        },
    });
}

// POST 请求
export function postData(key, data) {
    return request({
        url: key ? apis[key] : '',
        method: 'post',
        data,
        // headers: {
        //     Authorization: JSON.parse(localStorage.getItem('amain_token')),
        //     'Content-Type': 'application/json; charset=utf-8',
        // },
    });
}

// export function getData(key, data) {
//     return request({
//         url: key ? apis[key] : '',
//         method: 'post',
//         data,
//         headers: {
//             Authorization: JSON.parse(localStorage.getItem('amain_token')),
//             // 'Content-Type': 'application/json; charset=utf-8'
//         },
//     });
// }

// 获取单条数据
export function getOnlyData(key, id) {
    return request({
        url: `${apis[key]}?id=${id}`,
        method: 'get',
    });
}

// formPost
export function $formPost(key, data) {
    return request({
        url: key ? apis[key] : '',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    });
}

// upload 上传图片或者导入
export function $upload(key, data) {
    if (!data) return;
    data.append('isCompress', true);
    data.append('width', 60);
    data.append('height', 60);
    return request({
        url: key ? apis[key] : '/api/general/attachment/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data,
    });
}

// 个人信息上传图片
export function $uploadImg(key, file) {
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    return request({
        url: key ? apis[key] : '',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    });
}

// 上传附件到对应模块
export function $uploadAttach(data, table) {
    if (!data) return;
    return request({
        url: `/api/general/attachment/upload?table=${table}`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data,
    });
}

// 发送验证码
export function sendCodeData(phone) {
    return request({
        url: '/m/sendCode?phone=' + phone,
        method: 'post',
    });
}

// 登录请求
export function $login(data) {
    return request({
        url: `/m/login?code=${data.code}&phone=${data.phone}`,
        method: 'post',
    });
}
