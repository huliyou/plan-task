/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Button } from 'antd';
import * as Styles from './task.less';

// 删除
class DeletePlan extends React.PureComponent {
  static propTypes = {
    submitPlan: PropTypes.func,
    addPlan: PropTypes.func,
  };
  render() {
    return (
      <div>
        <div style={{ fontSize: '4rem', textAlign: 'center' }}>
          确认删除？
        </div>
        <div className={Styles.bottomButton}>
          <Button
            type="primary"
            style={{ height: '40px', fontSize: '1.5rem', marginRight: '3vw' }}
          >确定</Button>
          <Button
            type="primary"
            style={{ height: '40px', fontSize: '1.5rem' }}
          >取消</Button>
        </div>
      </div>
    );
  }
}
export default DeletePlan;
