'use strict'
const helpers = require('./helpers')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')

const webpackConfig = merge(commonWebpackConfig, {
    // 使用 karma-sourcemap-loader 的内联源码映射
    module: {
        rules: helpers.styleLoaders()
    },
    devtool: '#inline-source-map',
    resolveLoader: {
        alias: {
            // 在使用 vue-loader 的注入选项时，需要使 lang='scss'在测试中工作
            // 请参阅：https://github.com/vuejs/vue-loader/issues/724
            'scss-loader': 'sass-loader'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/test.env')
        })        
    ]
})

// 测试期间无需输入 应用程序
delete webpackConfig.entry

module.exports = webpackConfig