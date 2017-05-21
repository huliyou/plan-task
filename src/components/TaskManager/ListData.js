import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Table, Pagination, Popover } from 'antd';
import editIcon from './taskImg/editIcon.png';
import CreatePlan from './CreatePlan.js';
import RelationTask from './RelationTask.js';
import TaskInfoEdit from './TaskInfoEdit.js';

class ListData extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
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
    this.state = {
      visible: false,
      selectId: 0,
      procId: 0,
    }
  }
  showModal = (id) => {
    this.setState({ visible: true, selectId: id });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  getContent(procId) {
    return (
      <div style={{ fontSize: '15px' }}>
         <div className={Styles.smallDiv} onClick={() => this.showModal(1)}>新建子任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(2)}>编辑任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(3)}>关联任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(4)}>新建并关联任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(5)}>催办任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(6)}>关注任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(7)}>删除任务</div>
      </div>
    );
  }
  showModalContent() {
    const selectId = this.state.selectId;
    const visible = this.state.visible;
    const view = [];
    if(selectId === 1) {
      view.push(
        <CreatePlan
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      )
    }
    if(selectId === 2) {
      view.push(
        <TaskInfoEdit
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      )
    }
    if(selectId === 3) {
      view.push(
        <RelationTask
          visible={visible}
          handleCancel={() => this.handleCancel()}
          dispacth={this.props.dispatch}
        />
      )
    }
    if(selectId === 4) {
      // 新建并关联
    }
    if(selectId === 5) {
      // 催办任务
    }
    if(selectId === 6) {
      // 关注任务
    }
    if(selectId === 7) {
      // 删除任务
    }
    return view;
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
        {this.showModalContent()}
      </div>
    )
  }
}

export default ListData;
