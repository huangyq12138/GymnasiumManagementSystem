import axios from 'axios'
<<<<<<< HEAD
axios.defaults.timeout = 2000;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

//临时放个超级管理员的token在这里 因为登陆不了
// let token = "Jared-eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfc3VwZXJBZG1pbiwiLCJqdGkiOiIyMDE4MTE3MDExMjciLCJzdWIiOiLogpblrrbosaoiLCJpYXQiOjE2MjM1NjU0MjYsImlzcyI6IkphcmVkIiwiZXhwIjoxNjI0MTcwMDk0fQ.HinBkcKt3yRs-S9saaWdwGP9aFRraYtsQeJLVV-0MhWL5bJ_mlf7NCdAdVNXggDsmP0I4lSMuNL3PfX2pFsHhg"
let token = sessionStorage.getItem('token');
// console.log(token)

axios.interceptors.request.use(
    config => {
        token && (config.headers.Authorization = token)
        return config;
    }, err => {
=======
axios.defaults.timeout=20000;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

//临时放个超级管理员的token在这里 因为登陆不了
let token="Jared-eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfc3VwZXJBZG1pbiwiLCJqdGkiOiIyMDE4MTE3MDExMjciLCJzdWIiOiLogpblrrbosaoiLCJpYXQiOjE2MjM1NjU0MjYsImlzcyI6IkphcmVkIiwiZXhwIjoxNjI0MTcwMDk0fQ.HinBkcKt3yRs-S9saaWdwGP9aFRraYtsQeJLVV-0MhWL5bJ_mlf7NCdAdVNXggDsmP0I4lSMuNL3PfX2pFsHhg"
axios.interceptors.request.use(
    config=>{
        token && (config.headers.Authorization = token)
        return config;
    },err=>{
>>>>>>> xq
        return Promise.error(err);
    }
)

axios.interceptors.response.use(
<<<<<<< HEAD
    res => {
        if (res.status == 200) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res)
        }
    }, err => {
=======
    res=>{
        if(res.status==200){
            return Promise.resolve(res);
        }else{
            return Promise.reject(res)
        }
    },err=>{
>>>>>>> xq
        console.log(err);
    }
)

<<<<<<< HEAD
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
=======
export function get(url,parmas){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:parmas
        }).then(
            res=>{
                resolve(res.data)
            }
        ).catch(
            err=>{
>>>>>>> xq
                reject(err)
            }
        )
    })
}

<<<<<<< HEAD
export default function post(url, params) {
    return new Promise((resolve, reject) => {
        axios({ url, method: 'post', data: params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
=======
export  default function post(url, params) {
    return new Promise((resolve, reject) => {
         axios({url, method: 'post',data:params})
        .then(res => {       
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
>>>>>>> xq
    });
}