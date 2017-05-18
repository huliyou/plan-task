import React, { PropTypes } from 'react';
import TaskHeader from './TaskHeader.js';
import TaskMenu from './TaskMenu.js';
import TaskList from './TaskList.js';
import Styles from './task.less';

class TaskManager extends React.PureComponent {
  static propTypes = {
    taskMenu: PropTypes.array,
    taskList: PropTypes.array,
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
            <TaskList taskList={this.props.taskList} />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskManager;
