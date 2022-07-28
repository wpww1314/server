const { insertUser, findUserData } = require("../libs/mysql")

class UserController {
    user_login = async (ctx, next) => {
        let { user_name, user_pass } = ctx.request.body
        await findUserData(user_name).then(user => {
            console.log(user)
            if(!user.length) {
                return ctx.body = {
                    code: 404,
                    msg: "该用户没有注册,请访问 '/user/register' 注册"
                }
            } else {
                return ctx.body = {
                    code: 200,
                    msg: "登录成功",
                    data: {
                        user_name,
                        user_pass
                    }
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    user_register = (ctx, next) => {
        ctx.body = "用户注册"
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
