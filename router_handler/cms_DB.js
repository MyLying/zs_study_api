// 导入bcrypyjs模块
const bcrypt = require('bcryptjs')

// 导入数据库操作模块
const {
    use
} = require('express/lib/application')
const cms_DB = require('../db/cms_DB')

// selectArticleAll处理函数
exports.selectArticleAll = (req, res) => {
    const sqlStr = 'select * from t_article'
    cms_DB.query(sqlStr, (err, results) => {
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
// selectArticleTypeAll处理函数
exports.selectArticleTypeAll = (req, res) => {
    const sqlStr = 'select * from t_article_type'
    cms_DB.query(sqlStr, (err, results) => {
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