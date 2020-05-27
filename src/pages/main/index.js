import React from 'react'
import { Button } from 'antd'

import ContentCard from '@components/ContentCard'
import Modal from '@components/ModalConfirm'
import Test from '@components/ShopAdjoin'


const data = [
  { id: '1', specs: [ '紫色', '套餐一', '64G' ] },
  { id: '2', specs: [ '紫色', '套餐一', '128G' ] },
  { id: '3', specs: [ '紫色', '套餐二', '128G' ] },
  { id: '4', specs: [ '黑色', '套餐三', '256G' ] },
];
const commoditySpecs = [
  { title: '颜色', list: [ '红色', '紫色', '白色', '黑色' ] },
  { title: '套餐', list: [ '套餐一', '套餐二', '套餐三', '套餐四' ]},
  { title: '内存', list: [ '64G', '128G', '256G' ] }
]

import styles from './index.less'
class Main extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      content: '内容1',
      status: 1,
      footer: this.footers.modalFooter1,
      count: 0,
    }
  }

  leave = () => {
    this.props.history.push({
      pathname: '/home/login'
    })
  }

  contents = {
    content1: '内容1',
    content2: '内容2',
    content3: '内容3',
    content4: '内容4',
  }

  footers = {
    modalFooter1: <div className={'flex v-center h-center'}>
    <Button onClick={() => {this.cancelModal()}} style={{marginRight: 20, width: 105}}>
      取消
    </Button>
    <Button type="primary" onClick={() => {this.signUp()}} style={{ width: 105}}>
      确认
    </Button>
  </div>,

  modalFooter2: <div className={'flex v-center h-center'}>
    <Button onClick={() => {this.cancelModal()}} style={{marginRight: 20, width: 105}}>
      取消
    </Button>
    <Button type="primary" onClick={() => {this.toLogin()}} style={{ width: 105}}>
      登录
    </Button>
  </div>,
  }

  cancelModal = () => {
    this.setState({
      visible: false
    })
  }

  toLogin = () => {
    console.log('tologin')
  }

  signUp = () => {
    console.log('signup')
  }

  SetModal(context) {
    this.context = context

    this.contents = this.context.contents
    this.footers = this.context.footers

    this.setContent = function() {
      
      this.context.setState({
        visible: true,
        content: this.contents.content2,
        footer: this.footers.modalFooter2
      })
    }

  }

  openClick() { 
    let Modal = new this.SetModal(this)

    Modal.setContent()
  }

  onOk = () => {
    this.setState({
      visible: false
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
      content: '内容1'
    })
  }

  startCount = () => {
    setInterval(() => {
      this.setState({count: ++this.state.count})
    }, 1000);
  }

  render() {
    const {
      list=new Array(2).fill(1),
      visible,
      content,
      footer,
      count,
    } = this.state
    
    return <div className={styles.mainPage}>
      {/* <Button onClick={this.openClick.bind(this)}>open</Button>
      {list.map(item => {
        return <div className={styles.cardWrap}>
          <ContentCard />
        </div>
      })}
      <div>{content}</div>
      <Test count={count}/>
      <Button onClick={this.startCount}>start count</Button>
      <Modal
        content={content}
        footer={footer}
        visible={visible}
      /> */}
      <Test commoditySpecs={commoditySpecs} data={data}/>
    </div>
  }
}

export default Main