
// 统一返回格式
exports.rejson = (code, msg, data = []) => {
    return {
        code,
        msg,
        data
    }
}