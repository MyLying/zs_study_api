const express = require('express')
// 创建路由对象
const cms_DB_router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/cms_DB')

// selectArticleAll
cms_DB_router.get('/selectArticleAll', userHandler.selectArticleAll)

// selectArticleTypeAll
cms_DB_router.get('/selectArticleTypeAll', userHandler.selectArticleTypeAll)

// 将路由对象共享出去
module.exports = cms_DB_router