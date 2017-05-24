
import React, { PropTypes } from 'react';
import * as Styles from './task.less';
import { Table, Select } from 'antd';
const { Column, ColumnGroup } = Table;
import moment from 'moment';

const Option = Select.Option;

const data = [{
  planTitle: 'John',
  startTime: '2017-01-01',
  endTime: '2017-02-06',
  percen: '20%',
}, {
  planTitle: 'Jim',
  startTime: '2017-02-01',
  endTime: '2017-02-16',
  percen: '100%',
}, {
  planTitle: 'Joe',
  startTime: '2017-02-01',
  endTime: '2017-02-06',
  percen: '20%',
}];

// 全景计划
class GlobalPlan extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    taskMenu: PropTypes.array,
  };
  state = {
    columns: [],
    year: 0,
  }
  componentWillMount() {
    this.showTableTitle(2017);
  }
  showTableTitle(year) {
    const column = [{
        title: '计划名称',
        dataIndex: 'planTitle',
        key: 'planTitle',
        width: '100px',
      }, {
          title: '',
          dataIndex: 'percen',
          key: 'percen',
          width: '100px',
        }];
    for(let i = 1; i<= 12; i++) {
      column.push({
        title: `${year}年${i}月`,
        children: this.showTableSmallTitle(year, i),
      })
    }
    this.setState({ columns: column });
  }
  showTableSmallTitle(year, i) {
    this.setState({ year });
    const data = [];
    const days = new Date(year, i, 0).getDate();
    for(let j = 1; j<= days; j++) {
      if(j < 10) {
        j = `0${j}`;
      }
      if(i < 10) {
        i = `0${i}`;
      }
      data.push({
        title: j,
        dataIndex: `${year}-${i}-${j}`,
        key: `${year}-${i}-${j}`,
        width: '10px',
        fixed: 'left',
      });
    }
    return data;
  }
  getOption() {
    const view = [];
    for(let i = 2016; i < 2100; i++) {
      view.push(
        <Option value={i}>{i}年</Option>
      )
    }
    return view;
  }
  showChart(data) {
    const view = [];
    data.forEach((value, key) => {
       const startTime = value.startTime;
       const endTime = value.endTime;
       const startData = startTime.split("-");
       const endData = endTime.split("-");
       const width = 0;
       if(this.state.year == startData[0] && this.state.year == endData[0]) {
         const top = (key) * 25 + 118;
         // 开始时间到结束时间间隔几天 width
         const width = moment(endTime).diff(startTime,'days') * 54;
         // 开始时间据1月1号有几天 left
         const left = moment(startTime).diff(`${this.state.year}-01-01`,'days') * 34 + 270;
         // 完成的宽度
         const coverWidth = (Number(value.percen.split("%")[0]) / 100.00 * moment(endTime).diff(startTime,'days')) * 54;
         view.push(
           <div
             style={{
                border: '1px solid #F0BF76',
                position: 'relative',
                top: top,
                left: left,
                width: width,
                height: 30,
                overflow: 'hidden'
             }}
           >
             <div
               style={{
                  backgroundColor: '#F0BF76',
                  position: 'relative',
                  top: 0,
                  left: 0,
                  width: coverWidth,
                  height: 28,
                  color: '#fff'
               }}
            >{value.percen}</div>
           </div>
         );
       }
    });
    return view;
  }
  render() {
    return (
      <div style={{ width: '100%', height: '80vh', backgroundColor: '#fff', overflow: 'scroll', position: 'absolute' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{ fontSize: '15px', color: '#4EC6E4', padding: '10px'}}
              onClick={() => {
                this.props.dispatch({
                  type: 'TaskManager/changeShowType',
                  payload: {
                    showType: 1,
                  },
                });
              }}
            >
             返回上一级
           </div>
           <div style={{ padding: '10px'}}>
             <Select defaultValue={this.state.year}
                onChange={(value) => {
                  this.showTableTitle(value);
                }}
                style={{ width: 120 }}>
                {this.getOption()}
             </Select>
           </div>
        </div>
        <div style={{ padding: '10px', height: '80vh', width: '13000px', position: 'absolute', backgroundColor: '#fff' }}>
           <div style={{ position: 'absolute', height: '80vh', width: '13000px', }}>
             <Table
               dataSource={data}
               bordered
               pagination={false}
               columns={this.state.columns}
               scroll={{ x: true }}
             />
           </div>
           {this.showChart(data)}
        </div>
      </div>
    );
  }
}
export default GlobalPlan;
