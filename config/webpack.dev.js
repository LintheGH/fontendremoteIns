const webpack = require('webpack')
const webpackConfig = require('./index')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3000, // 端口
    hot: true, // 热更新
    overlay: true, // 页面上显示错误信息
    historyApiFallback: true,
    open: true, // 打开浏览器
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热替换
  ],
  plugins: [
    
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader', {// 开发环境需要css热刷新，此处需要用style-loader
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')] // 添加浏览器前缀
          }
        }] 
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',// 开发环境需要css热刷新，此处需要用style-loader
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')] // 添加浏览器前缀
            }
          }, 
          'less-loader'
        ]
      },
    ]
  }
})