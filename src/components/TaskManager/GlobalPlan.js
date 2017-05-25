
import React, { PropTypes } from 'react';
import * as Styles from './task.less';
import { Table, Select } from 'antd';
const { Column, ColumnGroup } = Table;

const Option = Select.Option;

const data = [{
  planTitle: 'John',
  startTime: '2017-12-01',
  endTime: '2018-02-06',
  percen: '4%',
},{
  planTitle: 'John',
  startTime: '2016-12-01',
  endTime: '2017-02-06',
  percen: '20%',
},{
  planTitle: 'John',
  startTime: '2016-12-30',
  endTime: '2018-02-06',
  percen: '20%',
},{
  planTitle: 'John',
  startTime: '2017-02-01',
  endTime: '2017-02-06',
  percen: '100%',
}, {
  planTitle: 'Jim',
  startTime: '2017-01-01',
  endTime: '2017-02-06',
  percen: '4%',
}, {
  planTitle: 'Joe',
  startTime: '2017-04-06',
  endTime: '2017-05-07',
  percen: '50%',
}];

// 全景计划
class GlobalPlan extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    taskMenu: PropTypes.array,
  };
  state = {
    columns: [],
    year: 2017,
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
    this.setState({
      year,
      columns: column,
    });
  }
  showTableSmallTitle(year, i) {
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
        title: <div style={{ width: '14px' }}>{j}</div>,
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
  renderProgress(lists) {
    const view = [];
    lists.forEach((item, key) => {
      let borderLeft;
      // 完成率
      const percen = Number(item.percen.substring(0, item.percen.length-1)/100);
      // 相对table顶部的位置
      const top = 120 + key * 24;
      // 相对table左端的位置
      let left = 200 + (new Date(item.startTime).getTime() - new Date(item.startTime.substring(0, 4) + '-01-01').getTime())/3600/24/1000 * 31;
      // 任务总天数
      const dayNumber = ((new Date(item.endTime).getTime()) - (new Date(item.startTime).getTime()))/3600/24/1000 + 1;

      // 总任务长度
      let outWidth = dayNumber * 31;
      // 完成度长度
      let insideWidth = outWidth * percen;
      if(item.startTime.substring(0, 4) !== item.endTime.substring(0, 4)) {
        // 开始在今年之前，结束在今年
        if(Number(item.endTime.substring(0, 4)) === this.state.year) {
          left = 200;
          // 结束时间距离今年01-01的天数
          borderLeft = '0px';
          const lastDay = (new Date(item.endTime).getTime() - new Date(item.endTime.substring(0, 4) + '-01-01').getTime())/3600/24/1000;
          outWidth = lastDay * 31;
          insideWidth = (dayNumber * percen + lastDay -  dayNumber) > 0 ? (dayNumber * percen + lastDay -  dayNumber) * 31 : 0;
        }
        // 开始在今年之前，结束在今年之后
        // if(Number(item.endTime.substring(0, 4)) !== this.state.year && Number(item.startTime.substring(0, 4)) !== this.state.year) {
        //   left = 200;
        //   const preDay = (new Date(this.state.year + '-01-01').getTime() - new Date(item.startTime).getTime())/3600/24/1000;
        //   const nextDay = (new Date(item.endTime).getTime() - new Date(this.state.year + '-12-31').getTime())/3600/24/1000;
        //   console.log(preDay, nextDay);
        //   console.log('qaaa', dayNumber * percen + lastDay -  dayNumber);
        // }
      }
      console.log(outWidth, insideWidth);
      view.push([
        <div key className={Styles.holeProgress} style={{ borderLeft, top: `${top}px`, left: `${left}px`, width: `${outWidth}px` }}>
          <div className={Styles.doneProgress} style={{ width: `${insideWidth}px` }}>
            {insideWidth > 20 ? item.percen : ''}
          </div>
          {insideWidth <= 20 ? item.percen : ''}
        </div>
      ]);
    });
    return view;
  }

  render() {
    return (
      <div style={{ width: '100%', height: '80vh', backgroundColor: '#fff', overflow: 'scroll' }}>
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
           <div   style={{ padding: '10px'}}>
             <Select defaultValue={this.state.year}
                onChange={(value) => {
                  this.showTableTitle(value);
                }}
                style={{ width: 120 }}>
                {this.getOption()}
             </Select>
           </div>
        </div>
        <div style={{ padding: '10px', width: '13000px', position: 'relative' }}>
          <Table
            style={{ position: 'absolute',top: '0',left: '0' }}
            dataSource={data}
            bordered
            pagination={false}
            columns={this.state.columns}
            scroll={{ x: true }}
          />
          <div className={Styles.progress}>
            {this.renderProgress(data)}
          </div>
        </div>
      </div>
    );
  }
}
export default GlobalPlan;
