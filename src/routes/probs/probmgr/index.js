import React, { PropTypes } from 'react';
import { routerRedux,Link } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Tabs, Menu, Dropdown, Button, Select, Input,Pagination  } from 'antd';
import ProbmgrFilter from './ProbmgrFilter';
import ProbmgrModal from './ProbmgrModal';
import ProbsListBody from '../../../components/ProbList/ProbListBoby';
import CreateProbs from '../../../components/Probs/CreateProbs';
function Probmgr({
    location,
    dictItems,
    solveUser,
    modalVisible,
    postsList,
    closedList,
    recommendList,
    pagination,
    dispatch,
}){
  const { field, keyword } = location.query
  const TabPane = Tabs.TabPane;
  function callback(key) {
     switch(key){
        case '2':
          dispatchTo('colsed');
          break;
        case '3':
          dispatchTo('recommend');
          break;
        case '1': 
          dispatchTo('query');
          break;
     }
  }

  function dispatchTo(pathname){
    dispatch({
        type: `probmgr/${pathname}`,
      })
  }

  const userModalProps = {
    item: {},
    dictItems:dictItems,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: 'probmgr/create',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'probmgr/hideModal',
      })
    },
  }

  const userFilterProps = {
    field,
    keyword,
    onSearch (fieldsValue)
      {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/probmgr',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/probmgr',
      }))
    },
    onAdd () {
      dispatch({
        type: 'probmgr/findByProb',
        payload:{
          probId:''
        }
      })
    },
  }

  function onChange(current, pageSize) {
    const { query, pathname } = location
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        page:current,
        pageSize: pageSize,
      },
    }))
  }

  function onChangeClosed(current, pageSize) {
    const { query, pathname } = location
    dispatch({
        type: 'probmgr/colsed',
        payload: {
          page:current,
          pageSize: pageSize,
        },
    })
    /*dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        page:current,
        pageSize: pageSize,
      },
    }))*/
  }

  //定义新建问题页面弹窗参数 {开始}
  const onOk = (data)=>{
    dispatch({        
      type: `probmgr/${modalType}`,
      payload: data,
    })
  }

  const onCancel = ()=>{
    dispatch({
      type: 'probmgr/hideModal',
      payload: {
        modalType: 'create',
      },
    })
  }
  const CreateProbModalGen = () =>
    <CreateProbs 
        item={{}}
        type={'create'}
        dictItems={dictItems}
        solveUser={solveUser}
        visible={modalVisible}
        onCancel={onCancel}
        onOk={onOk}
     />
  //定义新建问题页面弹窗参数 {结束}


 return ( 
    <div className="content-inner" style={{ minHeight:500 }}>
      <Row>
        <ProbmgrFilter {...userFilterProps} />
      </Row>
      <Row>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="待办事项" key="1">
          {/*
            问题Card列表
          */}
          <ProbsListBody
            probsList={postsList}
            pathname='/prob_detail/in_process'
          />
         <Pagination 
             showSizeChanger 
             defaultCurrent={1}  
             onShowSizeChange={onChange}
             onChange={onChange} 
             defaultCurrent={pagination.current} 
             total={pagination.total}
           />
          </TabPane>
          <TabPane tab="已关闭" key="2">
            <ProbsListBody
                probsList={closedList}
                pathname='/prob_detail/in_process'
              />
              <Pagination 
                  showSizeChanger 
                  defaultCurrent={1}  
                  onChange={onChangeClosed}
                  onShowSizeChange={onChangeClosed}
                  defaultCurrent={pagination.current} 
                  total={pagination.total}
                  />
          </TabPane>
          <TabPane tab="推荐" key="3">
             <ProbsListBody
                probsList={recommendList}
                pathname='/prob_detail/in_process'
              />
              <Pagination 
                  showSizeChanger 
                  defaultCurrent={1}  
                  onChange={onChangeClosed}
                  onShowSizeChange={onChangeClosed}
                  defaultCurrent={pagination.current} 
                  total={pagination.total}
                  />
          </TabPane>
        </Tabs>
      </Row>
        <CreateProbModalGen />
    </div>
  )
}

Probmgr.propTypes = {
    recommendList: PropTypes.array.isRequired,
    postsList: PropTypes.array.isRequired,
    closedList:PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        recommendList: state.probmgr.recommendList,
        postsList: state.probmgr.postsList,
        modalVisible:state.probmgr.modalVisible,
        pagination: state.probmgr.pagination,
        closedList:state.probmgr.closedList,
        dictItems:state.probmgr.dictItems,
        solveUser:state.probmgr.solveUser,
    };
}

export default connect(mapStateToProps)(Probmgr);