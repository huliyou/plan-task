import React from 'react';
import Styles from './task.less';
import { Table } from 'antd';

const data = [{
  key: 1,
  procId: 1,
  planName: '计划1',
  status: '新建',
  workDay: 30,
  procType: '设计',
  weight: '30%',
  pDuty: 'wangsds',
  createTime: '2017-04-01',
  children: [{
    key: 2,
    procId: 34,
    planName: '计划1',
    status: '新建',
    workDay: 30,
    procType: '设计',
    weight: '30%',
    pDuty: 'wangsds',
    createTime: '2017-04-01',
  }, {
    key: 3,
    procId: 6,
    planName: '计划1',
    status: '新建',
    workDay: 30,
    procType: '设计',
    weight: '30%',
    pDuty: 'wangsds',
    createTime: '2017-04-01',
    children: [{
      key: 4,
      procId: 7,
      planName: '计划2',
      status: '已完成',
      workDay: 30,
      procType: '设计',
      weight: '30%',
      pDuty: 'wangsds',
      createTime: '2017-04-02',
    }],
  }, {
    key: 5,
    procId: 4,
    planName: '计划2',
    status: '已完成',
    workDay: 30,
    procType: '设计',
    weight: '30%',
    pDuty: 'wangsds',
    createTime: '2017-04-02',
    children: [{
      key: 6,
      procId: 5,
      planName: '计划2',
      status: '已完成',
      workDay: 30,
      procType: '设计',
      weight: '30%',
      pDuty: 'wangsds',
      createTime: '2017-04-02',
    }],
  }],
}, {
  key: 7,
  procId: 2,
  planName: '计划2',
  status: '已完成',
  workDay: 30,
  procType: '设计',
  weight: '30%',
  pDuty: 'wangsds',
  createTime: '2017-04-02',
}];

class ListData extends React.Component {
  constructor(props: Object, context: string) {
    super(props, context);
    this.columns = [{
      title: '编号',
      dataIndex: 'procId',
      key: 'procId',
      width: '200px',
    }, {
      title: '标题',
      dataIndex: 'planName',
      key: 'planName',
    }, {
      title: '流程状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '估算工时',
      dataIndex: 'workDay',
      key: 'workDay',
    }, {
      title: '类型',
      dataIndex: 'procType',
      key: 'procType',
    }, {
      title: '占整个项目比例',
      dataIndex: 'weight',
      key: 'weight',
    }, {
      title: '负责人',
      dataIndex: 'pDuty',
      key: 'pDuty',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
