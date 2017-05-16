import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Collapse,Row,Col,Button,Input,Icon,Tabs,Steps,Pagination } from 'antd'
import styles from './index.less'
import Unresolvedmodal from './Unresolved'
import Outpoolmodal from './OutPool'
import Market from './Market'
import Evaluatemodal from './Evaluate'
// unresolvedModal


function ToClose({ probItem, location,unresolved,outpoolVisble,evaluateVisble, dispatch,marketVisble,probDetailClose, loading }){

const Panel = Collapse.Panel;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;

  function callback(key) {
    console.log(key);
  }

  function showModal(str){
       dispatch({
        type: 'probDetailClose/showModal',
        payload:{
          str:str,
        },
      })
  }
  /**
   * 未解决
   */
  const unresolvedProps = {
    item: probItem,
    visible: unresolved,
    onOk (data) {
      dispatch({
        type: 'probDetailClose/unresolved',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probDetailClose/hideModal',
      })
    },
  }

/**
   * 入池
   */
   const poolProps = {
    item: probItem,
    visible: outpoolVisble,
    onOk (data) {
      dispatch({
        type: 'probDetailClose/enterpool',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probDetailClose/hideModal',
      })
    },
  }

  /**
   * 入集市
   */
  const marketProps = {
    item: probItem,
    visible: marketVisble,
    onOk (data) {
      dispatch({
        type: 'probDetailClose/enterMarket',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probDetailClose/hideModal',
      })
    },
  }

  /**
   * 评价
   */
  const evaluateProps = {
    item: probItem,
    visible: evaluateVisble,
    onOk (data) {
      dispatch({ 
        type: 'probDetailClose/outEvaluate',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probDetailClose/hideModal',
      })
    },
  }


  function onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }
  console.log(probItem)
  return (
    <div className="content-inner">
      <div className={styles.buttonPanel}>
        <Row gutter={24}>
             {
              (probItem.probStatus == '待关闭')?
              <Button type="primary" onClick={e => showModal('6')}>已解决</Button>
              :null
             }

             {
              (probItem.probStatus == '待关闭' ,probItem.isProbMarket == '0')?
              <Button type="primary" onClick={e => showModal('3')}>未解决</Button>
              :null
             }
             {
              
              (probItem.probStatus == '待关闭' ,probItem.isProbMarket == '0')?
              <Button type="primary" onClick={e => showModal('4')}>入池</Button>
              :null
             }
             {
              (probItem.probStatus == '待关闭' ,probItem.isProbMarket == '0')?
              <Button type="primary" onClick={e => showModal('5')}>入集市</Button>
              :null
             }

             <Evaluatemodal {...evaluateProps} />
          <Col span={2}>
            
            <Unresolvedmodal {...unresolvedProps} />
          </Col>
           <Col span={2}>
             
             <Outpoolmodal {...poolProps} />
          </Col>
          <Col span={2}>
            
            <Market {...marketProps} />
          </Col>
        </Row>
      </div>

      <div className={styles.textPanel}>
        <Row>
          <Col>
            <Row>
              <Col span={8} className={styles.textTitle}>{probItem.probTitle}</Col>
              <Col span={12} className={styles.textStatus}>{probItem.probStatus}</Col>
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

      <div className={styles.textPanel}>
        <Row>
          <Col>问题描述：{probItem.probDescribe}</Col>
        </Row>
      </div>

      <div className={styles.textPanel}>
        <Row>
          <Col>解决方案：{probItem.probSolution}</Col>
        </Row>
      </div>
      
      <Tabs defaultActiveKey="0" size="small">
        <TabPane  tab="显示进程" key="1">
          <Row gutter={24}>

            <Col span={8}>
              <Steps current={1}>
             {
                (probItem.probPartakelist)?(probItem.probPartakelist.map((item,index)=>{
                  return(
                   <Step key={index} status={item.partakeType} title={item.partakeUser}/>)
                })) 
                :null
              }
              </Steps>
            </Col>

            
          </Row>
        </TabPane >
        <TabPane icon={<Icon type="message" />} key="2" >
          <Row gutter={24}>
            <Col span={22}>
              <Input type="textarea" placeholder="请在这里输入您的评论..." autosize />
            </Col>
            <Col span={2} style={{ textAlign: 'right' }}><Button type="ghost">评论</Button></Col>
          </Row>
        </TabPane >
      </Tabs >

      <div>
        <Row><h3>评论列表</h3></Row>
        
          <div className={styles.textNull}>
            <Row gutter={24}>
              <Col span={22}>
                <Input type="textarea" placeholder="请在这里输入您的评论..." autosize />
              </Col>
              <Col span={2} style={{ textAlign: 'right' }}><Button type="ghost">评论</Button></Col>
            </Row>
          </div>
      </div>

      

    </div>
  )
}
function mapStateToProps(state, ownProps) {
    return {
        probItem: state.probDetailClose.probItem,
        outpoolVisble: state.probDetailClose.outpoolVisble,
        unresolved: state.probDetailClose.unresolved,
        marketVisble: state.probDetailClose.marketVisble,
        evaluateVisble: state.probDetailClose.evaluateVisble,
    };
}

export default connect(mapStateToProps)(ToClose);
