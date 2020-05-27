import React, {useState} from 'react';
import { Modal, Button} from 'antd';

import styles from './index.less'

function ModalConfirm(props) {

  const cancelModal = () => {
    const {onCancel} = props
    onCancel&&onCancel()
  }

  const handleOk = () => {
    const {onOk} = props
    onOk&&onOk()
  }

  const {
    title=null,
    content,
    footer,
    visible,
    onOk,
    onCancel,
    className,
    width=416,
    ...other
  } = props

  return <div className={styles.modalConfirm}>
    <Modal
      title={title}
      centered
      visible={visible}
      onOk={handleOk}
      onCancel={cancelModal}
      wrapClassName={className || styles.wrap}
      footer={null}
      width={width}
    >
      <div className={styles.content}>
        <div className={styles.text}>{content?content:props.children}</div>
        {footer?footer:footer === null?null:<div className={styles.btns}>
          <Button key="back" onClick={cancelModal} style={{marginRight: 20, width: 105}}>
            取消
          </Button>
          <Button key="submit" type="primary" onClick={handleOk} style={{width: 105}}>
            确认
          </Button>
        </div>}
      </div>
    </Modal>
  </div>
}

export default ModalConfirm
