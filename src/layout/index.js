import React from 'react'
import { Layout, Affix } from 'antd';
import Header from './Header'
import Sider from './Sider'

import styles from './index.less'

const { Content } = Layout;

class Base extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    
  }  

  render() {
    return <Layout className={styles.appLayout}>
    <div className={styles.header}>
      <Header /> 
    </div>
      <div className={`${styles.mainContent} flex space-between`} >
        <div className={styles.sider}>
          <Affix offsetTop={84}>
            <Sider />
          </Affix>
        </div>
        <Content className={styles.content}>
          {this.props.children}
        </Content>
      </div>
  </Layout>
  }
}

export default Base