import React, { PropTypes } from 'react';
import TaskHeader from './TaskHeader.js';
import TaskMenu from './TaskMenu.js';
import TaskList from './TaskList.js';
import Styles from './task.less';

class TaskManager extends React.PureComponent {
  static propTypes = {
    taskMenu: PropTypes.array,
    taskList: PropTypes.array,
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
     // TODO 获取menu数据
     dispatch({
       type: 'TaskManager/getTasks',
       payload: params,
     });
  }
  // 任务列表搜索功能
  selectTaskAction = (dispatch: Function) => (params: Object) => {
    console.log(params);
     // TODO 任务搜索接口  获取列表和card数据
    dispatch({
      type: 'TaskManager/getTasks',
      payload: params,
    });
  }
  // 按计划序号获取任务集合
  _getTaskById = (dispatch: Function) => (params: Object) => {
    // TODO 按计划序号获取任务集合
    dispatch({
      type: 'TaskManager/getTasks',
      payload: params,
    });
  }
  // 按计划号删除计划及相关任务
  _delectTaskById = (dispatch: Function) => (params: Object) => {
    // TODO 按计划号删除计划及相关任务
    dispatch({
      type: 'TaskManager/getTasks',
      payload: params,
    });
  }
  render() {
    return (
      <div>
        <TaskHeader />
        <div className={Styles.taskBody}>
          <div className={Styles.taskMenuStyle}>
            <TaskMenu taskMenu={this.props.taskMenu} />
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
