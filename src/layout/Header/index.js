import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './index.less'
const { Header } = Layout

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  toHomePage = () => {
    this.props.history.push({
      pathname: '/home'
    })
  }

  render() {
    return <div className={`${styles.header}`}>
      <div className={`${styles.content} flex space-between v-center`}>
        <div className={`${styles.leftContent}`}>
          <div className={`flex v-center`}>
            <div className={`${styles.imgWrap}`}><img /></div>
            <p className={`${styles.blogName} `} onClick={this.toHomePage}>士大夫撒的</p>
          </div>
        </div>
        <div className={styles.rightContent}>
          rightContent
        </div>
      </div>
    </div>
  }
}

export default withRouter(CustomHeader)