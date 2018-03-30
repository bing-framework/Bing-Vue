'use strict'
const helpers = require('./helpers')
const path = require('path')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const config = require('../config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue|ts|tsx)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: config.build.assetsRoot,// 出口目录，dist文件
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,// 处理打包图片路径问题
    },
    resolve: {
        extensions: ['.ts', '.vue', '.js', '.json', '.tsx'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': helpers.resolve('src'),            
            '@components': helpers.resolve('src/components'),
            'assets':helpers.resolve('src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            // {
            //     test: /\.ts$/,
            //     loader: 'ts-loader',
            //     include: [
            //         resolve('src'),
            //         resolve('test'),
            //     ],
            //     options: {
            //         transpileOnly: true,
            //         appendTsxSuffixTo: [/\.vue$/]
            //     }
            // },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client')
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    name: helpers.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    name: helpers.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    name: helpers.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // 阻止Webpack注入无用的setImmediate填充，因为Vue源码包含它（尽管只在本地使用时才会使用它。）
        setImmediate: false,
        // 组织Webpack将模拟注入到对客户端没有意义的节点本地模块中
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
