// 导入bcrypyjs模块
const bcrypt = require('bcryptjs')

// 导入数据库操作模块
const {
    use
} = require('express/lib/application')
const Lying_DB = require('../db/Lying_DB')

// selectUserAll处理函数
exports.selectUserAll = (req, res) => {
    const sqlStr = 'select * from User'
    Lying_DB.query(sqlStr, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (!results.length) {
            return res.send({
                data: results,
                status: 1,
                message: '查询失败，无数据！',
            })
        }
        return res.send({
            data: results,
            status: 0,
            message: '查询成功！',
        })
    })
}


// test处理函数
exports.test = (req, res) => {
    const sqlStr = 'select * from User'
    Lying_DB.query(sqlStr, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: results,
                status: 100,
                message: '查询失败，无账号数据！',
            })
        }
        return res.send({
            data: results,
            status: 200,
            message: '查询成功！',
        })
    })
}

exports.cancel = (req, res) => {
    const UserInfo = req.body
    const sqlStr = "DELETE FROM UserRoom WHERE UserRoom_Account = '" + UserInfo.UserRoom_Account + "' and UserRoom_Room = '" + UserInfo.UserRoom_Room + "' and UserRoom_Date = '" + UserInfo.UserRoom_Date + "' and UserRoom_Time = '" + UserInfo.UserRoom_Time + "'"
    Lying_DB.query(sqlStr, (err, rows) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!rows == 1) {
            return res.send({
                data: "",
                status: 100,
                message: '取消预约失败！',
            })
        }
        return res.send({
            data: "",
            status: 200,
            message: '取消预约成功！',
        })
    })
}

// 预约bookin
exports.booking = (req, res) => {
    const UserInfo = req.body
    console.log(UserInfo);
    const sqlStr1 = "select * from UserRoom where UserRoom_Account= '" + UserInfo.UserRoom_Account + "' and  UserRoom_Date= '" + UserInfo.UserRoom_Date + "' and UserRoom_Time = '" + UserInfo.UserRoom_Time + "'"
    // console.log(sqlStr1);
    Lying_DB.query(sqlStr1, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 401,
                message: '查询失败！',
            })
        }
        if (results.length) {
            return res.send({
                data: "",
                status: 101,
                message: '预约失败，已经预约过了，您分身乏术喔！',
            })
        }
        const sqlStr2 = "INSERT INTO UserRoom VALUES (0,'" + UserInfo.UserRoom_Account + "','" + UserInfo.UserRoom_Room + "','" + UserInfo.UserRoom_Date + "','" + UserInfo.UserRoom_Time + "')"
        Lying_DB.query(sqlStr2, (err, rows) => {
            if (err) {
                return res.send({
                    data: err,
                    status: 402,
                    message: '查询失败！',
                })
            }
            if (!rows == 1) {
                return res.send({
                    data: "",
                    status: 102,
                    message: '预约失败！',
                })
            }
            return res.send({
                data: "",
                status: 202,
                message: '预约成功！',
            })
        })
    })

}

// 获取Main页信息
exports.getMain = (req, res) => {
    const sqlStr1 = 'select * from LostFound'
    const sqlStr2 = 'select * from Notice'
    const sqlStr3 = 'select * from RoomDuty'
    const sqlStr4 = 'select * from Room'
    let mainData = [{}, {}, {}, {}]
    Lying_DB.query(sqlStr1, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: "",
                status: 100,
                message: '获取LostFound数据失败！',
            })
        }
        mainData[0] = results
    })
    Lying_DB.query(sqlStr2, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: "",
                status: 100,
                message: '获取Notice数据失败！',
            })
        }
        mainData[1] = results
    })
    Lying_DB.query(sqlStr3, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: "",
                status: 100,
                message: '获取RoomDuty数据失败！',
            })
        }
        mainData[2] = results
    })
    Lying_DB.query(sqlStr4, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: "",
                status: 100,
                message: '获取Room数据失败！',
            })
        }
        mainData[3] = results
    })

    setTimeout(() => {
        return res.send({
            data: mainData,
            status: 200,
            message: '获取MAIN数据成功！',
        })
    }, 3000);
}

// 获取自习室详情页数据
exports.getRIDetail = (req, res) => {
    const User_Info = req.body
    // UserRoom_Date

    const sqlStr1 = 'select * from UserRoom where UserRoom.UserRoom_Room = "' + User_Info.UserRoom_Room + '"'
    Lying_DB.query(sqlStr1, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: "",
                status: 100,
                message: '获取UserRoom数据失败！',
            })
        }
        return res.send({
            data: results,
            status: 200,
            message: '获取UserRoom数据成功！',
        })
    })
}

