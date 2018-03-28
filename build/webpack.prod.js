'use strict'
const path = require('path')
const helpers = require('./helpers')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env')

const webpackConfig = merge(commonWebpackConfig, {
    module: {
        rules: helpers.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: helpers.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: helpers.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }),
        // 将css提取到它自己的文件中
        new ExtractTextPlugin({
            filename: helpers.assetsPath('css/[name].[contenthash].css'),
            // 如果你想从代码分割块中提取CSS到这个主要的CSS文件中，那么将下面的选项设置为'true'。这将导致你的应用程序的所有CSS都被预先加载。
            allChunks: false,
        }),
        // 压缩提取的CSS。我们使用这个插件，以便可以从不同组件中重复使用CSS。
        new OptimizeCssPlugin({
            cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
        }),
        // 生成 dist以及index.html。可以通过编辑/index.html自定义输出内容
        // 请参阅：https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename:process.env.NODE_ENV==='testing'?'index.html':config.build.index,
            template:'index.html',
            inject:true,
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // 必须通过CommonChunkPlugin一致地处理多个块
            chunksSortMode:'dependency'
        }),
        // 当模块不变时，保持module.id的稳定
        new webpack.HashedModuleIdsPlugin(),
        // 启用范围提升
        new webpack.optimize.ModuleConcatenationPlugin(),        
    ]
})