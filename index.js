const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const config = require("./config/default.config");

const app = new Koa();

app.use(bodyParser({
    formLimit: '1mb'
}))
app.use(require("./router/index").routes());

app.listen(config.port, () => {
    console.log(`服务器已启动 http://localhost:${config.port}`);
})