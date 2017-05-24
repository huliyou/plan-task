
import React, { PropTypes } from 'react';
import * as Styles from './task.less';


// 全景计划
class GlobalPlan extends React.PureComponent {
  static propTypes = {

  };
  render() {
    return (
      <div style={{ width: '100%', height: '80vh', backgroundColor: '#fff', border: '1px solid red' }}>
         <div>全景图</div>
      </div>
    );
  }
}
export default GlobalPlan;
