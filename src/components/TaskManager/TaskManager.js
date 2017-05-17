import React from 'react';
import TaskHeader from './TaskHeader.js';
import TaskMenu from './TaskMenu.js';
import TaskList from './TaskList.js';
import Styles from './task.less';

class TaskManager extends React.Component {
  render() {
    return (
      <div>
        <TaskHeader />
        <div className={Styles.taskBody}>
           <div className={Styles.taskMenuStyle}><TaskMenu /></div>
           <div className={Styles.taskListStyle}><TaskList /></div>
        </div>
      </div>
    );
  }
}

export default TaskManager;
