const router = require('koa-router')();
const {
    user_login,
    user_register,
    user_update,
    user_update_pass,
    user_get
} = require("../controller/user.controller")

// 用户登录路由
router.post('/login', user_login)

// 用户注册路由
router.post("/register", user_register)

// 用户更新信息路由
router.put("/", user_update)

// 用户更新密码路由
router.patch("/", user_update_pass)

// 获取用户信息路由
router.get("/:id", user_get)

module.exports = router