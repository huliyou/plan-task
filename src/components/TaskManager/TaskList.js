import React from 'react';
import { Popover } from 'antd';
import Styles from './task.less';
import TaskCharts from './TaskCharts.js';
import TaskSelect from './TaskSelect.js';

class TaskList extends React.Component {
  state = {
    showCharts: false,
    visible: false,
  }
  showCharts() {
    const isShow = this.state.showCharts;
    if (isShow) {
      return (<TaskCharts />);
    }
    return <div />;
  }
  render () {
    return (
      <div>
        <div
          className={Styles.listTitle}
          onClick={() => {
            const isShow = this.state.showCharts;
            this.setState({ showCharts: !isShow });
          }}
        >
          图片
          统计视图
        </div>
        {this.showCharts()}
        <div className={Styles.taskSelectContent}>
          <Popover
            content={<TaskSelect />}
            trigger="click"
            visible={this.state.visible}
            placement="bottom"
            trigger="click"
          >
            <div
              onClick={() => {
                const visible = this.state.visible;
                this.setState({ visible: !visible })
              }}
              className={Styles.taskSelectButton}
            >图片 筛选</div>
          </Popover>
          <div>
             <div>列表</div>
             <div>看板</div>
          </div>
        </div>
        <div>任务列表</div>
      </div>
    )
  }
}

export default TaskList;
