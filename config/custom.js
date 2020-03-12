
const path = require('path')
module.exports = {
  devServer: {
    historyApiFallback: true,
    compress: true,
    inline: true,
    disableHostCheck: true,
    port: 3000, // 端口
    hot: true, // 热更新
    overlay: true, // 页面上显示错误信息
    open: false, // 打开浏览器
    proxy: {
      '/api': {
        target: 'http://134.175.149.204',
        changeOrigin: true,
        secure: false,
      }
    },
    // ws: true,
    stats: {
        // 添加缓存（但未构建）模块的信息
        cached: true,
        // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
        cachedAssets: true,
        // 添加 children 信息
        children: true,
        // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunks: true,
        // 将构建模块信息添加到 chunk 信息
        chunkModules: true,
        // `webpack --colors` 等同于
        colors: true,
        // 添加 --env information
        env: false,
        // 添加错误信息
        errors: true,
        // 添加错误的详细信息（就像解析日志一样）
        errorDetails: true,
        // 添加 compilation 的哈希值
        hash: false,
        // 添加构建模块信息
        modules: true,
        // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
        performance: true,
        // 添加时间信息
        timings: true,
        // 添加警告
        warnings: true
    }
  },
  alias: { // 化名 
    '@src': path.join(__dirname, '../src'), 
    '@pages': path.join(__dirname, '../src/pages'),
    '@public': path.join(__dirname, '../src/public'),
    '@components': path.join(__dirname, '../src/components'),
    '#tools': path.join(__dirname, '../src/public/tools.js'),
    '#utils': path.join(__dirname, '../src/public/utils.js')
  },
}