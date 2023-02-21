﻿//导入express模板
const express = require('express')
const {
    header
} = require('express/lib/request')

//创建express的服务器实例
const app = express()
// test
//导入cors中间件
const cors = require('cors')
//将cors注册为全局中间件
app.use(cors())

//配置解析表单数据的中间件,注意：这个中间件只能解析application/x-www-from-urllencoded格式的表单数据
app.use(express.urlencoded({
    extended: false
}))

//一定要在路由之前，封装res.cc函数
app.use(function (req, res, next) {
    //status=0为成功，status=1为失败！默认将status的值设置为1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            //状态
            status,
            //状态描述，判断err是错误对象还是字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// TEST

//导入并使用用户路由模块
app.use('/API_cms_DB', require('./router/cms_DB'))
app.use('/API_Terminal_DB', require('./router/Terminal_DB'))
app.use('/API_Lying_DB', require('./router/Lying_DB'))

//调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})