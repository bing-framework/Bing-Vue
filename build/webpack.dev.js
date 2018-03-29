'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const config = require('../config')
const commonWebpackConfig = require('./webpack.common')
const helpers = require('./helpers')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const url = `http://${HOST}:${PORT}/`

const devWebpackConfig = merge(commonWebpackConfig, {
    mode: 'development',// Webpack4 属性
    module: {
        rules: helpers.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCss: true })
    },
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        contentBase: false,//由于使用 CopyWebpackPlugin 因此将其设置为false
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true,//友好错误提示插件必须
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),//HMR 在更新控制台上显示正确的文件名。
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // // 复制静态资源文件
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: config.dev.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ]),
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // 发布e2e测试所需的新端口
            process.env.PORT = port
            // 添加端口到 devServer 配置
            devWebpackConfig.devServer.port = port

            // 添加友好错误提示插件
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`应用运行地址：http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors ? helpers.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})