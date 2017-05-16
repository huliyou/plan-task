import { Collapse,Modal,Row,Col,Button,Input,Upload,Icon,Tabs } from 'antd'
import CommentList from '../../../components/CommentsSimple/CommentList'
import CommentConent from './CommentConent'
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import RecordTable from './record_table'
import Evaluate from '../../../components/Probs/Evaluate'
import Config from '../../../utils/config'
import { routerRedux,Link } from 'dva/router';
import Unresolvedmodal from './to_close/Unresolved'
import Outpoolmodal from './to_close/OutPool'
import Market from './to_close/Market'
import Supplement from './Supplement'
import Evaluatemodal from './to_close/Evaluate'


const Panel = Collapse.Panel; 
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

function ProbDetail({
  probItem,
  location, 
  postsList,
  dispatch,
  commentlist,
  modalVisible,
  supplementVisble,
  transferVisble,
  unresolved,
  outpoolVisble,
  marketVisble,
  evaluateVisble,
 }){

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
      +"/csm_prob/rest/probfile/download?probId="
      +probItem.probId+"&fileName="+item.fileName
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

const handleMenuClick =(record,e) =>{
  if(e === '1'){
    confirm({
      title: '您确定要提交这条记录吗?',
      onOk () {
        dispatch({
          type: 'prob_Detail/submit',
          payload :{
            probId:record,
          },
        })
      },
    })
  }else if(e === '2'){
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk () {
        dispatch({
          type: 'prob_Detail/delete',
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

function dispatchTo(pathname){
  dispatch({
      type: `prob_Detail/${pathname}`,
      payload:{
        probId:probItem.probId
      }
    })
}


  //加载评论数据
  function collapseChange(){
   dispatch({
      type: 'prob_Detail/queryCommentList',
      payload: {
        probId: probItem.probId,
      }
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
        type: 'prob_Detail/unresolved',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'prob_Detail/hideModal',
      })
    },
  }


/**
   * 问题补充
   */
  const SupplementProps = {
    item: probItem,
    visible: supplementVisble,
    onOk (data) {
      dispatch({
        type: 'prob_Detail/supplement',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'prob_Detail/hideModal',
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
        type: 'prob_Detail/enterpool',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'prob_Detail/hideModal',
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
        type: 'prob_Detail/enterMarket',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'prob_Detail/hideModal',
      })
    },
  }
  /**
   * [已解决 description]
   * @type {Object}
   */
  const evaluateProps = {
    item: probItem,
    visible: evaluateVisble,
    onOk (data) {
      dispatch({
        type: 'prob_Detail/outEvaluate',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'prob_Detail/hideModal',
      })
    },
  }
  function showModal2(str){
     dispatch({
      type: 'prob_Detail/showModal2',
      payload:{str:str},
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
              <Col span={9}>创建于 {probItem.presentDateStr}</Col>
              <Col span={12} className={styles.textStatus}>{probItem.probStatus}</Col>
            </Row>
          </Col>
          <Col span={8}>
            {
              (probItem.probStatus==='待提交')?
               <Row gutter={24} >
                <Col span={14}></Col>
                <Col span={5}>
                <Button type="primary" onClick={e => handleMenuClick(probItem.probId,'1')}>提交</Button> 
                </Col>
                <Col span={5}>
                <Button onClick={e => handleMenuClick(probItem.probId,'2')}>删除</Button>
                </Col>
              </Row>
              : null
            }

            
            {
              (probItem.probStatus==='处理中')?
                <Row gutter={24}>
                 <Col span={19}></Col>
                <Col span={5}>
                   <Button type="primary" onClick={e => showModal2('7')}>补充</Button>
                   <Supplement {...SupplementProps}/>
                </Col>
              </Row>
              :null
            }
            {
              (probItem.probStatus==='待关闭')?
                <Row gutter={24}>
                 <Col span={12}></Col>
                <Col span={3}>
                   <Button type="primary" onClick={e => showModal2('6')}>已解决</Button>
                   <Evaluatemodal {...evaluateProps} />
                </Col>
                <Col span={3}>
                  <Button type="primary" onClick={e => showModal2('3')}>未解决</Button>
                  <Unresolvedmodal {...unresolvedProps} />
                </Col>
                 <Col span={3}>
                 {"  "}
                   <Button type="primary" onClick={e => showModal2('4')}>入池</Button>
                   <Outpoolmodal {...poolProps} />
                </Col>
                <Col span={3}>
                {"  "}
                  <Button type="primary" onClick={e => showModal2('5')}>入集市</Button>
                  <Market {...marketProps} />
                </Col>
              </Row>
              :null
            }
          </Col>
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
            <Col span={22}>
              <Input disabled value={probItem.probDescribe} type="textarea" 
                className="textDescribe" />
            </Col>
          </Row>
          <Row>
            <Col span={2}>附件：</Col>
            <Col span={22}>
              <Upload {...upload}>
                {
                  (probItem.probStatus==='待提交')
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
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="解决方案" key="1">{probItem.probSolution}</TabPane>
            <TabPane tab="操作记录" key="2">
              <RecordTable item={postsList}/>
            </TabPane>
            <TabPane tab="评价" key="3">
              <Evaluate item={postsList}/>
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
        postsList: state.prob_Detail.postsList,
        probItem: state.prob_Detail.probItem,
        commentlist:state.prob_Detail.commentlist,
        modalVisible:state.prob_Detail.modalVisible,
        transferVisble:state.prob_Detail.transferVisble,
        unresolved:state.prob_Detail.unresolved,
        outpoolVisble:state.prob_Detail.outpoolVisble,
        supplementVisble:state.prob_Detail.supplementVisble,
        marketVisble:state.prob_Detail.marketVisble,
        evaluateVisble:state.prob_Detail.evaluateVisble,
    };
}

export default connect(mapStateToProps)(ProbDetail);