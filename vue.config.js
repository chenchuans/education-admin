const path = require('path')
const name = 'education-admin'

const webpackBaseConfig = require('./build/webpack.base.config')
const webpackDevConfig = require('./build/webpack.dev.config')
const webpackProdConfig = require('./build/webpack.prod.config')

const configure = {
    development: config => webpackDevConfig(config),
    production: config => webpackProdConfig(config)
}

module.exports = {
    parallel: false,
    outputDir: 'dist',
    productionSourceMap: false,
    publicPath: './',
    lintOnSave: process.env.NODE_ENV === 'development',
    configureWebpack: config => configure[process.env.NODE_ENV](config),
    chainWebpack: webpackBaseConfig,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, 'src/styles/_variables.scss'),
                path.resolve(__dirname, 'src/styles/_mixins.scss')
            ]
        }
    }
};

