import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux,Link } from 'dva/router';
import { Modal,Collapse,Form,Tabs,Badge,Row,Col,Button,Input,Icon,Steps,Pagination } from 'antd';
import CommentList from '../../../../components/CommentsSimple/CommentList';
import CommentConent from './CommentConent'
import styles from './index.less';
import OutPool from './Handle';
import Assist from './Assist';
import TransferModal from '../to_process/TransferModal';
const FormItem = Form.Item;
function InProcess({ 
  assisVisble,
  probItem, 
  modalVisible,
  transferVisble,
  location, 
  dispatch, 
  probDetail, 
  loading,
  commentslist,
  pagination,
}){
const confirm = Modal.confirm
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

  function callback(key) {
    console.log(key);
  }

  function showModal(str){
       dispatch({
        type: 'probDetail/showModal',
        payload:{str:str},
      })
  }
  /**
   * 问题处理
   */
  const userModalProps = {
    item: probItem,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: 'probDetail/updateHandle',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probDetail/hideModal',
      })
    },
  }

  //评论组件
  const commentProps = {
    item : probItem,
    onOk (data){
      dispatch({
        type: 'probDetail/commentSumbit',
        payload: data,
      })
    }
  }
  
  /**
   * 转交
   */
  const TransferModalProps = {
    item: probItem,
    visible: transferVisble,
    onOk (data) {
      dispatch({
        type: 'probDetail/transfer',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probDetail/hideModal',
      })
    },
  }
/**
   * 邀请协助
   */
  const AssistModalProps = {
    item: probItem,
    visible: assisVisble,
    onOk (data) {
      dispatch({
        type: 'probDetail/pleaseAssist',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probDetail/hideModal',
      })
    },
  }
  const handleMenuClick =(record,e) =>{
    if(e === '1'){
      confirm({
        title: '您确定要提交这条记录吗?',
        onOk () {
        dispatch({
        type: 'probDetail/submit',
        payload:{
           probId:record,
         }
         })
        },
      })
    }else if(e === '2'){
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          dispatch({
            type: 'probDetail/delete',
            payload: record,
         })
         dispatch(routerRedux.push({
         pathname:'/probmgr',
           query: {
           },
        }))
        },
      })
    }
  }
  
  
  function onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  return (
    <div className="content-inner">

      <div className={styles.buttonPanel}>
        <Row gutter={24}>
          <Col span={2}>
          {
            (probItem.probStatus=='处理中')?
            <Button type="primary" onClick={e => showModal('1')}>处理问题</Button>
            :null
          }
           <OutPool {...userModalProps} />
          </Col>
          <Col span={2}>
            {
              (probItem.probStatus == '处理中')?
              <Button type="primary" onClick={e => showModal('2')}>转交</Button>  
              :null
            }
            <TransferModal {...TransferModalProps} />
          </Col>
          <Col span={2}>
            {
              (probItem.probStatus == '处理中')?
              <Button type="primary" onClick={e => showModal('3')}>邀请协助</Button>  
              :null
            }
            <Assist {...AssistModalProps} />
          </Col>

          <Col span={2}>
            {
              (probItem.probStatus == '待提交')?
              <Button type="primary" onClick={e => handleMenuClick(probItem.probId,'1')}>提交</Button>  
              :null
            }
          </Col>

          <Col span={2}>
            {
              (probItem.probStatus == '待提交')?
              <Button type="primary" onClick={e => handleMenuClick(probItem.probId,'2')}>删除</Button>  
              :null
            }
          </Col>

          <Col span={18}></Col>
        </Row>
      </div>

      <div className={styles.textPanel}>
        <Row>
          <Col>
            <Row>
              <Col span={8} className={styles.textTitle}>标题： {probItem.probTitle}</Col>
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
      
      <div className={styles.box}>
      <Collapse bordered={false} defaultActiveKey={['0']}size="small">
        <Panel  header="显示进程" key="1">
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
        </Panel >
      </Collapse >
      </div>

{
  (probItem.probStatus == '待提交')?null:
      <div className={styles.box}>
      <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane icon={<Icon type="message" />} tab={<div>评论列表{"  "}  <Badge count={(commentslist.length)?commentslist.length:0} /></div>} key="1" >
          <div>
             <CommentList commentProps={commentProps} dataSource={commentslist} pagination={pagination} onChange={onChange} status='init'/>
            
          </div>
        </TabPane >
        </Tabs>
      </div>
}
    </div>
  )
}
function mapStateToProps(state, ownProps) {
  return {
    probItem: state.probDetail.probItem,
    modalVisible:state.probDetail.modalVisible,
    transferVisble:state.probDetail.transferVisble,
    commentslist:state.probDetail.commentslist,
    assisVisble:state.probDetail.assisVisble,
    pagination:state.probDetail.pagination,
  };
}

export default connect(mapStateToProps)(InProcess);
