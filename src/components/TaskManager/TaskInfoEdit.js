
import React, { PropTypes } from 'react';
import { Button, Modal, Collapse } from 'antd';
import * as Styles from './task.less';


class TaskInfoEdit extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    procId: PropTypes.number,
  };
  render() {
    return (
      <Modal
        visible={this.props.visible}
        closable={false}
        footer={null}
        style={{ marginLeft: '25vw' }}
        width={'65vw'}
      >
        <div style={{ padding: '5vh' }}>
          内容
        </div>
      </Modal>
    );
  }
}
export default TaskInfoEdit;
