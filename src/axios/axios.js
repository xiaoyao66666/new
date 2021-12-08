/**

 * @author *震
 * @mailbox 2668985108@qq.com
 * @company  四川凡狼科技有限公司
 * @date 2021-11-16 20:51
 * @http  https://www.fanlang.cn/

 */



import axios from 'axios';

/**
 *  说明 本插件是对axios的进一步封装这里可以选择cookies验证和token验证
 */

// 使axios请求时携带cookie
// axios.defaults.withCredentials = true;



// 创建axios实例
const service = axios.create({
    timeout: 30000 // 请求超时时间
})
// 添加request拦截器
service.interceptors.request.use(config => {
    // 使用token验证
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token')
    }
    return config
}, error => {
    Promise.reject(error)
})
// 添加respone拦截器
service.interceptors.response.use(
    response => {
        let res = {};
        res.status = response.status
        res.data = response.data;
        return res;
    },
    error => {
        if (error.response && error.response.status === 404) {
            console.log("请求错误， 请仔细查看请求")
            // 此处可以添加一个404页面可以使用vue-router进行跳转
        }
        return Promise.reject(error.response)
    }
)

export function get(url, data = {}, params = {}) {
    // params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    return service({
        url: url,
        method: 'get',
        headers: {},
        data:JSON.stringify(data),
        // responseType:"blob",
        params,
    })
}

//封装post请求
export function post(url, data = {}) {
    //默认配置
    let sendObject = {
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    };
    sendObject.data = JSON.stringify(data);
    return service(sendObject)
}

//封装put方法 (resfulAPI常用)
export function put(url, data = {}) {
    return service({
        url: url,
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    })
}

//删除方法(resfulAPI常用)
export function deletes(url,data={}) {
    return service({
        url: url,
        method: 'delete',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data:JSON.stringify(data)
    })
}

//不要忘记export
export {
    service
}


