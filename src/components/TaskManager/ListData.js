import React from 'react';
import Styles from './task.less';
import { Table } from 'antd';

const data = [{
  key: 1,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park',
    }],
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

class ListData extends React.Component {
  constructor(props: Object, context: string) {
    super(props, context);
    this.columns = [{
      title: '编号',
      dataIndex: 'operation',
      key: 'operation',
    }, {
      title: '标题',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '流程状态',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '估算工时',
      dataIndex: 'hospital',
      key: 'hospital',
    }, {
      title: '类型',
      dataIndex: 'departmentLabel',
      key: 'departmentLabel',
    }, {
      title: '占整个项目比例',
      dataIndex: 'members',
      key: 'members',
      width: '300px',
    }, {
      title: '负责人',
      dataIndex: 'chatNumber',
      key: 'chatNumber',
    }, {
      title: '创建时间',
      dataIndex: 'PatientResponse',
      key: 'PatientResponse',
    }, {
      title: '操作',
      dataIndex: 'PatientResponse',
      key: 'PatientResponse',
    }];
  }
  render () {
    return (
      <div style={{ padding: '20px' }}>
        <Table columns={this.columns} dataSource={data} />
      </div>
    )
  }
}

export default ListData;
