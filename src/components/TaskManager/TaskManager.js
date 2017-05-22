import React, { PropTypes } from 'react';
import TaskHeader from './TaskHeader.js';
import TaskMenu from './TaskMenu.js';
import TaskList from './TaskList.js';
import Styles from './task.less';

class TaskManager extends React.PureComponent {
  static propTypes = {
    planItems: PropTypes.array,
    taskMenu: PropTypes.array,
    taskList: PropTypes.object,
    taskListCard: PropTypes.array,
    taskCardData: PropTypes.object,
    dispatch: PropTypes.func,
    selectPlanId: PropTypes.string,
    planInfo: PropTypes.object,
    relationPlanList: PropTypes.array,
    selectParams: PropTypes.object,
    parentTaskList: PropTypes.array,
    filesList: PropTypes.array,
    relationTaskList: PropTypes.array,
    getTaskInfo: PropTypes.object,
    commentList: PropTypes.array,
    logList: PropTypes.array,
    selectProcId: PropTypes.number,
  }
  componentWillMount () {
    // 获取menu数据
    this.props.dispatch({
        type: 'TaskManager/getTasksMenu',
        payload: {},
    });
    if(this.props.selectProcId) {
      this.getTaskInfoAction(this.props.selectProcId);
      this.getFilesListAction(this.props.selectProcId);
      this.getFilesListAction(this.props.selectProcId);
      this.getRelationTaskListAction(this.prosp.selectProcId);
      this.getCommentListAction(this.props.selectProcId);
      this.getLogListAction(this.props.selectProcId);
    }
    if(this.props.planId) {
      this.getPlanInfoAction(his.props.planId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectPlanId !== this.props.selectPlanId && nextProps.selectPlanId) {
      this.props.dispatch({
          type: 'TaskManager/getTasksById',
          payload: { planId: nextProps.selectPlanId},
        });
    }
    if (nextProps.selectProcId !== this.props.selectProcId && nextProps.selectProcId) {
      this.getTaskInfoAction(nextProps.selectProcId);
      this.getFilesListAction(nextProps.selectProcId);
      this.getFilesListAction(nextProps.selectProcId);
      this.getRelationTaskListAction(nextProps.selectProcId);
      this.getCommentListAction(nextProps.selectProcId);
      this.getLogListAction(nextProps.selectProcId);
    }
    if (nextProps.planId !== this.props.planId && nextProps.planId) {
      this.getPlanInfoAction(nextProps.planId);
    }
  }
  // 获取任务详情
  getTaskInfoAction(selectProcId) {
    this.props.dispatch({
      type: 'TaskManager/getTaskInfo',
      payload: { procId: selectProcId },
    });
  }

  // 获取附件列表
  getFilesListAction(selectProcId) {
    this.props.dispatch({
      type: 'TaskManager/getFilesList',
      payload: { procId: selectProcId },
    });
  }

  // 获取关联任务列表
  getRelationTaskListAction(selectProcId) {
    this.props.dispatch({
      type: 'TaskManager/getRelationTaskList',
      payload: { procId: selectProcId },
    });
  }

  // 获取上级任务列表
  getParentTaskListAction() {
    this.props.dispatch({
      type: 'TaskManager/getParentTaskList',
      payload: { procId },
    });
  }

  // 任务列表搜索功能
  selectTaskAction = (dispatch: Function) => (params: Object, current: number = 1) => {
    dispatch({
      type: 'TaskManager/selectParams',
      payload: params,
    });
    const localParams = { params, current };
    dispatch({
      type: 'TaskManager/getTasks',
      payload: localParams,
    });
  }

  // 获取评论列表
  getCommentListAction(procId) {
    this.props.dispatch({
      type: 'TaskManager/getCommentList',
      payload: { procId },
    });
  }

  // 获取操作记录列表
 getLogListAction(procId) {
    this.props.dispatch({
      type: 'TaskManager/getLogList',
      payload: { procId },
    });
  }

  // 按计划号删除计划及相关任务
  delectTaskByPlanId = (dispatch: Function) => (params: Object) => {
    dispatch({
      type: 'TaskManager/DeletePlan',
      payload: params,
    });
  }
  // 按计划号归档计划及相关任务
  fileTaskByPlanId = (dispatch: Function) => (params: Object) => {
    dispatch({
      type: 'TaskManager/filePlan',
      payload: params,
    });
  }
  // 创建子计划
 createChildPlanAction = (dispatch: Function) => (params: Object) => {
   dispatch({
     type: 'TaskManager/CreateChildPlan',
     payload: params,
   });
 }
 // 变更计划
 editPlanAction = (dispatch: Function) => (params: Object) => {
  dispatch({
    type: 'TaskManager/editPlan',
    payload: params,
  });
}
// 新建任务
createTaskAction = (dispatch: Function) => (params: Object) => {
 dispatch({
   type: 'TaskManager/createTask',
   payload: params,
 });
}
// 收藏计划
collectPlanAction = (dispatch: Function) => (params: Object) => {
  params = {
    planId: 1, // 计划序号
    prjId: 3, // 项目序号
    collectionUser: 'erw', // 收藏人
  }
 dispatch({
   type: 'TaskManager/collectPlan',
   payload: params,
 });
}

// 变更计划
changePlan = (dispatch: Function) => (params: Object) => {
 dispatch({
   type: 'TaskManager/changePlan',
   payload: params,
 });
}
getPlanInfoAction(planId) {
  dispatch({
    type: 'TaskManager/getPlanInfo',
    payload: { planId },
  });
}
// 获取计划详情
getPlanInfo = (dispatch: Function) => (params: Object) => {
  dispatch({
    type: 'TaskManager/getPlanInfo',
    payload: params,
  });
}
  render() {
    return (
      <div>
        <TaskHeader createTaskAction={this.createTaskAction(this.props.dispatch)}/>
        <div className={Styles.taskBody}>
          <div className={Styles.taskMenuStyle}>
            <TaskMenu
              planItems={this.props.planItems}
              taskMenu={this.props.taskMenu}
              createChildPlanAction={this.createChildPlanAction(this.props.dispatch)}
              createTaskAction={this.createTaskAction(this.props.dispatch)}
              editPlanAction={this.editPlanAction(this.props.editPlanAction)}
              delectTaskByPlanId={this.delectTaskByPlanId(this.props.dispatch)}
              collectPlanAction={this.collectPlanAction(this.props.dispatch)}
              fileTaskByPlanId={this.fileTaskByPlanId(this.props.dispatch)}
              changePlan={this.changePlan(this.props.dispatch)}
              planInfo={this.props.planInfo}
              dispatch={this.props.dispatch}
            />
          </div>
          <div className={Styles.taskListStyle}>
            <TaskList
              taskList={this.props.taskList}
              taskListCard={this.props.taskListCard}
              taskCardData={this.props.taskCardData}
              selectTaskAction={this.selectTaskAction(this.props.dispatch)}
              relationPlanList={this.props.relationPlanList}
              dispatch={this.props.dispatch}
              selectParams={this.props.selectParams}
              parentTaskList={this.props.parentTaskList}
              filesList={this.props.filesList}
              relationTaskList={this.props.relationTaskList}
              getTaskInfo={this.props.getTaskInfo}
              selectProcId={this.props.selectProcId}
              commentList={this.props.commentList}
              logList={this.props.logList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskManager;
