module.exports = {
    lintOnSave: false,
    // 跨域代理设置
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://39.97.33.178',
    //       ws: true,
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': '/' // 这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
    //       }
    //     }
    //   }
    // },
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                components: '@/components',
                page: 'components/page',
                common: 'components/common',
                utils: '@/utils',
                views: '@/views'
            }
        }
    }
}