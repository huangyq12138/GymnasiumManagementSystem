import get from './index'
import post from './index'

// 获取公告
export const getNotice=()=>post("http://47.97.164.97:8888/announ​/queryAnnounce")

// 添加场地
export const addPlace=(form)=>post("http://47.97.164.97:8888/place/superAdmin/addPlace")
