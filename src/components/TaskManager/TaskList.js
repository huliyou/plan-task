import React from 'react';
import Styles from './task.less';
import TaskCharts from './TaskCharts.js';
import TaskSelect from './TaskSelect.js';
import ListData from './ListData.js';
import CardListData from './CardListData.js';

class TaskList extends React.Component {
  state = {
    showCharts: false,
    visible: false,
    showListType: 'list',
  }
  showCharts() {
    const isShow = this.state.showCharts;
    if (isShow) {
      return (<TaskCharts />);
    }
    return <div />;
  }
  showSelect() {
    const isShow = this.state.visible;
    if (isShow) {
      return (
        <div>
          <TaskSelect />
        </div>
      );
    }
    return <div />;
  }
  showListDataByType() {
    const type = this.state.showListType;
    if(type === 'list') {
      return <ListData />;
    }
    if(type === 'card') {
      return <CardListData />;
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
          <div
            onClick={() => {
              const visible = this.state.visible;
              this.setState({ visible: !visible })
            }}
            className={Styles.taskSelectButton}
          >图片 筛选</div>
          <div className={Styles.ChangeListStyle}>
             <div
               className={this.state.showListType === 'list' ? Styles.checked : Styles.noChecked}
               onClick={() => this.setState({ showListType: 'list' })}
             >列表</div>
             <div
               className={this.state.showListType === 'card' ? Styles.checked : Styles.noChecked}
               onClick={() => this.setState({ showListType: 'card' })}
             >看板</div>
          </div>
        </div>
        {this.showSelect()}
        <div className={Styles.listDataContent}>
          {this.showListDataByType()}
        </div>
      </div>
    )
  }
}

export default TaskList;
