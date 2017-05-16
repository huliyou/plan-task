import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Row,Col,Button,Icon } from 'antd'
import styles from './index.less'

function Already({ location, dispatch, comment, loading }){

  //const { list, pagination, currentItem, modalVisible, modalType, isMotion } = comment
  //const { field, keyword } = location.query

  const list = [{

  }]

  return (
    <div className="content-inner" style={{ minHeight:500 }}>

      <div className={styles.buttonPanel}>
        <Row gutter={24}>
          <Col span={2}><Button type="ghost">提交</Button></Col>
          <Col span={2}><Button type="ghost">删除</Button></Col>
          <Col span={2}><Button type="ghost">完善信息</Button></Col>
          <Col span={18}></Col>
        </Row>
      </div>

      <div className={styles.textPanel}>
        <Row>
          <Col>
            <Row>
              <Col span={8} className={styles.textTitle}>我是标题</Col>
              <Col span={12} className={styles.textStatus}>已编制</Col>
            </Row>
            <Row>
              <Col span={3}>创 建 人：王山 </Col>
              <Col span={3}>创建时间：2017-1-1</Col>
              <Col span={3}>问题来源：IRC-开发</Col>
              <Col span={3}>截止时间：2017-1-1</Col>
              <Col span={13}></Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className={styles.textNull}>
        <Row>
          <Col>这里是问题描述。这里是问题描述。这里是问题描述。</Col>
        </Row>
      </div>
      
    </div>
  )
}

export default Already;