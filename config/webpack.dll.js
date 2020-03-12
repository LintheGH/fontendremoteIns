const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    vendor: ['lodash', 'moment', 'react', 'react-dom', 'react-router-dom'], // 想要打dll的包
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    })
  ],

}