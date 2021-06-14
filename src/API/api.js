import get from './index'
import post from './index'

// 获取公告
export const getNotice=()=>post("http://47.97.164.97:8888/announ/queryAnnounce")
// 添加公告
export const addNotice=(a)=>post("http://47.97.164.97:8888/announ/admin/addAnnounce",a)



// 场地类型查询
export const placeType=(type)=>post("http://47.97.164.97:8888/place/queryByType",type)
// 场地删除
export const placeDelete=(id)=>post("http://47.97.164.97:8888/place/delete",id)

// 空闲场地查询
export const placeFree=(form)=>post("http://47.97.164.97:8888/place/queryFreePlace",form)

// 空闲时间查询
export const freeTime=(form)=>post("http://47.97.164.97:8888/place/queryEnableTime",form)

// 一周场地时间使用查询
export const weekTime=(form)=>post("http://47.97.164.97:8888/place/queryAllTime",form)

// 收费标准
export const placeStandard=(form)=>post("http://47.97.164.97:8888/place/queryRate",form)