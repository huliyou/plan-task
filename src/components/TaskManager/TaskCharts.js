import React from 'react';
import Styles from './task.less';

const chartStyle = ({
  checkButton: {
    width: '150px',
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    border: '1px solid #7792BB',
    alignItems: 'center',
    fontSize: '1.2rem',
  },
});

class Taskcharts extends React.Component {
  state = {
    showChartType: 'chart1',
  }
  render () {
    return (
      <div className={Styles.taskChartsBody}>
        <div style={chartStyle.checkButton}>
          <div
            className={this.state.showChartType === 'chart1' ? Styles.checked : Styles.noChecked}
            onClick={() => this.setState({ showChartType: 'chart1' })}
          >数据统计</div>
          <div
            className={this.state.showChartType === 'chart1' ? Styles.checked : Styles.noChecked}
            onClick={() => this.setState({ showChartType: 'chart1' })}
          >燃尽图</div>
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
