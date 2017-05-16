import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CommList from './CommList'
import CommFilter from './CommFilter'
import CommModal from './CommModal'
import CreateProbs from '../../../components/Probs/CreateProbs'

function Communicate ({ location, dispatch, communicate, loading }) {
  const { list, pagination, currentItem,dictItems,solveUser, modalVisible,modalType, isMotion } = communicate
  const { field, keyword } = location.query

  //定义新建问题页面弹窗参数 {开始}
  const onOk = (data)=>{
    dispatch({        
      type: `communicate/${modalType}`,
      payload: data,
    })
  }

  const onCancel = ()=>{
    dispatch({
      type: 'communicate/hideModal',
      payload: {
        modalType: 'create',
      },
    })
  }
  const CreateProbModalGen = () =>
    <CreateProbs 
        item={currentItem}
        type={modalType}
        dictItems={dictItems}
        solveUser={solveUser}
        visible={modalVisible}
        onCancel={onCancel}
        onOk={onOk}
     />
  //定义新建问题页面弹窗参数 {结束}

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location, 
    isMotion,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'communicate/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'communicate/findByProb',
        payload: {
          modalType: 'update',
          probId: item.probId,
        },
      })
    },
  }

  const userFilterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) { 
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/probs/communicate',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/probs/communicate',
      }))
    },
    onAdd () {
      dispatch({
        type: 'communicate/findByProb',
        payload: {
          modalType: 'create',
          probId:'',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'communicate/switchIsMotion' })
    },
  }


  return (
    <div className="content-inner">
      <CommFilter {...userFilterProps} />
      <CommList {...userListProps} />
      <CreateProbModalGen />
    </div>
  )
}

Communicate.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}  

export default connect(({ communicate, loading }) => ({ communicate, loading: loading.models.communicate }))(Communicate)
