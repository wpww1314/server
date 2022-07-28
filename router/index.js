const router = require('koa-router')();
const userRouter = require("./user.router");

router.use('/users', userRouter.routes())


module.exports = router