import React from 'react'
import ReactDOM from 'react-dom'

import Router from './routers/index'

// import '@babel/polyfill' // 编译新JavaScript api， 此项目中已经在webpack配置的入口文件中添加处理
import '@public/style/common.less'
import '@public/style/index.less'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return <div id={'root'}>
      <Router />
    </div>
  }
}


ReactDOM.render(<Root />, document.getElementById('app'))
