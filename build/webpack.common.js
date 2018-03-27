'use strict'
const helpers = require('./helpers')
const path = require('path')
const webpack = require('webpack')

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = function(options) {
    return {
        context:path.resolve(__dirname,'../'),
        entry: {
            app:'./src/main.ts'
        },
        output: {
            
        },
        resolve: {
            extensions: ['.js','.vue','.json','.ts'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@':resolve('src'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',                    
                },
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
                    include:[
                        resolve('src'),
                        resolve('test'),
                    ]
                },
                {
                    test:  /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000                        
                    }
                }
            ]
        }
    }
}