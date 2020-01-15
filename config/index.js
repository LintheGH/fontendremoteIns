const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const devMode = process.argv.indexOf('config/webpack.dev.js') // 所执行脚本命令后传入的参数检索config/webpack.dev.js（开发环境配置文件， 匹配则说明是开发环境）

module.exports = {
  mode: 'development',
  entry: {
    index: ['@babel/polyfill', path.join(__dirname, '../src/index.js')], // babel默认只转换新javascript语法，而不会转换新api，如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise，因此需要添加babel-polyfill, 除此用法之外，可以在入口文件直接 import '@babel/polyfill'
    // 多入口文件，生成多页面
    // header: path.join(__dirname, '../src/header.js'),
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, '../dist')
  }, 
  resolve: {
    alias: { // 化名 
      '@pages': path.join(__dirname, '../src/pages'),
      '@public': path.join(__dirname, '../src/public'),
      '@components': path.join(__dirname, '../src/components'),
      '#tools': path.join(__dirname, '../src/public/tools.js'),
      '#utils': path.join(__dirname, '../src/public/utils.js')
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.less'], // 省略后缀
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),
      filename: 'index.html', // 文件名， 可以设置子集： subdirector/index.html
      chunks: ['index'] // 这里引入需要的文件，此处与入口文件对应
    }),
    // 多页面配置，生成多个HtmlWebpackPlugin实例即可
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, '../header.html'),
    //   filename: 'header.html',
    //   chunks: ['header'] // 这里引入需要的文件，此处与入口文件对应
    // }),

    // 每次打包前清除dist内容
    new CleanWebpackPlugin(),

    // 打包分析
    // new BundleAnalyzerPlugin({
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: '8899'
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js/i,
        use: [{ // 配置babel， 如果babel扩展过多，可以使用项目packjson同目录的.babelrc文件中
          loader: 'babel-loader', // babel编译es6
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react', // 编译react（jsx）
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime", // babel辅助函数提取为独立的babel-runtime,减少项目体积
                // {
                //   "absoluteRuntime": false,
                //   "corejs": false,
                //   "helpers": true,
                //   "regenerator": true,
                //   "useESModules": false,
                // }
              ]
            ]
          },
        }],
        exclude:/node_modules/
      },
      {
        test: /\.(jpe?g|gif|png)$/i, // 图片
        use: [{
          loader: 'url-loader',
          options: {
            limited: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name][hash:8].[ext]'
              }
            }
          }
        }],
        exclude: /node_modules/ // 优化webpack搜索，减少打包时间
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/i,// 媒体文件
        use: [{
          loader: 'url-loader',
          options: {
            limited: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name][hash:8].[ext]'
              }
            }
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(woff2|eot|ttf|otf)(\?.*)?$/i, // 字体文件
        use: [{
          loader: 'url-loader',
          options: {
            limited: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'font/[name][hash:8].[ext]'
              }
            }
          }
        }],
        exclude: /node_modules/
      }
    ]
  }
}