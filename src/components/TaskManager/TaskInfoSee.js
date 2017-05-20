
import React, { PropTypes } from 'react';
import { Button, Modal, Collapse } from 'antd';
import * as Styles from './task.less';

const Panel = Collapse.Panel;

class TaskInfoSee extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    procId: PropTypes.number,
    handleCancel: PropTypes.func,
  };
  componentWillMount() {
    // 按任务序号获取任务详细信息
  }
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={() => this.props.handleCancel()}
        closable
        footer={null}
        style={{ marginLeft: '25vw' }}
        width={'65vw'}
      >
      <div style={{ padding: '5vh' }}>
        <div>#1 【需求】</div>
        <div />
        <div>业务需求评审</div>
        <div>dsfsd</div>
        <div>创建与 2017-04-02</div>
        <div />
        <Collapse defaultActiveKey={['1']}>
          <Panel header="字段" key="1">
            <p>rwerwr</p>
          </Panel>
          <Panel header="内容" key="2">
            <p>rewrew</p>
          </Panel>
          <Panel header="关联任务" key="3">
            <p>ewrwer</p>
          </Panel>
          <Panel header="任务层级" key="4">
            <p>ferwr</p>
          </Panel>
          <Panel header="附件" key="5">
            <p>rwerwr</p>
          </Panel>
          <Panel header="动态" key="6">
            <p>rwerwe</p>
          </Panel>
        </Collapse>
      </div>
    </Modal>
    );
  }
}
export default TaskInfoSee;
