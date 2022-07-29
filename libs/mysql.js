const mysql = require('mysql');
const config = require("../config/default.config");

const pool = mysql.createPool({
    host: config.database.DB_HOST,
    user: config.database.DB_USER,
    password: config.database.DB_PASS,
    database: config.database.DB_NAME,
    port: config.database.DB_PORT,
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

let users =
    `create table if not exists users(
        user_id VARCHAR(32) NOT NULL COMMENT '用户ID',
        user_name VARCHAR(50) NOT NULL COMMENT '用户名',
        user_pass VARCHAR(100) NOT NULL COMMENT '密码',
        user_face VARCHAR(100) NOT NULL COMMENT '头像',
        user_bio TEXT NOT NULL COMMENT '用户简介',
        user_create_time VARCHAR(100) NOT NULL COMMENT '创建时间',
        user_update_time VARCHAR(100) NOT NULL COMMENT '修改时间',
        is_delete INT(1) DEFAULT 0 COMMENT '是否删除',
        is_admin INT(1) DEFAULT 0 COMMENT '是否为管理员',
        PRIMARY KEY ( user_id )
   );`

let documents =
    `create table if not exists documents(
     document_id VARCHAR(32) NOT NULL COMMENT '文章ID',
     title VARCHAR(255) NOT NULL COMMENT '文章标题',
     md TEXT NOT NULL COMMENT '文章内容md',
     html TEXT NULL COMMENT '文章内容html',
     descs TEXT NOT NULL COMMENT '文章简介',
     parent_id VARCHAR(32) NOT NULL COMMENT '所属分类ID',
     user_id VARCHAR(32) NOT NULL COMMENT '创建的用户ID',
     user_create_time VARCHAR(100) NOT NULL COMMENT '创建时间',
     user_update_time VARCHAR(100) NOT NULL COMMENT '修改时间',
     is_delete INT(1) DEFAULT '0' COMMENT '是否删除',
     PRIMARY KEY ( document_id )
    );`

let categorys =
    `create table if not exists categorys(
     category_id VARCHAR(32) NOT NULL COMMENT '分类ID',
     title VARCHAR(255) NOT NULL COMMENT '分类标题',
     descs TEXT NOT NULL COMMENT '分类简介',
     parent_id VARCHAR(32) NOT NULL COMMENT '父级分类ID',
     user_id VARCHAR(32) NOT NULL COMMENT '创建的用户ID',
     user_create_time VARCHAR(100) NOT NULL COMMENT '创建时间',
     user_update_time VARCHAR(100) NOT NULL COMMENT '修改时间',
     is_delete INT(1) DEFAULT '0' COMMENT '是否删除',
     PRIMARY KEY ( category_id )
    );`

let createTable = (sql) => {
    return query(sql, [])
}

// 建表
createTable(users)
createTable(documents)
createTable(categorys)

// 注册用户
exports.insertUser = (value) => {
    let _sql = "insert into users set user_id=?,user_name=?,user_pass=?,user_face=?,user_bio=?,user_create_time=?,user_update_time=?;"
    return query(_sql, value)
}
// 删除用户
exports.deleteUserData = (name) => {
    let _sql = `delete from users where name="${name}";`
    return query(_sql)
}
// 查找用户
exports.findUserData = (name) => {
    let _sql = `select * from users where user_name="${name}";`
    return query(_sql)
}
// 发表文章
exports.insertPost = (value) => {
    let _sql = "insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;"
    return query(_sql, value)
}
// 增加文章评论数
exports.addPostCommentCount = (value) => {
    let _sql = "update posts set comments = comments + 1 where id=?"
    return query(_sql, value)
}
// 减少文章评论数
exports.reducePostCommentCount = (value) => {
    let _sql = "update posts set comments = comments - 1 where id=?"
    return query(_sql, value)
}

// 更新浏览数
exports.updatePostPv = (value) => {
    let _sql = "update posts set pv= pv + 1 where id=?"
    return query(_sql, value)
}

// 发表评论
exports.insertComment = (value) => {
    let _sql = "insert into comment set name=?,content=?,moment=?,postid=?,avator=?;"
    return query(_sql, value)
}
// 通过名字查找用户
exports.findDataByName = (name) => {
    let _sql = `select * from users where name="${name}";`
    return query(_sql)
}
// 通过名字查找用户数量判断是否已经存在
exports.findDataCountByName = (name) => {
    let _sql = `select count(*) as count from users where name="${name}";`
    return query(_sql)
}
// 通过文章的名字查找用户
exports.findDataByUser = (name) => {
    let _sql = `select * from posts where name="${name}";`
    return query(_sql)
}
// 通过文章id查找
exports.findDataById = (id) => {
    let _sql = `select * from posts where id="${id}";`
    return query(_sql)
}
// 通过文章id查找
exports.findCommentById = (id) => {
    let _sql = `select * from comment where postid="${id}";`
    return query(_sql)
}

// 通过文章id查找评论数
exports.findCommentCountById = (id) => {
    let _sql = `select count(*) as count from comment where postid="${id}";`
    return query(_sql)
}

// 通过评论id查找
exports.findComment = (id) => {
    let _sql = `select * from comment where id="${id}";`
    return query(_sql)
}
// 查询所有文章
exports.findAllPost = () => {
    let _sql = `select * from posts;`
    return query(_sql)
}
// 查询所有文章数量
exports.findAllPostCount = () => {
    let _sql = `select count(*) as count from posts;`
    return query(_sql)
}
// 查询分页文章
exports.findPostByPage = (page) => {
    let _sql = ` select * from posts limit ${(page - 1) * 10},10;`
    return query(_sql)
}
// 查询所有个人用户文章数量
exports.findPostCountByName = (name) => {
    let _sql = `select count(*) as count from posts where name="${name}";`
    return query(_sql)
}
// 查询个人分页文章
exports.findPostByUserPage = (name, page) => {
    let _sql = ` select * from posts where name="${name}" order by id desc limit ${(page - 1) * 10},10 ;`
    return query(_sql)
}
// 更新修改文章
exports.updatePost = (values) => {
    let _sql = `update posts set title=?,content=?,md=? where id=?`
    return query(_sql, values)
}
// 删除文章
exports.deletePost = (id) => {
    let _sql = `delete from posts where id = ${id}`
    return query(_sql)
}
// 删除评论
exports.deleteComment = (id) => {
    let _sql = `delete from comment where id=${id}`
    return query(_sql)
}
// 删除所有评论
exports.deleteAllPostComment = (id) => {
    let _sql = `delete from comment where postid=${id}`
    return query(_sql)
}

// 滚动无限加载数据
exports.findPageById = (page) => {
    let _sql = `select * from posts limit ${(page - 1) * 5},5;`
    return query(_sql)
}
// 评论分页
exports.findCommentByPage = (page, postId) => {
    let _sql = `select * from comment where postid=${postId} order by id desc limit ${(page - 1) * 10},10;`
    return query(_sql)
}