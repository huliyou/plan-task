import React, { PropTypes } from 'react';
import Styles from './task.less';
import TaskCharts from './TaskCharts.js';
import TaskSelect from './TaskSelect.js';
import ListData from './ListData.js';
import CardListData from './CardListData.js';
import closeImg from './taskImg/close_hover.png';
import expandImg from './taskImg/expand_hover.png';

class TaskList extends React.Component {
  static propTypes = {
    taskList: PropTypes.object,
    taskListCard: PropTypes.array,
    taskCardData: PropTypes.object,
    selectTaskAction: PropTypes.func,
  }
  state = {
    showCharts: false,
    visible: false,
    showListType: 'list',
  }
  showCharts() {
    const isShow = this.state.showCharts;
    if (isShow) {
      return (<TaskCharts taskCardData={this.props.taskCardData} />);
    }
    return <div />;
  }
  showSelect() {
    const isShow = this.state.visible;
    if (isShow) {
      return (
        <div>
          <TaskSelect selectTaskAction={this.props.selectTaskAction} />
        </div>
      );
    }
    return <div />;
  }
  showListDataByType () {
    const type = this.state.showListType;
    if (type === 'list') {
      return (
        <ListData
          taskList={this.props.taskList}
          selectTaskAction={this.props.selectTaskAction}
        />
      );
    }
    if(type === 'card') {
      return <CardListData taskListCard={this.props.taskListCard} />;
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
          <img src={this.state.showCharts ? closeImg : expandImg} style={{ width: '15px', margin: '0 10px' }}/>
          <span style={{ fontWeight: 'bold' }}>统计视图</span>
        </div>
        {this.showCharts()}
        <div className={Styles.taskSelectContent}>
          <div
            onClick={() => {
              const visible = this.state.visible;
              this.setState({ visible: !visible })
            }}
            className={Styles.taskSelectButton}
          >
           <img src={this.state.visible ? closeImg : expandImg} style={{ width: '15px', margin: '0 5px' }}/>
             筛选
           </div>
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
