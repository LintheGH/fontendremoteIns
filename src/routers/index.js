import React from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'
// import Layout from '@src/layout'
// import Main from '@pages/main'

import asyncImport from './asyncImport'

// 通过react 提供的 api 进行组件的按需加载，配合webpack实现代码分割

const Layout = asyncImport(React.lazy(() => import('@src/layout')))
const Main = asyncImport(React.lazy(() => import('@pages/main')))
const Login = asyncImport(React.lazy(() => import('@pages/Login')))
const Page1 = asyncImport(React.lazy(() => import('@pages/Page1')))

const Root = () => {
  return <HashRouter> 
  <Route
    path="/"
    render={(props) => (
      <Layout>
        <Switch>
          <Route exact key={'Main'} path="/main" component={Main}/>
          <Route exact key={'Login'} path="/login" component={Login}/>
          <Route exact key={'Page1'} path="/page1" component={Page1}/>
        </Switch>
    </Layout>
    )}
  > 
  </Route>
</HashRouter>
}
export default Root