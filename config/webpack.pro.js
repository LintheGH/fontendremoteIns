const webapck = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackConfig = require('./index')
const optimizationCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = webpackMerge(webpackConfig, {
  mode: 'production',
  plugins: [
    // 提取css为单独文件
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].css'
    }),
    // 拷贝静态资源文件到打包后到相同目录，防止打包后引入到静态文件找不到
    new copyWebpackPlugin([
      {from: path.join(__dirname, '../static'), to: path.join(__dirname, '../dist/static')}
    ]),
  ],
  optimization: {
    minimizer: [
      // 压缩js
      new uglifyJsPlugin({
        cache:true, // 文件缓存
        parallel:true, // 启用多线程打包，加快打包速度
        sourceMap:true, // 源码定位，设置为true会生成.map文件，记录每个源码的位置，浏览器可以定位具体错误位置， 缺省false
      }),
      new optimizationCssAssetsWebpackPlugin(), // 压缩css
    ],
    splitChunks: {
      // 提取公共模块（待定）
      // cacheGroups: {
      //   vendor: {   // 抽离第三方插件
      //     test: /node_modules/,   // 指定是node_modules下的第三方包
      //     chunks: 'initial',
      //     name: 'vendor',  // 打包后的文件名，任意命名    
      //     // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
      //     priority: 10
      //   },
      //   utils: {
      //     // 抽离自己写的公共代码，utils里面是一个公共类库
      //     chunks: 'initial',
      //     name: 'utils',  //  任意命名
      //     minSize: 0    // 只要超出0字节就生成一个新包
      //   }
      // }
      chunks:'all',
      cacheGroups:{
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }, 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader,'css-loader',// 需要配合mincssextractplugin分离css
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')] // 添加浏览器前缀
            }
          }
        ] 
      },
      {
        test: /\.less$/,
        use: [ 
          MiniCssExtractPlugin.loader,// 需要配合mincssextractplugin分离css
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