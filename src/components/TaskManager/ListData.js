import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Table, Pagination, Popover } from 'antd';
import editIcon from './taskImg/editIcon.png';

class ListData extends React.Component {
  static propTypes = {
    taskList: PropTypes.object,
    selectTaskAction: PropTypes.func,
  }
  constructor(props: Object, context: string) {
    super(props, context);
    this.columns = [{
      title: '编号',
      dataIndex: 'procId',
      key: 'procId',
    }, {
      title: '',
      dataIndex: 'editIcon',
      key: 'editIcon',
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
      dataIndex: 'operation',
      key: 'operation',
    }];
  }

  getContent(procId) {
    return (
      <div style={{ fontSize: '15px' }}>
         <div className={Styles.smallDiv}>新建子任务</div>
         <div className={Styles.smallDiv}>编辑任务</div>
         <div className={Styles.smallDiv}>关联任务</div>
         <div className={Styles.smallDiv}>新建并关联任务</div>
         <div className={Styles.smallDiv}>催办任务</div>
         <div className={Styles.smallDiv}>关注任务</div>
         <div className={Styles.smallDiv}>删除任务</div>
      </div>
    );
  }
  renderDataSource(data) {
    const dataSource = [];
    if (data) {
      data.forEach((value) => {
        dataSource.push({
          key: value.procId,
          procId: value.procId,
          editIcon: (
            <Popover content={this.getContent(value.procId)} placement="bottom" trigger="click">
               <img src={editIcon} width="15px" />
            </Popover>
          ),
          planName: value.planName,
          status: value.status,
          workDay: value.workDay,
          procType: value.procType,
          weight: value.weight,
          pDuty: value.pDuty,
          createTime: value.createTime,
          children: this.renderDataSource(value.children),
          operation: (
            <div>
              <a
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                查看
              </a>
            </div>
          ),
        });
      });
    }
    return dataSource;
  }

  render () {
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
    return (
      <div style={{ padding: '20px' }}>
        <Table
          columns={this.columns}
          dataSource={this.renderDataSource(this.props.taskList.listData)}
          rowSelection={rowSelection}
          pagination={false}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2vh' }}>
          <Pagination
            current={this.props.taskList.current}
            onChange={() => {
              this.props.selectTaskAction({ current: 1 });
            }}
            total={this.props.taskList.total}
          />
        </div>

      </div>
    )
  }
}

export default ListData;
