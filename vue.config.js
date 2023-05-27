const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    configureWebpack: {
        resolve: {
            symlinks: false
        }
    },
    transpileDependencies: true,
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/api"
                }
            },
            '/oss': {
                target: 'http://localhost:8038',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/oss": "/oss"
                }
            },
        }
    }
})
