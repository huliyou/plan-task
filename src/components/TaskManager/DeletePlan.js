/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Button, Modal } from 'antd';
import * as Styles from './task.less';

// 删除
class DeletePlan extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  };
  render() {
    return (
      <Modal
        visible={this.props.visible}
        closable={false}
        footer={null}
        style={{ marginLeft: '25vw' }}
      >
      <div>
        <div style={{ fontSize: '3.5rem', textAlign: 'center', padding: '3vh' }}>
          确认删除？
        </div>
        <div className={Styles.bottomButton}>
          <Button
            className={Styles.buttonStyle}
            onClick={() => this.props.handleOk(6, {})}
          >确定</Button>
          <Button
            className={Styles.buttonStyle}
            onClick={() => this.props.handleCancel(5)}
          >取消</Button>
        </div>
      </div>
    </Modal>
    );
  }
}
export default DeletePlan;
