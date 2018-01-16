const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob') // 用于获取文件路径
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require("purifycss-webpack")
const CopyWebpackPlugin= require("copy-webpack-plugin")
const ip = require("ip");
var htmlPlugin = []
// 获取入口文件
function getEntry(globPath) {
    var entries = {}
    var files = glob.sync(globPath)
    files.forEach(function(filePath){
        var name = path.basename(filePath, '.js')
        var entryPath = './' + filePath
        entries[name] = entryPath
    })
    return entries
}
// 在dist生成html
(function htmlTemplate(globPath) {
    var files = glob.sync(globPath)
    files.forEach(function(filePath){
        var name = path.basename(filePath, '.js')
        htmlPlugin.push(new HtmlWebpackPlugin({
            filename: 'html/' + name + '.html',
            template: 'src/index.html',
            chunks: [name, 'vue'],
            hash: true
        }))
        console.log(filePath)
    })
})('src/static/js/*.js')


module.exports = {
    entry: Object.assign(getEntry('src/static/js/*.js'),{
        vue: 'vue'
    }),
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].js',
        publicPath: process.env.NODE_ENV == 'env'? 'http://'+ip.address()+':1111/': 'http://public.com/test/'
        // chunkFilename: 'static/js/[id].js'

    },
    module:{
        rules: [
        //     // 抽离css(js里面的css)
        //     {
        //         test: /\.css$/,
        //         use: ExtractTextPlugin.extract({
        //             fallback: "style-loader",
        //             use: [{
        //                 loader: "css-loader"
        //             },{
        //                 loader: "postcss-loader",
        //                 options: {
        //                     plugins: [
        //                         require('autoprefixer')()
        //                     ]
        //                 }
        //             }]
        //         })
        //     },
        //     {
        //         test: /\.scss$/,
        //         use: ExtractTextPlugin.extract({
        //             use: [{
        //                 loader: "css-loader"
        //             }, {
        //                 loader: "sass-loader"
        //             },{
        //                 loader: "postcss-loader",
        //                 options: {
        //                     plugins: [
        //                         require('autoprefixer')()
        //                     ]
        //                 }
        //             }],
        //             // use style-loader in development
        //             fallback: "style-loader"
        //         })
        //    },
            // 不抽离打包到js
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    },{
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                },{
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            require('autoprefixer')()
                        ]
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[name].[hash:7].[ext]',
                            // name: '[name].[ext]',
                            outputPath: 'static/img/'
                        },
                    },
                    
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[name].[hash:7].[ext]',
                            outputPath: 'static/img/'
                        },
                    },
                    
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            // 抽离css（vue里面的css）
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {
            //         extractCSS: true
            //     }
            // },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins: htmlPlugin.concat([
        // 抽离css
        // new ExtractTextPlugin({
        //     filename:  (getPath) => {
        //     return getPath('static/css/[name].css').replace('css/js', 'css');
        //     },
        //     allChunks: true
        // }),
        // new webpack.ProvidePlugin({
        //     vue:"vue"
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            //name对应入口文件中的名字
            name:'vue',
            //把文件打包到哪里，是一个路径
            filename:"static/assets/js/vue.min.js",
            //最小打包的文件模块数
            minChunks:2
        }),
        new CopyWebpackPlugin([{
            from:__dirname+'/src/static/file',
            to:'./static/file'
        }])
    ])
}