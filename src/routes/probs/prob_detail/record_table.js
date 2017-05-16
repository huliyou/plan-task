import { Table, Button } from 'antd';
import React, { PropTypes } from 'react'

function RecordTable({
    pathname,
    probId,
    probItem,
    item = {},
}) {
const columns = [ {
      title: '参与人',
      dataIndex: 'partakeUser',
      key: 'partakeUser',
    },{
      title: '参与方式',
      dataIndex: 'partakeType',
      key: 'partakeType',
    },
     {
      title: '手机号码',
      dataIndex: 'tel',
      key: 'tel',
    },{
      title: '所属单位',
      dataIndex: 'org',
      key: 'org',
    },{
      title: '说明',
      dataIndex: 'remark',
      key: 'remark',
    },{
      title: '目标参与者',
      dataIndex: 'goalPartakeUser',
      key: 'goalPartakeUser',
    },
    {
      title: '操作时间',
      dataIndex: 'startDateStr',
      key: 'startDateStr',
    },
 ];

  return(
    <Table columns={columns} dataSource={item.result} />
  )
}
export default RecordTable;