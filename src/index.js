import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN'

import App from './routers/index'

// import '@babel/polyfill' // 编译新JavaScript api， 此项目中已经在webpack配置的入口文件中添加处理
import '@public/style/common.less'

const antdGlobalConfig = {
  componentSize: 'middle',
  locale: zh_CN
}

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return <ConfigProvider {...antdGlobalConfig}>
      <App />
    </ConfigProvider>
  }
}


ReactDOM.render(<Root />, document.getElementById('app'))
