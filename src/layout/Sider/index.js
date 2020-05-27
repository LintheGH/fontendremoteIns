import React, { Component } from 'react'
import { Card } from 'antd'

import styles from './index.less'

export default class sider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };  
  }
  
  render() {
    return <div className={styles.sider}>
      <div className={`${styles.aboutMe} ${styles.card}`}>
        <Card title="Default size card" extra={<a href="#">More</a>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
      <div className={`${styles.hotArticle} ${styles.card}`}>
        <Card title="Default size card" extra={<a href="#">More</a>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
      <div className={`${styles.tags} ${styles.card}`}>
        <Card title="Default size card" extra={<a href="#">More</a>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  }
}
 