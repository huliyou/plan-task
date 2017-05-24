
import React, { PropTypes } from 'react';
import * as Styles from './task.less';
import { Table, Select } from 'antd';
const { Column, ColumnGroup } = Table;

const Option = Select.Option;

const data = [{
  planTitle: 'John',
  startTime: '2017-02-01',
  endTime: '2017-02-06',
  percen: '20%',
}, {
  planTitle: 'Jim',
  startTime: '2017-02-01',
  endTime: '2017-02-06',
  percen: '20%',
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
    const data = [];
    const days = new Date(year, i, 0).getDate();
    for(let j = 1; j<= days; j++) {
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
         <div style={{ padding: '10px', width: '13000px'  }}>
         <Table
           dataSource={data}
           bordered
           pagination={false}
           columns={this.state.columns}
           scroll={{ x: true }}
         />
         </div>
      </div>
    );
  }
}
export default GlobalPlan;
