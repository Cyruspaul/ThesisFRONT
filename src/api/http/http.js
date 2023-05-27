import axios from 'axios'
import  NProgress from 'nprogress/nprogress'
import {Message,Notification}  from "@arco-design/web-vue";
import store from "@/store";


axios.defaults.baseURL = process.env.BASE_URL
// axios.defaults.headers.Authorization = store.getters.getuserInfo.token!==undefined?"Bearer "+store.getters.getuserInfo.token:undefined
// axios.defaults.headers.token = store.getters.getuserInfo.token!==undefined?"Bearer "+store.getters.getuserInfo.token:undefined
// axios.defaults.headers.userid = store.getters.getcur_User.user_id

axios.interceptors.request.use(config => {
    NProgress.start()
    // console.log("AUTH",config.headers)
    config.headers.setAuthorization(store.getters.getuserInfo.token!==undefined?"Bearer "+store.getters.getuserInfo.token:undefined)
    // console.log(config)
    // config.headers['token'] = ref(store.getters.getcur_User.token)
    // console.log(config.headers)
    return config
}, error => {
    return Promise.reject(error)
},{
    synchronous:true
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    NProgress.done()
    return response.data
    // console.log("RESPONSE")
    // console.log(response)
    // if (response.status === 200 || response.status === 304) {
    //     return response.data
    // }
    // if (response.status >= 500) {
    //     return {
    //         data: {
    //             code: -500,
    //             status: false,
    //             message: response.statusText,
    //             data: response.statusText
    //         }
    //     }
    // }
    // return {
    //     data: {
    //         code: -404,
    //         status: false,
    //         message: response.statusText,
    //         data: response.statusText
    //     }
    // }
}

function checkCode(res) {
    // console.log(res)
    // if (!res.data.status) {
        switch (res.code) {
            case 1000:
                Notification.success(res.message || '未知异常')
                break
            case 2000:
                // Message.error(res.message || '未知异常')
                break
            case 3000:
                Notification.warning(res.message)
                break
            case 4000:
                Notification.error(res.message)
                Notification.error('您需要重新登录！')
                store.dispatch('logout')
                break
            // default:
            //     errMsg ? ElMessage.error(errMsg) : ElMessage.error(res.data.ElMessage || '未知异常')
        }
        if (res.Code === 5000){
            Notification.error('服务器连接错误！')
        }

    return res
}

export default {
    POSTFILE(url, data,config) {
        // console.log(errMsg)
        // const CancelToken = axios.CancelToken
        return axios.post(url, data,{
            headers:{
                "Content-Type":"multipart/form-data; boundary=----WebKitFormBoundarym9rNf7EsEiv7jdhu"
            },
            timeout:30000
            }
        ).then(checkStatus)
        .then(res => checkCode(res))
    },
    POST(url, data,config) {
        // console.log(errMsg)
        // const CancelToken = axios.CancelToken
        return axios.post(url, data,{
            headers:{config},
            timeout:30000
            }
        ).then(checkStatus)
        .then(res => checkCode(res))
    },
    GET(url, params, errMsg) {
        // console.log(errMsg)
        // const CancelToken = axios.CancelToken
        return axios.get(url, {
            params: {
                ...params
            },
            timeout: 30000,
            // cancelToken: new CancelToken(function executor (c) {
            //
            // })
        }).then(checkStatus)
        .then(res => checkCode(res, errMsg))
    },
    DELETE(url, errMsg) {
        // const CancelToken = axios.CancelToken
        return axios.delete(url, {
            timeout: 30000,
            // cancelToken: new CancelToken(function executor () {
            //
            // })
        }).then(checkStatus).then(res => checkCode(res, errMsg))
    },
    PUT(url, data, errMsg) {
        console.log(errMsg)
        // const CancelToken = axios.CancelToken
        return axios.put(url, data, {
            timeout: 30000,
            // cancelToken: new CancelToken(function executor () {
            //
            // })
        }).then(checkStatus).then(res => checkCode(res, errMsg))
    },
    EXPORT(url, data, errMsg) {
        console.log(errMsg)
        console.log(errMsg)
        // const CancelToken = axios.CancelToken
        return axios.post(url, data, {
            responseType: 'blob',
            timeout: 30000,
            // cancelToken: new CancelToken(function executor () {
            //
            // })
        }).then(checkStatus).then(res => res.data)
    }
}
