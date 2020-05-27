import React, { Component } from 'react'
import styles from './index.less'

export default class ContentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
    const {
      title='title',
      desc='desc',
      watchNum='watchNum',
      commentNum='commentNum',
      date='date'
    } = this.props
    return (
      <div className={styles.contentCard}>
        <h3 className={styles.title}>{title}</h3>
        <p>{desc}</p>
        <div className={`${styles.footerIcon} flex v-center`}>
          <div className={styles.watch}>{watchNum}</div>
          <div className={styles.comment}>{commentNum}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
    )
  }
}
