const express = require('express')
// 创建路由对象
const Lying_DB_router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/Lying_DB')

// selectUserAll
Lying_DB_router.get('/selectUserAll', userHandler.selectUserAll)

// test
Lying_DB_router.get('/test', userHandler.test)

// getRoom 
Lying_DB_router.get('/getMain', userHandler.getMain)

// 预约
Lying_DB_router.post('/booking', userHandler.booking)

// 取消预约
Lying_DB_router.post('/cancel', userHandler.cancel)

// 获取自习室详情页数据
Lying_DB_router.post('/getRIDetail', userHandler.getRIDetail)

// postUserInfo 
Lying_DB_router.post('/postUserInfo', userHandler.postUserInfo)

// getUserRoom 
Lying_DB_router.post('/getUserRoom', userHandler.getUserRoom)

// 登陆请求
Lying_DB_router.post('/login', userHandler.login)

// 退出登录状态
Lying_DB_router.post('/quit', userHandler.quit)



// 将路由对象共享出去
module.exports = Lying_DB_router