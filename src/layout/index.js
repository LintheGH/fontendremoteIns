import React from 'react'
import {withRouter} from 'react-router-dom'
import CssModules from 'react-css-modules'
import styles from './index.less'
import {Button} from 'antd'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    
  }

  render() {
    return <div styleName={'layout layout2 layout3'}>
        layout
        <Button type='primary'>ceshi </Button>
      {this.props.children}
    </div>
  }
}

export default withRouter(CssModules(Layout, styles, {allowMultiple: true}))