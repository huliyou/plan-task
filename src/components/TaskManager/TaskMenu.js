import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Menu, Popover, Modal } from 'antd';
import CreatePlan from './CreatePlan.js';
import EditPlan from './EditPlan.js';
import ChangePlan from './ChangePlan.js';
import CreateChildPlan from './CreateChildPlan.js';

const SubMenu = Menu.SubMenu;

class TaskMenu extends React.PureComponent {
    static propTypes = {
      taskMenu: PropTypes.array,
    }
    state = {
      visible: false,
      onSelectPlanId: 0,
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
  showMenu(taskMenu) {
    const View = [];
    if(taskMenu) {
      taskMenu.forEach((value) => {
        if (value.planChild) {
          View.push(
            <SubMenu key={value.planId} title={
              <div style={{ fontSize: '1.5rem' }}
                onClick={() => this.setState({ onSelectPlanId: value.planId })}
              >
                {value.planTitle}
              </div>
            }
            >
              {this.showMenu(value.planChild)}
            </SubMenu>
          );
        } else {
          View.push(
            <Menu.Item key={value.planId}>
              <div style={{ fontSize: '1.5rem' }}
               onClick={() => this.setState({ onSelectPlanId: value.planId })}
              >{value.planTitle}</div>
            </Menu.Item>
          );
        }
      });
    }
    return View;
  }
  render() {
    return (
      <div>
        <Menu
          style={{ width: '100%' }}
          mode="inline"
        >
          {this.showMenu(this.props.taskMenu)}
        </Menu>
        <div
          style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}
          onClick={() => this.showModal()}
        >
          + 新建任务
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

export default TaskMenu;
