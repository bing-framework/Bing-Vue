'use strict'
const path = require('path')
const _root = path.resolve(__dirname, '..')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

/**
 * 获取根目录
 * @param {*} args 参数
 */
function root(args) {
    args = Array.prototype.slice.call(arguments, 0)
    return path.join.apply(path, [_root].concat(args))
}

/**
 * 是否有进度状态
 * @param {*} flag 标识
 */
function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1
}

/**
 * 是否Webpack开发服务器
 */
function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
}

/**
 * 设置资源路径
 * @param {*} _path 路径
 */
function assetsPath(_path) {
    const assetsSubDirecotry = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirecotry, _path)
}

/**
 * 获取Css样式加载器
 * @param {*} options 配置项
 */
function cssLoaders(options) {
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    /**
     * 生成加载器
     * @param {*} loader 加载器前缀，例如：css
     * @param {*} loaderOptions 加载器配置项
     */
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCss ? [cssLoader, postcssLoader] : [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // 指定该选项时提取css（例如：生产环境）
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

/**
 * 获取Style样式加载器（为除.vue之外的文件，独立样式文件生成加载器）
 * @param {*} options 配置项
 */
function styleLoaders(options) {
    const output = []
    const loaders = cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

/**
 * 创建通知回调事件
 */
function createNotifierCallback() {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') {
            return
        }

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

exports.root = root
exports.hasProcessFlag = hasProcessFlag
exports.isWebpackDevServer = isWebpackDevServer
exports.assetsPath = assetsPath
exports.cssLoaders = cssLoaders
exports.styleLoaders = styleLoaders
exports.createNotifierCallback = createNotifierCallback