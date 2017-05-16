import React, { PropTypes } from 'react'
import { Table, Modal } from 'antd'
import styles from './UserList.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'


const confirm = Modal.confirm

function Datalist ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem,onShowProcAssociation, isMotion, location }) {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
    	 onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.procId)
        },
      })
    }else if(e.key==='3'){
    	onShowProcAssociation()
       }
  }
  const columns = [
    {
      title: '编号',
      dataIndex: 'themeCode',
      key: 'themeCode',
    }, {
      title: '标题',
      dataIndex: 'planName',
      key: 'planName',
    },  {
      title: '类型',
      dataIndex: 'phaseAct',
      key: 'phaseAct',
    }, {
      title: '流程状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
//      render: (text) => <span>{text
//            ? '男'
//            : '女'}</span>,
    }, {
      title: '负责人',
      dataIndex: 'pduty',
      key: 'pduty',
    }, {
      title: '时间',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' },{ key: '3', name: '关联任务' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
	page: location.query.page,
	current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

   
  
  return (
    <div>
      <Table
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

  Datalist.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onShowProcAssociation: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default Datalist
