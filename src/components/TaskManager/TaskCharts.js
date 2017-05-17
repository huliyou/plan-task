import React from 'react';
import Styles from './task.less';

class Taskcharts extends React.Component {
  render () {
    return (
      <div className={Styles.taskChartsBody}>
        <div>
          <div>数据统计</div>
          <div>燃尽图</div>
        </div>
        <div>
          <div>图表</div>
          <div>显示任务个数</div>
        </div>
      </div>
    )
  }
}

export default Taskcharts;
