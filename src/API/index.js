import axios from 'axios'
axios.defaults.timeout=20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


//临时放个超级管理员的token在这里 因为登陆不了
let token="Jared-eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfc3VwZXJBZG1pbiwiLCJqdGkiOiIyMDE4MTE3MDExMjciLCJzdWIiOiLogpblrrbosaoiLCJpYXQiOjE2MjM1NjU0MjYsImlzcyI6IkphcmVkIiwiZXhwIjoxNjI0MTcwMDk0fQ.HinBkcKt3yRs-S9saaWdwGP9aFRraYtsQeJLVV-0MhWL5bJ_mlf7NCdAdVNXggDsmP0I4lSMuNL3PfX2pFsHhg"
axios.interceptors.request.use(
    config=>{
        token && (config.headers.Authorization = token)
        return config;
    },err=>{
        return Promise.error(err);
    }
)

axios.interceptors.response.use(
    res=>{
        if(res.status==200){
            return Promise.resolve(res);
        }else{
            return Promise.reject(res)
        }
    },err=>{
        console.log(err);
    }
)

export function get(url,parmas){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:parmas
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            err=>{
                reject(err)
            }
        )
    })
}

export  default function post(url, params) {
    return new Promise((resolve, reject) => {
         axios({url, method: 'post',data:params})
        .then(res => {       
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}