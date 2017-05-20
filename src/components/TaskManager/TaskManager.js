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
  _selectTaskMenuTree = (dispatch: Function) => (params: Object) => {
     // TODO 获取menu数据
    dispatch();
  }
  // 任务列表搜索功能
  _selectTaskAction = (dispatch: Function) => (params: Object) => {
     // TODO 任务搜索接口  获取列表和card数据
    dispatch();
  }
  // 按计划序号获取任务集合
  _getTaskById = (dispatch: Function) => (params: Object) => {
    // TODO 按计划序号获取任务集合
    dispatch();
  }
  // 按计划号删除计划及相关任务
  _delectTaskById = (dispatch: Function) => (params: Object) => {
    // TODO 按计划号删除计划及相关任务
    dispatch();
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskManager;
