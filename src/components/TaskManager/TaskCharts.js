import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Circle, Line } from 'rc-progress';
import { LineChart, Line as ChartLine, XAxis, YAxis,
  Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const chartStyle = ({
  checkButton: {
    width: '180px',
    height: '35px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    border: '1px solid #7792BB',
    alignItems: 'center',
    fontSize: '1.2rem',
    textAlign: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  checked: {
    width: '90px',
    height: '35px',
    lineHeight: '35px',
    backgroundColor: '#7792BB',
    color: '#fff',
    borderRadius: '5px 0 0 5px',
  },
  noChecked: {
    width: '90px',
    height: '35px',
    lineHeight: '35px',
  },
  chartBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '30vh',
  },
  chartText: {
    width: '25vh', height: '20vh', border: '1px solid #ddd',
    display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1.2rem',
    justifyContent: 'center', backgroundColor: '#F7F7F7'
  },
  textStyle: {
    width: '20vh', display: 'flex', justifyContent: 'space-between'
  },
});

const typeColor = {
  设计: '#80E6BD',
  需求: '#E6BD1A',
  开发: '#2B91D5',
  测试: '#D88F7D',
  交付: '#BB8ADC',
  验收: '#7EB57E',
};

class Taskcharts extends React.Component {
  static propTypes = {
    taskCardData: PropTypes.object,
  }
  state = {
    showChartType: 'chart1',
  }
  showChartByType() {
    const chartType = this.state.showChartType;
    const percent = 20;
    if (chartType === 'chart1') {
      return(
        <div>
          <div style={{ fontSize: '1.2rem', margin: '20px 0' }}>任务个数</div>
          <div style={chartStyle.chartBody}>
             <div style={{ position: 'relative' }}>
               <Circle
                 style={{ width: '18vh', height: '18vh', position: 'absolute' }}
                 trailWidth="12"
                 percent={percent}
                 strokeWidth="12"
                 strokeColor={'#80E6BD'}
               />
               <div style={{ fontSize: '2.5rem',
                 lineHeight: '18vh', width: '18vh', textAlign: 'center' }}>
                {percent}%
               </div>
             </div>
             <div style={{ width: '22vw', margin: '0 3vw', fontSize: '1.2rem' }}>
                {this.showLineProgress(this.props.taskCardData.cardData)}
             </div>
             <div style={chartStyle.chartText}>
                 <div style={chartStyle.textStyle} >
                   <div>任务总数</div><div style={{ fontSize: '3.5rem' }}>20</div>
                 </div>
                 <div style={{ width: '20vh', borderBottom: '1px solid #ccc', margin: '3vh 0' }} />
                 <div style={chartStyle.textStyle}>
                   <div>剩余任务数量</div>
                   <div style={{ fontSize: '3.5rem' }}>20</div>
                 </div>
             </div>
          </div>
        </div>
      );
    }
    if (chartType === 'chart2') {
      const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
     ];
      return (
        <div style={chartStyle.chartBody}>
          <div style={{ width: '60vh', height: '100%', margin: '3vh 4vh 0 0' }}>
            <div>任务总数</div>
            <ResponsiveContainer width="100%" aspect={2}>
              <LineChart
                data={data}
                margin={{ top: 0, right: 10, left: 10, bottom: 10 }}
              >
                  <XAxis dataKey="name" padding={{ right: 2 }} />
                  <YAxis padding={{ top: 2 }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend verticalAlign={'top'} />
                  <ChartLine type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}} />
                  <ChartLine type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>日期</div>
          </div>
          <div style={chartStyle.chartText}>
              <div style={chartStyle.textStyle} >
                <div>剩余任务数</div><div style={{ fontSize: '3.5rem' }}>20</div>
              </div>
              <div style={{ width: '20vh', borderBottom: '1px solid #ccc', margin: '3vh 0' }} />
              <div style={chartStyle.textStyle}>
                <div>剩余天数</div>
                <div style={{ fontSize: '3.5rem' }}>20</div>
              </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
  showLineProgress(data) {
    const view = [];
    if (data) {
      data.forEach((value) => {
        const percent = value.completeTask / value.taskNumber * 100;
        const color = typeColor[value.type];
        view.push(
          <div style={{ display: 'flex', margin: '1vh 0' }}>
             <div>{value.type}</div>
             <Line
               style={{ width: '15vw', height: '1.5vh', marginLeft: '1vh' }}
               percent={percent} strokeWidth="5" trailWidth="5" strokeColor={color}
            /> { percent }%
          </div>
        );
      })
    }
    return view;
  }
  render () {
    return (
      <div className={Styles.taskChartsBody}>
        <div style={chartStyle.checkButton}>
          <div
            style={this.state.showChartType === 'chart1' ? chartStyle.checked : chartStyle.noChecked}
            onClick={() => this.setState({ showChartType: 'chart1' })}
          >数据统计</div>
          <div
            style={this.state.showChartType === 'chart2' ? chartStyle.checked : chartStyle.noChecked}
            onClick={() => this.setState({ showChartType: 'chart2' })}
          >燃尽图</div>
        </div>
        <div>
          {this.showChartByType()}
        </div>
      </div>
    )
  }
}

export default Taskcharts;
