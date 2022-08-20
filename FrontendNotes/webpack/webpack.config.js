const path = require('path');

module.exports = {
    entry:"./src/main.js", //入口文件路径名称 or { main }
    output: {
        filename:'[name].js ',
        path: path.resolve('./dist/')
    }
}