'use strict'
const path = require('path')

module.exports = {
    dev: {
        /**
         * 资源子目录，除了index.html，其余的js、img、css都分在这里
         */
        assetsSubDirectory: 'static',
        /**
         * 项目根目录
         */
        assetsPublicPath: '/',
        proxyTable: {},
        host: 'localhost',
        port: 9000,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'eval-source-map',
        cacheBusting: true,
        cssSourceMap: false,
    },
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        /**
         * 构建输出目录
         */
        assetsRoot: path.resolve(__dirname, '../dist'),
        /**
         * 资源子目录，除了index.html，其余的js、img、css都分在这里
         */
        assetsSubDirectory: 'static',
        /**
         * 项目根目录
         */
        assetsPublicPath: '/',
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}