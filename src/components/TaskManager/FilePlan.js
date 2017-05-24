/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Button, Modal } from 'antd';
import * as Styles from './task.less';


// 归档
class FilePlan extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  };
  render() {
    return (
      <div>
      <Modal
        visible={this.props.visible}
        closable={false}
        footer={null}
        style={{ marginLeft: '25vw' }}
      >
        <div style={{ fontSize: '3rem', textAlign: 'center', padding: '3vh' }}>
          该计划中的任务全部完成可以直接归档。
        </div>
        <div className={Styles.bottomButton}>
          <Button
            className={Styles.buttonStyle}
            onClick={() => this.props.handleOk(5, {})}
          >确定</Button>
          <Button
            className={Styles.buttonStyle}
            onClick={() => this.props.handleCancel()}
          >取消</Button>
        </div>
        </Modal>
      </div>
    );
  }
}
export default FilePlan;
