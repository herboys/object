// let config = require('./config/config');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    devServer: {
        port: 9966,
        hotOnly: false,
        disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://10.1.192.120:9901',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}