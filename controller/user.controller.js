const md5 = require('js-md5');

const { insertUser, findUserData } = require("../libs/mysql")
const { rejson } = require("../libs/returnData")

class UserController {
    user_login = async (ctx, next) => {
        let { user_name, user_pass } = ctx.request.body
        await findUserData(user_name).then(user => {
            console.log(user)
            if(!user.length) {
                return ctx.body = rejson(404, "该用户没有注册,请访问 '/user/register' 注册")
            } else {
                return ctx.body = rejson(200, "登录成功", { user_name, user_pass })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    user_register = async (ctx, next) => {
        let { user_name, user_pass, user_face, user_bio } = ctx.request.body
        await findUserData(user_name).then(user => {
            console.log(user)
            if(user.length) {
                return ctx.body = rejson(201, "该用户名已注册，请更换")
            } else {
                user_pass = md5(user_pass).toString()
                let user_id = md5(user_name + Date().getTime).toString()
                let user_create_time = new Date().getTime()
                let user_update_time = new Date().getTime()
                // console.log(user_pass)
                if(!user_face.length) {
                    user_face = "https://img2.baidu.com/it/u=1249099614,3534836312&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=448"
                }

                if(!user_bio.length) {
                    user_bio = "这家伙很神秘"
                }

                insertUser(user_id, user_name, user_pass, user_bio, user_face, user_create_time, user_update_time).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    user_update = (ctx, next) => {
        ctx.body = "修改用户信息"
    }

    user_update_pass = (ctx, next) => {
        ctx.body = "修改用户密码"
    }

    user_get = (ctx, next) => {
        ctx.body = "获取用户信息"
    }
}

module.exports = new UserController()
