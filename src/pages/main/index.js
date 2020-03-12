import React from 'react'
import {Prompt} from 'react-router-dom'

import './index.less'
class Main extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  leave = () => {
    this.props.router.push({
      pathName: '/main'
    })
  }

  render() {

    return <div className={'main-page'}>
      this is main page
      <button onClick={this.leave}>leave</button>
      <Prompt 
        message={'Are you sure to leave?'}
      />
    </div>
  }
}

export default Main