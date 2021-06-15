import get from './index'
import post from './index'

// 获取公告
export const getNotice=()=>post("http://47.97.164.97:8888/announ/queryAnnounce")
// 获取特定类型的公告
export const getNoticeType=(type)=>post("http://47.97.164.97:8888/announ/queryAnnounceByType",type)
// 添加公告
export const addNotice=(form)=>post("http://47.97.164.97:8888/announ/admin/addAnnounce",form)




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

// 个人预约
export const appointPlace=(form)=>post("http://47.97.164.97:8888/appoint/appoint",form)
// 查看我的预约
export const appointInfo=(form)=>post("http://47.97.164.97:8888/appoint/showInfo",form)
// 修改预约信息
export const modifyAppoint=(form)=>post("http://47.97.164.97:8888/appoint/modifyAppoint",form)
// 取消预约
export const cancelAppoint=(form)=>post("http://47.97.164.97:8888/appoint/cancelAppoint",form)


// 全部器材
export const equipmentAll=()=>post("http://47.97.164.97:8888/equipment/findAll")
// 数量减
export const equipmentUpdate=(form)=>post("http://47.97.164.97:8888/equipment/admin/update",form)
// 数量增加
export const equipmentAdd=(form)=>post("http://47.97.164.97:8888/equipment/admin/add",form)