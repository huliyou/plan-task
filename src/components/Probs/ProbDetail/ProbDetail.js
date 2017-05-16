import { Collapse,Modal,Row,Col,Button,Input,Upload,Icon,Tabs } from 'antd'
import CommentList from '../../CommentsSimple/CommentList'
import CommentConent from './CommentConent'
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import Config from '../../../utils/config'
import Market from './Market'
import { routerRedux,Link } from 'dva/router'
import OutPool from './OutPool'
import Handle from './Handle'
import Unresolvedmodal from './Unresolved'
import Assist from './Assist'
import Evaluate from './Evaluate'
import CheckEvaluate from './CheckEvaluate'
import TransferModal from './TransferModal'
import RecordTable from './RecordTable'

const Panel = Collapse.Panel;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

function ResProbDetail2({
  probItem,
  location,  
  postsList,
  dispatch,
  handleModalVisible,
  commentlist,
  modalVisible,
  supplementVisble,
  transferVisble,
  unresolved,
  assisVisble,
  outpoolVisble,
  marketVisble,
  evaluateVisble,
 }){
  const pathname = location.pathname.slice(1);
  console.log("dispatch------",pathname)

   console.log("location------",location)

//上传文件组件配置
const fileListProp = [];
(probItem.attList)?
 (probItem.attList.map((item,index)=>{
    const fileItem = {}
    console.log('index',index)
    console.log('item',item)
    fileItem.uid=index
    fileItem.name=item.fileName
    fileItem.status='done'
    fileItem.url=Config.baseURL
      +"/csm_prob/rest/probfile/download?fileUrl="
      +item.fileUrl+"&fileName="+item.fileName
    fileListProp.push(fileItem)
  }))
 :null
const upload = {
  action: Config.baseURL+'/csm_prob/rest/probfile/upload',
  name: 'file',
  multiple: false,
  showUploadList: true,
  //文件列表数据 
  defaultFileList: fileListProp,
  onChange({ file, fileList }) {
    switch(file.status){
      case 'uploading':
        console.log("正在上传")
        break;
      case 'done':
      const fileListMap = [];
      //resetFields();
      fileList.map((item,index)=>{
        console.log('item==='+item)
        const fileItem = {
          fileId:item.response.probFileId,
          fileName:item.response.fileName,
        }
        fileListMap.push(fileItem);
      })
      console.log("fileListMap  "+fileListMap)
      setFieldsValue({
        attList:fileListMap,
      })
      const data = {
        ...getFieldsValue(),
        //key: item.key,
      }
      console.log(data)
        message.success('文件上传完成！');
        console.log("上传完成")
        break;
      case 'error':
        console.log("上传失败")
        break;
      case 'removed':
        
        console.log("删除文件")
        break;
    }
   },
  };

  /**
   * 问题处理
   */
  const handleModalProps = {
    item: probItem,
    visible: handleModalVisible,
    onOk (data) {
      dispatch({
        type: pathname+'/updateHandle',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
      })
    },
  }


const handleMenuClick =(record,e) =>{
    if(e === '1'){
      confirm({
        title: '您确定要提交这条记录吗?',
        onOk () {
        dispatch({
        type: pathname+'/submit',
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
            type: pathname+'/delete',
            payload: record,
         })
         dispatch(routerRedux.push({
         pathname:'/probs/communicate',
           query: {
           },
        }))
        },
      })
    }
  }

/**
   * 邀请协助
   */
  const AssistModalProps = {
    item: probItem,
    visible: assisVisble,
    onOk (data) {
      dispatch({
        type: pathname+'/pleaseAssist',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
      })
    },
  }


  /**
   * 转交
   */
  const TransferModalProps = {
    item: probItem,
    visible: transferVisble,
    onOk (data) {
      dispatch({
        type: pathname+'/transfer',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
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
        type: pathname+'/enterpool',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
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
        type: pathname+'/enterMarket',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
      })
    },
  }

  /**
   * [已解决 description]
   */
  const evaluateProps = {
    item: probItem,
    visible: evaluateVisble,
    onOk (data) {
      dispatch({
        type: pathname+'/outEvaluate',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
      })
    },
  }

 /**
   * 未解决
   */
  const unresolvedProps = {
    item: probItem,
    visible: unresolved,
    onOk (data) {
      dispatch({
        type: pathname+'/unresolved',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
      })
    },
  }

  /**
   * 问题处理
   */
  const userModalProps = {
    item: probItem,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: pathname+'/updateHandle',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: pathname+'/hideModal',
      })
    },
  }


/**
 * [callback 点击解决方案 操作记录 评价 ]
 */
function callback(key) {
   switch(key){
      case '1':
        //dispatchTo('colsed');
        break;
      case '2':
        dispatchTo('record');
        break;
      case '3': 
        dispatchTo('findEvaluateById');
        break;
   }
}

function dispatchTo(path){
  dispatch({
      type: pathname+`/${path}`,
      payload:{
        probId:probItem.probId
      }
    })
}


