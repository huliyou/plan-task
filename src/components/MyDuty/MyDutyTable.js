/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Table } from 'antd';

class MyDutyTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '账户名',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    }, {
      title: '职能',
      dataIndex: 'role',
      key: 'role',
    }, {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    }, {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    }];
  }
  _renderDataSource(list) {
    const dataSource = [];
    list.forEach((task, index) => {
      dataSource.push({
        key: index,
        title: task.title,
      });
    });
    return dataSource;
  }

  render() {
    return (
      <div>
        此处实现表格组件
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.list)}
          pagination={false}
          bordered
        />
      </div>
    );
  }
}
export default MyDutyTable;
