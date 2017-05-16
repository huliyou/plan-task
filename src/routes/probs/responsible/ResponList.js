import React, { PropTypes } from 'react'
import { Table, Modal, Row, Col, Button} from 'antd'
import styles from './ResponList.less'
import classnames from 'classnames'
import { routerRedux ,Link} from 'dva/router'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'


const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location }) {
 
const handleMenuClick = (record, e) => {
    if (e === '1') {
      onEditItem(record)
    } else if (e === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.probId)
        },
      })
    }
  }

 const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

  const columns = [
   {
      title: '编号',
      dataIndex: 'probCode',
      key: 'probCode',
    }, {
      title: '标题',
      dataIndex: 'probTitle',
      key: 'probTitle',
      render: (text, record)  =><Link to={{ 
        pathname: '/resprob_detail',
        query: { probId:record.probId } }}> 
       {text} </Link> ,
    }, {
      title: '类型',
      dataIndex: 'probTypeId',
      key: 'probTypeId',
    },{
      title:'流程状态',
      dataIndex:'probStatus',
      key:'probStatus',
    },{
      title: '创建时间',
      dataIndex: 'presentDateStr',
      key: 'presentDateStr',
    },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   width: 200,
    //   render: (text, record) => {
    //   return (
    //   <Row>
    //     <Col><Button onClick={e => handleMenuClick(record, '1')}>修改</Button>
    //     <Button onClick={e => handleMenuClick(record, '2')}>删除</Button></Col>
    //   </Row>
    //   )},
    // },
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
        rowSelection={rowSelection}
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

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default list
