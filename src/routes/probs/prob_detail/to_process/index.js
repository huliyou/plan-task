import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Collapse, Row, Col, Button, Input, Icon, Tabs, Steps, Pagination } from 'antd'
import CommentList from '../../../../components/CommentDetail/CommentList'
import styles from './index.less'
import TransferModal from './TransferModal'
import CompleteModal from './CompleteModal'


function ToProcess({ location, dispatch, comment, loading }){

const Panel = Collapse.Panel;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;

  //const { list, pagination, currentItem, modalVisible, modalType, isMotion } = comment
  //const { field, keyword } = location.query

  const data = {
    id:'11',
  }
  const list = [{

  }]

  function callback(key) {
    console.log(key);
  }

  function onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  return (
    <div className="content-inner" style={{ minHeight:500 }}>

      <div className={styles.buttonPanel}>
        <Row gutter={24}>
          <Col span={2}><TransferModal data = { data }/></Col>
          <Col span={2}><CompleteModal data = { data }/></Col>
          <Col span={2}><UnresolvedModal/></Col>
          <Col span={2}><Button type="ghost">邀请协助</Button></Col>
          <Col span={16}></Col>
        </Row>
      </div>

      <div className={styles.textPanel}>
        <Row>
          <Col>
            <Row>
              <Col span={8} className={styles.textTitle}>我是标题</Col>
              <Col span={12} className={styles.textStatus}>待处理</Col>
            </Row>
            <Row>
              <Col span={5}>创 建 人：{probItem.presentUser} </Col> 
              <Col span={5}>创建时间：{probItem.presentDateStr}</Col>
              <Col span={5}>问题来源：{probItem.prjId}</Col>
              <Col span={5}>截止时间：{probItem.dueDate}</Col>
              <Col span={4}></Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className={styles.textNull}>
        <Row>
          <Col>这里是问题描述。这里是问题描述。这里是问题描述。</Col>
        </Row>
      </div>

      <div className={styles.alignRight}>
      <Tabs defaultActiveKey="0" size="small">
        <TabPane  tab="显示进程" key="1">
          <Row gutter={24}>
            <Col span={4}></Col>
            <Col span={16}>
              <Steps>
                <Step status="finish" title="创建人" />
                <Step status="process" title="创建人"/>
                <Step status="process" title="创建人" />
                <Step status="process" title="创建人" />
                <Step status="wait" title="创建人" />
              </Steps>
            </Col>
            <Col span={4}></Col>
          </Row>
        </TabPane >
        <TabPane icon={<Icon type="message" />} tab="234条" key="2" >
          <Row gutter={24}>
            <Col span={22}>
              <Input type="textarea" placeholder="请在这里输入您的评论..." autosize />
            </Col>
            <Col span={2} style={{ textAlign: 'right' }}><Button type="ghost">评论</Button></Col>
          </Row>
        </TabPane >
      </Tabs >
      </div>

      <div>
        <Row><h3>评论列表</h3></Row>
        <CommentList dataSource={list} status='init'/>
          <div className={styles.textNull}>
            <Row gutter={24}>
              <Col span={22}>
                <Input type="textarea" placeholder="请在这里输入您的评论..." autosize />
              </Col>
              <Col span={2} style={{ textAlign: 'right' }}><Button type="ghost">评论</Button></Col>
            </Row>
          </div>
      </div>

      <div className={styles.alignRight}>
        <Pagination showQuickJumper defaultCurrent={1} total={200} onChange={onChange} />
      </div>

    </div>
  )
}

export default ToProcess;