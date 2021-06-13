import get from './index'
import post from './index'

// 获取公告
export const getNotice=()=>post("http://47.97.164.97:8888/announ​/queryAnnounce")

// 查询所有场地类型
export const getType=()=>post("http://47.97.164.97:8888/place/queryTypes")