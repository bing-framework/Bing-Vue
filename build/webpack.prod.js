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
const WebpackMd5Hash = require('webpack-md5-hash')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env')

const webpackConfig = merge(commonWebpackConfig, {
    mode: 'production',// Webpack4 属性
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: chunk => (
                        chunk.resource &&
                        /\.js$/.test(chunk.resource) &&
                        /node_modules/.test(chunk.resource)
                    ),
                    chunks: 'initial',
                    name: 'vendors'
                },
                'async-vendors': {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    chunks: 'async',
                    name: 'async-vendors'
                }
                // styles:{
                //     test:/\.(css|scss)$/,
                //     name:'styles',
                //     chunks:'all',
                //     enforce:true
                // }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
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
            filename: helpers.assetsPath('css/[name].[chunkhash].min.css'),
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
            filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // 必须通过CommonChunkPlugin一致地处理多个块
            chunksSortMode: 'dependency'
        }),
        // 当模块不变时，保持module.id的稳定
        new webpack.HashedModuleIdsPlugin(),
        // 启用范围提升
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 将 vendor.js 分割成它自己的文件
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks(module) {
        //         // node_modules 内部的所有必需模块提取到 vendor.js
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),
        // 将 webpack 运行时和模块清单提取到其自己的文件中，以防止更新应用程序包时更新 vendor 哈希值
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks: Infinity
        // }),
        // 此实例从代码拆分块中提取共享代码块，并将它们捆绑在单独的代码块中，类似于 vendor.js 块
        // 请参阅: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'app',
        //     async: 'vendor-async',
        //     children: true,
        //     minChunks: 3
        // }),
        // // 复制自定义静态资源文件
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: config.build.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ]),
        new WebpackMd5Hash()
    ]
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig