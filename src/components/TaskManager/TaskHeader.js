import React from 'react';
import Styles from './task.less';
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';
import CreatePlan from './CreatePlan.js';

const FormItem = Form.Item;
const Option = Select.Option;

class TaskHeader extends React.PureComponent {
  state = {
    visible: false,
  }
  showModal = () => {
    this.setState({ visible: true });
  }
  handleOk = () => {
    this.setState({ visible: false });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    return (
      <div className={Styles.taskHeader}>
        <div
          className={Styles.HeaderButton}
          onClick={() => this.showModal()}
        >
          新建任务
        </div>
        <Modal
          visible={this.state.visible}
          closable
          onCancel={() => this.handleCancel()}
          footer={null}
          style={{ marginLeft: '25vw' }}
          width={'65vw'}
        >
          <CreatePlan />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(TaskHeader);
