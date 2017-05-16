// !!!: 这个是子组件搜索，有一个输入框会跟Modal同步改变
import React from 'react';
import { Input } from 'antd';

// 引入子组件
import MyDutyHeader from './MyDutyHeader';

class MyDuty extends React.Component {
  // !!!: 一般在这个生命周期去请求接口, 首次进入的异步数据
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <div>此处去实现Search组件</div>
        这个输入框会同步MyDutyModal的searchData.group
        <Input
          value={this.props.group}
          onChange={this.props.changeGroup}
        />
      </div>
    )
  }
}
export default MyDuty;
