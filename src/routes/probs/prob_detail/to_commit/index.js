import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Collapse,Row,Col,Button,Icon,Steps } from 'antd'
import styles from './index.less'

function ToCommit({ location, dispatch, comment, loading }){

const Panel = Collapse.Panel;
const Step = Steps.Step;
const handleMenuClick = (e) =>{
  if(e === '1'){
    alert('1')
  }else if(e === '2'){
    alert('2')
    confirm({
      title:'您？',
    })
  }
}

  const list = [{ 

  }]

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="content-inner">
      <div className={styles.buttonPanel}>
        <Row gutter={24}>
          <Col span={2}><Button type="ghost" onClick={e => handleMenuClick('1')}>提交</Button></Col>
          <Col span={2}><Button type="ghost" onClick={e => handleMenuClick('2')}>删除</Button></Col>
          <Col span={20}></Col>
        </Row>
      </div>

      <div className={styles.textPanel}>
        <Row>
          <Col>
            <Row>
              <Col span={8} className={styles.textTitle}>我是标题</Col>
              <Col span={12} className={styles.textStatus}>待提交</Col>
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
      <Collapse bordered={false} defaultActiveKey="0" size="small">
        <Panel header="显示进程" key="1">
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
        </Panel>
      </Collapse>
      </div>
      
    </div>
  )
}

export default ToCommit;