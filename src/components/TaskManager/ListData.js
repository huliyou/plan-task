import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Table, Pagination, Popover } from 'antd';
import editIcon from './taskImg/editIcon.png';
import CreatePlan from './CreatePlan.js';
import RelationTask from './RelationTask.js';
import TaskInfoEdit from './TaskInfoEdit.js';
import TaskInfoSee from './TaskInfoSee';

class ListData extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    taskList: PropTypes.object,
    selectTaskAction: PropTypes.func,
    relationPlanList: PropTypes.array,
    selectParams: PropTypes.object,
    parentTaskList: PropTypes.array,
    filesList: PropTypes.array,
    relationTaskList: PropTypes.array,
    getTaskInfo: PropTypes.object,
    commentList: PropTypes.array,
    logList: PropTypes.array,
    selectProcId: PropTypes.any,
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
    }
  }
  showModal = (id, procId = 0) => {
    this.props.dispatch({
        type: 'TaskManager/selectProcId',
        payload: { procId },
    });
    this.setState({ visible: true, selectId: id });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleOk = (type, params) => {
    this.setState({ visible: false });
    if(type in [1, 2, 4] ) {
      const localParams = { ...params, procId: this.prosp.procId}
      // 保存任务
      this.props.dispatch({
          type: 'TaskManager/createTask',
          payload: { procId },
      });
    }
    if(type === 3) {
      // 关联任务
      this.props.dispatch({
          type: 'TaskManager/relationTask',
          payload: params,
      });
    }

  }
  getContent(procId) {
    return (
      <div style={{ fontSize: '15px' }}>
         <div className={Styles.smallDiv} onClick={() => this.showModal(1, procId)}>新建子任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(2, procId)}>编辑任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(3, procId)}>关联任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(4, procId)}>新建并关联任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(5, procId)}>催办任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(6, procId)}>关注任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(7, procId)}>删除任务</div>
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
          parentTaskList={this.props.parentTaskList}
          filesList={this.props.filesList}
          relationTaskList={this.props.relationTaskList}
          getTaskInfo={this.props.getTaskInfo}
        />
      )
    }
    if(selectId === 3) {
      view.push(
        <RelationTask
          visible={visible}
          handleCancel={() => this.handleCancel()}
          dispacth={this.props.dispatch}
          relationPlanList={this.props.relationPlanList}
        />
      )
    }
    if(selectId === 4) {
      view.push(
        <TaskInfoEdit
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
          parentTaskList={this.props.parentTaskList}
          filesList={this.props.filesList}
          relationTaskList={this.props.relationTaskList}
          getTaskInfo={this.props.getTaskInfo}
        />
      )
    }
    if(selectId === 5) {
      // 催办任务
      this.props.dispatch({
          type: 'TaskManager/remindersTask',
          payload: { procId: this.state.procId },
      });
    }
    if(selectId === 6) {
      // 关注任务
      this.props.dispatch({
          type: 'TaskManager/followTask',
          payload: { procId: this.state.procId },
      });
    }
    if(selectId === 7) {
      // 删除任务
      this.props.dispatch({
          type: 'TaskManager/deleteTask',
          payload: { procId: this.state.procId },
      });
    }
    if(selectId === 8) {
      view.push(
        <TaskInfoSee
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={() => this.showModal(2, this.props.selectProcId)}
          parentTaskList={this.props.parentTaskList}
          filesList={this.props.filesList}
          relationTaskList={this.props.relationTaskList}
          getTaskInfo={this.props.getTaskInfo}
          commentList={this.props.commentList}
          logList={this.props.logList}
        />
      );
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
                  this.showModal(8, value.procId); }}
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
            onChange={(current) => {
              this.props.selectTaskAction(this.props.selectParams, current);
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
