import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ResponList from './ResponList'
import ResponFilter from './ResponFilter'
import ResponModal from './ResponModal'
import CreateProbs from '../../../components/Probs/CreateProbs'

function Responsible ({ location, dispatch, responsible, loading }) {
  const { list, pagination, currentItem, modalVisible,solveUser,dictItems, modalType, isMotion } = responsible
  const { field, keyword } = location.query

  //定义新建问题页面弹窗参数 {开始}
  const onOk = (data)=>{
    dispatch({        
      type: `responsible/${modalType}`,
      payload: data,
    })
  }

  const onCancel = ()=>{
    dispatch({
      type: 'responsible/hideModal',
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
        type: 'responsible/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'responsible/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
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
        pathname: '/probs/responsible',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/probs/responsible',
      }))
    },
    onAdd () {
      dispatch({
        type: 'responsible/findByProb',
        payload: {
          modalType: 'create',
          probId:''
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'responsible/switchIsMotion' })
    },
  }


  return (
    <div className="content-inner">
      <ResponFilter {...userFilterProps} />
      <ResponList {...userListProps} />
      <CreateProbModalGen />
    </div>
  )
}

Responsible.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}  

export default connect(({ responsible, loading }) => ({ responsible, loading: loading.models.responsible }))(Responsible)
