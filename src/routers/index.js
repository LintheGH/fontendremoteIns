import React from 'react'
import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'
// import Layout from '@src/layout'
// import Main from '@pages/main'

import asyncImport from './asyncImport'

// 通过react 提供的 api 进行组件的按需加载，配合webpack实现代码分割

const Layout = asyncImport(React.lazy(() => import('@src/layout')))
const Main = asyncImport(React.lazy(() => import('@pages/main')))
const Login = asyncImport(React.lazy(() => import('@pages/Login')))
const NotFount = asyncImport(React.lazy(() => import('@pages/404')))

const Root = () => {
  return <HashRouter> 
  <Route
    path="/home"
    render={(props) => (
      <Layout>
        <Switch>
          <Route key="Main" exact path={'/home/main'} component={Main}/>
          <Route key="Login" exact path={'/home/login'} component={Login}/>
          <Route key='404' path={'/'} component={NotFount}/>
        </Switch>
    </Layout>
    )}
  > 
  </Route>
  <Redirect to="/home/main"/>
</HashRouter>
}
export default Root