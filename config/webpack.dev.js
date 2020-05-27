const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./index')
const webpackMerge = require('webpack-merge')
const customConfig = require('./custom')

module.exports = webpackMerge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: customConfig.devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热替换
  ],
  plugins: [
    
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 
        {
          loader: 'css-loader',
          options: {
            modules: { // 使用css modules
              localIdentName: '[name]__[local]-[hash:base64:5]'
            }, // 编译后的命名规则
           }
        }, 
        {// 开发环境需要css热刷新，此处需要用style-loader
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')] // 添加浏览器前缀
          }
        }] 
      },
      {
        test: /\.less$/,
        exclude: /node_modules|common\.less/,
        use: [
          'style-loader',// 开发环境需要css热刷新，此处需要用style-loader
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]-[hash:base64:5]',
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')] // 添加浏览器前缀
            }
          }, 
          'less-loader',
        ]
      },
      { // 不能用css modules 来处理 antd 的less文件，需要单独处理
        test: /\.less$/,
        include: /antd|common\.less/,
        use: [
          'style-loader',// 开发环境需要css热刷新，此处需要用style-loader
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'hack': `true; @import "~@public/style/antd.variable.less";`, // Override with less file
              },
              javascriptEnabled: true,
            }
          }
        ]
      },
    ]
  }
})