// !!!: 这个文件是组装容器，在MyDuty中去干3件事情
// 1： 组装子组件
// 2： 把index绑定的数据传递给子组件
// 3： 定义行为（子组件触发的函数）传递给子组件
import React from 'react';
import { Pagination } from 'antd';

// 引入子组件
import MyDutyHeader from './MyDutyHeader';
import MyDutySearch from './MyDutySearch';
import MyDutyTable from './MyDutyTable';

class MyDuty extends React.Component {
  // !!!: 一般在这个生命周期去请求接口, 首次进入的异步数据
  componentWillMount() {
    // !!!: 请先实现正确的MyDutyService请求在开启此处
    // 对应的是MyDutyModal中的effects中的getTasks
    // dispatch({
    //   type: 'MyDuty/getTasks',
    // });
  }
  // !!!: 定义事件处理行为
  // 这个函数是做的一个同步改变, 对应MyDutyModal中reducers中的函数changeGroup
  changeGroup(e) {
    this.props.dispatch({
      type: 'MyDuty/changeGroup',
      payload: {
        group: e.target.value,
      },
    });
  }
  render() {
    return (
      <div>
        <MyDutyHeader />
        <hr style={{margin: '20px'}} />
        <MyDutySearch
          group={this.props.searchData.group}
          changeGroup={(e) => this.changeGroup(e)}
        />
        <hr style={{margin: '20px'}} />
        <MyDutyTable list={this.props.tasks.list} />
        <hr style={{margin: '20px'}} />
          <Pagination
            onChange={(current) => alert(`此处实现第${current}页搜索`)}
            total={this.props.tasks.total}
            pageSize={this.props.tasks.pageSize}
            defaultCurrent={1}
            showQuickJumper
            current={this.props.tasks.current}
          />
      </div>
    )
  }
}
export default MyDuty;
