import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PondList from './PondList'
import PondFilter from './PondFilter'
import PondModal from './PondModal'
import CreateProbs from '../../../components/Probs/CreateProbs'
import OutPool from './OutPool'

function Pond({ location, dispatch, pond, loading }) {
  const { list, pagination, currentItem,tableData, modalVisible, dictItems,solveUser,outModalVisible, modalType, isMotion } = pond
  const { field, keyword } = location.query


//问题出池弹窗
  const userOutPool = {
    item:currentItem,
    type: modalType,
    visible: outModalVisible,
    onOk (data) {
      dispatch({
        type: `pond/outpool`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'pond/hideModal', 
        payload: {
          modalType: 'outPool',
        },
      })
    },
  }

  const onOk = (data)=>{
    dispatch({        
      type: `pond/${modalType}`,
      payload: data,
    })
  }

  const onCancel = ()=>{
    dispatch({
      type: 'pond/hideModal',
      payload: {
        modalType: 'create',
      },
    })
  }

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
     onOutPool (item) {
      dispatch({
        type: 'pond/showModal',
        payload: {
          modalType: 'outpool',
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'pond/delete',
        payload: id,
      })
    },
  }

  const userFilterProps = {
    field,    
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/probs/pond',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/probs/pond',
      }))
    },
    onAdd () {
      dispatch({
        type: 'pond/findByProb',
        payload: {
          modalType: 'create',
          probId :''
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'pond/switchIsMotion' })
    },
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
  const PoolModalGen = () =>
    <OutPool {...userOutPool} />

  return (
    <div className="content-inner">
      <PondFilter {...userFilterProps} />
      <PondList {...userListProps} />
      <CreateProbModalGen />
      <PoolModalGen />
    </div>
  )
}

Pond.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}  

export default connect(({ pond, loading }) => ({ pond, loading: loading.models.pond }))(Pond)
