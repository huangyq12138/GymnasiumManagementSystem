import axios from 'axios'
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

//超级管理员的token
// let authorization = "Jared-eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfc3VwZXJBZG1pbiwiLCJqdGkiOiIyMDE4MTE3MDExMjciLCJzdWIiOiLogpblrrbosaoiLCJpYXQiOjE2MjM1NjU0MjYsImlzcyI6IkphcmVkIiwiZXhwIjoxNjI0MTcwMDk0fQ.HinBkcKt3yRs-S9saaWdwGP9aFRraYtsQeJLVV-0MhWL5bJ_mlf7NCdAdVNXggDsmP0I4lSMuNL3PfX2pFsHhg"

// let token = sessionStorage.getItem("token");
// console.log(token);
// axios.interceptors.request.use(
//     config => {
//         //设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
//         // if(config.method  === 'post'){
//         //     // JSON 转换为 FormData
//         //     const formData = new FormData();
//         //     Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
//         //     config.data = formData
//         // }
//         if (token) {
//             //将token放到请求头发送给服务器,将tokenkey放在请求头中
//             config.headers.Authorization = token;
//         }
//         //也可以这种写法
//         // config.headers['accessToken'] = Token;
//         return config;
//     }, err => {
//         return Promise.error(err);
//     }
// )

axios.interceptors.response.use(
    res => {
        if (res.status == 200) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res)
        }
    }, err => {
        console.log(err);
    }
)

export function get(url, parmas) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: parmas
        }).then(
            res => {
                resolve(res.data)
            }
        ).catch(
            err => {
                reject(err)
            }
        )
    })
}

export default function post(url, params) {
    return new Promise((resolve, reject) => {
        axios({ url, method: 'post', data: params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}