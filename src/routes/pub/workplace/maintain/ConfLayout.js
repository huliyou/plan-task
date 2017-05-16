import React, { PropTypes } from 'react'
import {Table, Form, Input, InputNumber, Cascader, Modal, Select, DatePicker, Upload, Button, Icon  } from 'antd'
import styles from './UserList.less'
import classnames from 'classnames'
import AnimTableBody from '../../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../../components'
const FormItem = Form.Item
const Option = Select.Option;
const confirm = Modal.confirm
function Datalist ({ loading, dataSource, pagination, onCancel, onPageChange, onDeleteItem, onEditItem, isMotion, location }) {
  const columns = [
    {
        title: '地点代码',
        dataIndex: 'workplaceCode',
        key: 'workplaceCode',
        width: 80,
      }, {
        title: '地点名称',
        dataIndex: 'workplaceName',
        key: 'workplaceName',
      }, {
        title: '地点简称',
        dataIndex: 'shortName',
        key: 'shortName',
      },{
        title: '上午',
        children: [{
        	title: '上班时间',
        	dataIndex: 'amStartTime',
        	key: 'amStartTime',
          }, {
        	 title: '下班时间',
        	 dataIndex: 'amEndTime',
        	 key: 'amEndTime',
          }],
      }, {
        title: '下午',
        children: [{
        	title: '上班时间',
        	dataIndex: 'pmStartTime',
        	key: 'pmStartTime',
          }, {
        	 title: '下班时间',
        	 dataIndex: 'pmEndTime',
        	 key: 'pmEndTime',
          }],
      }, {
          title: '是否在用',
          dataIndex: 'inUse',
          key: 'inUse',
      },
    ]
  const getBodyWrapperProps = {
    page: '2',//location.query.page,
    current:'2', //pagination.current,
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
      	size="small"
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default Datalist