function showModal(str){
   dispatch({
    type: pathname+'/showModal',
    payload:{str:str},
  })
}
//加载评论数据
function collapseChange(){
   dispatch({
    type: pathname+'/queryCommentList',
    payload: {
      probId: probItem.probId,
    }
  })
}
  return(
    <div className="content-inner">
      <div className={styles.buttomLine}>
        <Row>
          <Col span={14}>
            <Row className={styles.title}>{probItem.probTitle}</Row>
            <Row>
              <Col span={3}>{probItem.presentUser}</Col>
              <Col span={9}>创建于  {probItem.presentDateStr}</Col>
              <Col span={12} className={styles.textStatus}>{probItem.probStatus}</Col>
            </Row>
          </Col>
            {
              (probItem.probStatus==='处理中')
              ?
              <Row gutter={24}>
                <Col span={12}></Col>
                <Col span={4}>
                  <Button type="primary" onClick={e => showModal('1')}>处理问题</Button>
                  <Handle {...handleModalProps} />
                </Col>
                <Col span={4}>
                  <Button type="primary" onClick={e => showModal('2')}>转交</Button>  
                  <TransferModal {...TransferModalProps} />
                </Col>
                <Col span={4}>
                  <Button type="primary" onClick={e => showModal('7')}>邀请协助</Button>  
                  <Assist {...AssistModalProps} />
                </Col>
              </Row>
              : null
            }
            {
              (probItem.probStatus==='待关闭')
              ?
                <Row gutter={24}>
                 <Col span={12}></Col>
                <Col span={3}>
                   <Button type="primary" onClick={e => showModal('6')}>{"  "}已解决</Button>
                   <Evaluatemodal {...evaluateProps} />
                </Col>
                <Col span={3}>
                  <Button type="primary" onClick={e => showModal('3')}>{"  "}未解决</Button>
                  <Unresolvedmodal {...unresolvedProps} />
                </Col>
                 <Col span={3}>
                 {"  "}
                   <Button type="primary" onClick={e => showModal('4')}>{"  "}入池</Button>
                   <Outpoolmodal {...poolProps} />
                </Col>
                <Col span={3}>
                {"  "}
                  <Button type="primary" onClick={e => showModal('5')}>{"  "}入集市</Button>
                  <Market {...marketProps} />
                </Col>
              </Row>
              :null
            }

            {
              (probItem.probStatus==='待提交')
              ?
               <Row gutter={24} >
                <Col span={14}></Col>
                <Col span={5}>
                  <Button type="primary" onClick={e => handleMenuClick(probItem.probId,'1')}>提交</Button> 
                <Col span={5}>
                </Col>
                  <Button type="primary" onClick={e => handleMenuClick(probItem.probId,'2')}>删除</Button> 
                </Col>
              </Row>
              :null
            }   
        </Row>
      </div>
      <Collapse className="customPanelWrapStyle" defaultActiveKey={['1','2','3']} onChange={collapseChange}>
        <Panel className="customPanelStyle" header="字段" key="1" >
           <Row gutter={24} className={styles.row}>
              <Col span={2}>问题来源：</Col>
              <Col span={6}>{probItem.prjId} </Col>
              <Col span={2}>负责人：</Col>
              <Col span={6}>{probItem.solveUser} </Col>
              <Col span={2}>紧急程度：</Col>
              <Col span={6}>{probItem.probLevel} </Col>
           </Row>
           <Row gutter={24} className={styles.row}>
              <Col span={2}>截止时间：</Col>
              <Col span={6}>{probItem.dueDate} </Col>
              <Col span={2}>提出单位：</Col>
              <Col span={6}>{probItem.presentOrg} </Col>
              <Col span={2}>提出部门：</Col>
              <Col span={6}>{probItem.presentDept} </Col>
           </Row>
        </Panel>
        <Panel className="customPanelStyle" header="内容" key="2">
          <Row>
            <Col span={2}>问题描述：</Col>
            <Col span={22}><Input type="textarea" rows={4} />
            </Col>
          </Row>
          <Row className={styles.header}>
            <Col span={2}>附件：</Col>
            <Col span={22}>
              <Upload {...upload}>
                {
                  (probItem.probStatus==='处理中')
                  ?
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                  :
                  null
                }
              </Upload>
            </Col>
          </Row>
        </Panel>
        <Panel header="问题处理" key="3" className="customPanelStyle">
          <Tabs defaultActiveKey="1" onChange={callback} className={styles.header}>
            <TabPane tab="解决方案" key="1">{probItem.probSolution}</TabPane>
            <TabPane tab="操作记录" key="2">
              <RecordTable item={postsList}/>
            </TabPane>
            <TabPane tab="评价" key="3">
              <CheckEvaluate item={postsList}/>
            </TabPane>
          </Tabs>
        </Panel>
        <Panel header="讨论区" key="4" onClick={collapseChange} className="customPanelStyle">
         <CommentList dataSource={commentlist} status='init'/>
        </Panel>
      </Collapse>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
    return {
        handleModalVisible: state.resprob_detail.handleModalVisible,
        marketVisble: state.resprob_detail.marketVisble,
        outpoolVisble: state.resprob_detail.outpoolVisble,
        unresolved: state.resprob_detail.unresolved,
        evaluateVisble: state.resprob_detail.evaluateVisble,
        postsList: state.resprob_detail.postsList,
        probItem: state.resprob_detail.probItem,
        commentlist:state.resprob_detail.commentlist,
        modalVisible:state.resprob_detail.modalVisible,
        transferVisble:state.resprob_detail.transferVisble,
        assisVisble:state.resprob_detail.assisVisble,
        pagination:state.resprob_detail.pagination,
   };
}

export default connect(mapStateToProps)(ResProbDetail2);