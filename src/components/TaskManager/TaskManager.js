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
  }
  componentWillMount () {
    // 获取列表和card数据
    // 获取menu数据
    // 获取图表数据
  }
  // 获取menu数据
  _getTaskMenuTree = (dispatch: Function) => (params: Object) => {
     dispatch({
       type: 'TaskManager/getTasksMenu',
       payload: params,
     });
  }
  // 任务列表搜索功能
  selectTaskAction = (dispatch: Function) => (params: Object) => {
    dispatch({
      type: 'TaskManager/getTasks',
      payload: params,
    });
  }
  // 按计划序号获取任务集合
  _getTaskById = (dispatch: Function) => (params: Object) => {
    dispatch({
      type: 'TaskManager/getTasksById',
      payload: params,
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
  render() {
    return (
      <div>
        <TaskHeader />
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
            />
          </div>
          <div className={Styles.taskListStyle}>
            <TaskList
              taskList={this.props.taskList}
              taskListCard={this.props.taskListCard}
              taskCardData={this.props.taskCardData}
              selectTaskAction={this.selectTaskAction(this.props.dispatch)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskManager;