// 获取UserRoom
exports.getUserRoom = (req, res) => {
    const User_Info = req.body
    // console.log(User_Info);
    // const sqlStr1 = 'select * from UserRoom where UserRoom_Account="' + User_Info.UserRoom_Account + '"'
    const sqlStr1 = 'select * from UserRoom,Room where UserRoom.UserRoom_Room = Room.Room_Room and UserRoom_Account="' + User_Info.UserRoom_Account + '"'
    // console.log(sqlStr1);

    Lying_DB.query(sqlStr1, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: "",
                status: 100,
                message: '获取UserRoom数据失败！',
            })
        }
        return res.send({
            data: results,
            status: 200,
            message: '获取UserRoom数据成功！',
        })
    })

}

// 提交UserInfo
exports.postUserInfo = (req, res) => {
    const User_Info = req.body
    // console.log(User_Info);
    const sqlStr1 = 'select * from UserInfo'
    const sqlstr2 = "INSERT INTO Lying_Lying_DB.UserInfo VALUES (" + User_Info.UserInfo_ID + ",'" + User_Info.UserInfo_Account + "','" + User_Info.UserInfo_Name + "','" + User_Info.UserInfo_Sex + "','" + User_Info.UserInfo_Class + "','" + User_Info.UserInfo_TelNumber + "','" + User_Info.UserInfo_IdentityCard + "'," + User_Info.UserInfo_Grade + ",'" + User_Info.UserInfo_QQNumber + "','" + User_Info.UserInfo_WeChatNumber + "','" + User_Info.UserInfo_MailNumber + "')"
    // console.log(sqlstr2);
    Lying_DB.query(sqlStr1, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: "",
                status: 100,
                message: '获取RoomUser数据失败！',
            })
        }
        return res.send({
            data: results,
            status: 200,
            message: '获取RoomUser数据成功！',
        })
    })

}

// 登陆函数
exports.login = (req, res) => {
    const User_Info = req.body
    // console.log(User_Info);
    let results1, results2, results3, results4

    const sqlStr1 = 'select User_Name,User_Class,User_Account from User where User_Account="' + User_Info.User_Account + '" and User_Password="' + User_Info.User_Password + '"'
    Lying_DB.query(sqlStr1, (err, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 401,
                message: '查询失败！',
            })
        }
        if (!results.length) {
            return res.send({
                data: results,
                status: 101,
                message: '您的账号或密码错误，请稍候重试！',
            })
        }
        results1 = results
        // 获取现在时间，ins
        let nowTime = new Date()
        if ((nowTime.getMonth() + 1) < 10) {
            nowTime = nowTime.getFullYear().toString() + "-0" + (nowTime.getMonth() + 1).toString() + "-" + nowTime.getDate().toString() + " " + nowTime.getHours().toString() + ":" + nowTime.getMinutes().toString() + ":" + nowTime.getSeconds().toString()
        } else {
            nowTime = nowTime.getFullYear().toString() + "-" + (nowTime.getMonth() + 1).toString() + "-" + nowTime.getDate().toString() + " " + nowTime.getHours().toString() + ":" + nowTime.getMinutes().toString() + ":" + nowTime.getSeconds().toString()
        }
        // console.log(nowTime);
        const sqlStr2 = "update User set User_LastLogin='" + nowTime + "' , User_State='1' where User_Account ='" + User_Info.User_Account + "'"
        Lying_DB.query(sqlStr2, (err, rows, results) => {
            if (err) {
                return res.send({
                    data: err,
                    status: 402,
                    message: '更改登录状态信息失败！',
                })
            }
            if (!rows) {
                return res.send({
                    data: rows,
                    status: 102,
                    message: '影响行数为0！',
                })
            }
            const sqlStr3 = 'select * from UserInfo where UserInfo_Account="' + User_Info.User_Account + '"'
            Lying_DB.query(sqlStr3, (err, results) => {
                if (err) {
                    return res.send({
                        data: err,
                        status: 403,
                        message: '查询失败！',
                    })
                }
                if (!results.length) {
                    return res.send({
                        data: results1,
                        status: 103,
                        message: '用户信息未完善，请完善信息后使用！',
                    })
                }
                return res.send({
                    data: results,
                    status: 200,
                    message: '已获取用户信息！',
                })
            })
        })

    })
}


// 退出登录
exports.quit = (req, res) => {
    console.log(req.body);
    const sqlStr1 = 'UPDATE User SET User_State= 0 WHERE  User_Account="' + req.body.User_Account + '"'

    console.log(sqlStr1);
    Lying_DB.query(sqlStr1, (err, rows, results) => {
        if (err) {
            return res.send({
                data: err,
                status: 400,
                message: '查询失败！',
            })
        }
        if (!rows) {
            return res.send({
                data: results,
                status: 100,
                message: '用户未能成功退出，请注意！',
            })
        }
        return res.send({
            data: results,
            status: 200,
            message: '已成功退出！',
        })
    })
}
