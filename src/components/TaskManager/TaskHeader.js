import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';
import CreatePlan from './CreatePlan.js';

const FormItem = Form.Item;
const Option = Select.Option;

class TaskHeader extends React.PureComponent {
  static propTypes = {
    createTaskAction: PropTypes.func,
  };
  state = {
    visible: false,
  }
  showModal = () => {
    this.setState({ visible: true });
  }
  handleOk = (type, params) => {
    this.setState({ visible: false });
    this.props.createTaskAction(params);
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
        <CreatePlan
          visible={this.state.visible}
          handleOk={(type, params) => this.handleOk(type, params)}
          handleCancel={() => this.handleCancel()}
        />
      </div>
    );
  }
}

export default Form.create()(TaskHeader);
