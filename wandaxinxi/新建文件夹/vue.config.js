// let config = require('./config/config');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    devServer: {
        port: 9966,
        proxy: {
            '/api': {
                target: 'http://10.1.192.118:9901',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
    }
}