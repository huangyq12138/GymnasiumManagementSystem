import post from './index'

//用户登录
export const login = (form) => post("http://47.97.164.97:8888/user/userLogin", form)
    //注册教师
export const registerUser = (form) => post("http://47.97.164.97:8888/user/register", form)
    //注册学生
export const registerTeacher = (form) => post("http://47.97.164.97:8888/user/regTeacher", form)
    // 查询所有用户
export const getAll = () => post("http://47.97.164.97:8888/admin/showAll")
    // 查询所有管理员
export const getAllAdmins = () => post("http://47.97.164.97:8888/admin/showRoleForAdmin")
    // 查询所有普通用户
export const getAllUsers = () => post("http://47.97.164.97:8888/admin/showRoleForUser")
    // 查询某个用户的个人信息
export const getUser = (num) => post("http://47.97.164.97:8888/user/find", num)
    // 修改密码
export const updatedPsw = (data) => post("http://47.97.164.97:8888/user/modifyPwd", data)
    // 修改个人信息
export const updatedUserInfo = (data) => post("http://47.97.164.97:8888/user/modifyUserInfo", data)
    //添加管理员
export const addAdmin = (num) => post("http://47.97.164.97:8888/superAdmin/addAdmin", num)
    // 删除管理员
export const deleteAdmin = (num) => post("http://47.97.164.97:8888/superAdmin/delAdmin", num)



//查询月营运总额
export const getMoney = (data) => post("http://47.97.164.97:8888/money/queryMoneyByYearMonth", data)
    // 查询饼状图
export const getPieInfo = (data) => post("http://47.97.164.97:8888/money/queryPieByYearMonth", data)
    // 查询柱状图
export const getBarChart = (data) => post("http://47.97.164.97:8888/money/queryBarByYearMonth", data)



// 查询所有赛事
export const getAllContests = () => post("http://47.97.164.97:8888/contest/queryContest")
    //查询所有赛事类型
export const getAllConType = () => post("http://47.97.164.97:8888/contest/queryContestType")
    // 通过赛事id查询赛事
export const getContest = (id) => post("http://47.97.164.97:8888/contest/queryContestById", id)
    // 通过赛事类型查询赛事
export const getConByType = (type) => post("http://47.97.164.97:8888/contest/queryContestByType", type)
    // 添加赛事
export const addContest = (data) => post("http://47.97.164.97:8888/contest/admin/addContest", data)
    // 取消赛事
export const deleteContest = (id) => post("http://47.97.164.97:8888/contest/admin/deleteContest", id)
    // 通过赛事id查询赛事裁判
export const getJudge = (id) => post("http://47.97.164.97:8888/contest/queryJudgeById", id)
    // 添加赛事裁判
export const addJudge = (data) => post("http://47.97.164.97:8888/contest/admin/addJudge", data)
    // 删除赛事裁判
export const deleteJudge = (id) => post("http://47.97.164.97:8888/contest/admin/deleteAnnounce", id)
    // 通过赛事id查询赛事器材
export const getConEquip = (id) => post("http://47.97.164.97:8888/contest/queryEquipById", id)
    // 添加赛事器材
export const addConEquip = (data) => post("http://47.97.164.97:8888/contest/admin/addContestEquip", data)
    // 删除赛事器材
export const deleteConEquip = (id) => post("http://47.97.164.97:8888/contest/admin/deleteContestEquipById", id)


// 获取公告
export const getNotice = () => post("http://47.97.164.97:8888/announ/queryAnnounce")
    // 获取特定类型的公告
export const getNoticeType = (type) => post("http://47.97.164.97:8888/announ/queryAnnounceByType", type)
    // 添加公告
export const addNotice = (form) => post("http://47.97.164.97:8888/announ/admin/addAnnounce", form)
    // 删除公告
export const deleteNotice = (form) => post("http://47.97.164.97:8888/announ/admin/deleteAnnounce", form)



// 根据场地类型查询
export const placeType = (type) => post("http://47.97.164.97:8888/place/queryByType", type)
    // 场地删除
export const placeDelete = (id) => post("http://47.97.164.97:8888/place/delete", id)

// 空闲场地查询
export const placeFree = (form) => post("http://47.97.164.97:8888/place/queryFreePlace", form)

// 空闲时间查询
export const freeTime = (form) => post("http://47.97.164.97:8888/place/queryEnableTime", form)

// 一周场地时间使用查询
export const weekTime = (form) => post("http://47.97.164.97:8888/place/queryAllTime", form)

// 收费标准
export const placeStandard = (form) => post("http://47.97.164.97:8888/place/queryRate", form)

// 个人预约
export const appointPlace = (form) => post("http://47.97.164.97:8888/appoint/appoint", form)
    // 查看我的预约
export const appointInfo = (form) => post("http://47.97.164.97:8888/appoint/showInfo", form)
    // 修改预约信息
export const modifyAppoint = (form) => post("http://47.97.164.97:8888/appoint/modifyAppoint", form)
    // 取消预约
export const cancelAppoint = (form) => post("http://47.97.164.97:8888/appoint/cancelAppoint", form)
    // 特殊预约
export const appointSpecial = (form) => post("http://47.97.164.97:8888/appoint/admin/appoint", form)
    //根据所有场地类型
export const getAllPlaceType = (type) => post("http://47.97.164.97:8888/place/queryTypes", type)


// 全部器材
export const equipmentAll = () => post("http://47.97.164.97:8888/equipment/findAll")
    // 数量减
export const equipmentUpdate = (form) => post("http://47.97.164.97:8888/equipment/admin/update", form)
    // 数量增加
export const equipmentAdd = (form) => post("http://47.97.164.97:8888/equipment/admin/add", form)
    // 器材报修
export const equipmentRepair = (form) => post("http://47.97.164.97:8888/equipment/admin/repair", form)
// 查询收费标准
export const equipmentCharge = (form) => post("http://47.97.164.97:8888/equipment/findRates", form)

// 器材租用
export const rentEquip = (form) => post("http://47.97.164.97:8888/rentEquip/rent",form)
// 查询器材全部租用信息
export const rentAll = () => post("http://47.97.164.97:8888/rentEquip/findAll")
// 器材回收
export const rentDelete = (form) => post("http://47.97.164.97:8888/rentEquip/delete",form)
// 用户租用信息查询
export const rentFind = (form) => post("http://47.97.164.97:8888/rentEquip/find",form)
// 维修信息
export const findRepaire = () => post("http://47.97.164.97:8888/equipment/findRepair")
