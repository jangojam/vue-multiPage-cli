const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
    plugins: [
        new uglify(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'      
            }
        })        
    ]
})