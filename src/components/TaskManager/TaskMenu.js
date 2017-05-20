import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Tree, Menu, Popover, Modal } from 'antd';
const TreeNode = Tree.TreeNode;
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
      tree: this.props.planItems.filter(item => !item.parentPlanCode),
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
  onSelect = (info) => {
  }
  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      const id = treeNode.props.eventKey;
      const children = this.props.planItems.filter(item => item.parentPlanCode === id);
      const results = this.state.tree;
      function loop(datas, id, children) {
        let result = datas;
        let index;
        datas.forEach((data, key) => {
          if (data.planId === id ) {
            data.children = children;
            result[key] = data;
          } else if (data.children) {
            result[key].children = loop(data.children, id, children);
          }
        });
        return result;
      }
      this.setState({
        tree: [ ...loop(results, id, children)],
      });
      resolve();
    });
  }
  renderTreeNode(data) {
    return data.map(item => {
      if (item.children) {
        console.warn(item);
        return <TreeNode title={item.planTitle} key={item.planId}>{this.renderTreeNode(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.planTitle} key={item.planId} isLeaf={item.isLeaf === 'false' ? false : true } />;
    });
  }
  render() {
    console.error(this.state.tree);
    return (
      <div>
        <Tree onSelect={this.onSelect} loadData={(node) => this.onLoadData(node)}>
          {this.renderTreeNode(this.state.tree)}
        </Tree>
        {/* <Menu
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
        <CreatePlan
          visible={this.state.visible}
        /> */}
      </div>
    );
  }
}

export default TaskMenu;
