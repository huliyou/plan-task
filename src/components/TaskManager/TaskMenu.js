import React, { PropTypes } from 'react';
import Styles from './task.less';
import { Tree, Menu, Popover, Modal } from 'antd';
const TreeNode = Tree.TreeNode;
import CreatePlan from './CreatePlan.js';
import EditPlan from './EditPlan.js';
import ChangePlan from './ChangePlan.js';
import CreateChildPlan from './CreateChildPlan.js';
import DeletePlan from './DeletePlan.js';
import FilePlan from './FilePlan.js';
import editIcon from './taskImg/editIcon.png';
import tanhao from './taskImg/tanhao.png';

const SubMenu = Menu.SubMenu;

class TaskMenu extends React.PureComponent {
    static propTypes = {
      taskMenu: PropTypes.array,
      createChildPlanAction: PropTypes.func,
      createTaskAction: PropTypes.func,
      editPlanAction: PropTypes.func,
      delectTaskByPlanId: PropTypes.func,
      collectPlanAction: PropTypes.func,
      fileTaskByPlanId: PropTypes.func,
      changePlan: PropTypes.func,
    }
    state = {
      visible: false,
      selectId: 0,
      procId: 0,
      tree: this.props.planItems.filter(item => !item.parentPlanCode),
    }
    showModal = (id) => {
      this.setState({ visible: true, selectId: id });
    }
    handleOk = (type, param) => {
      this.setState({ visible: false });
      const params: Object = Object.assign(param, { planId: this.state.planId });
      // TODO 执行提交操作
      if(type === 1) {
        // 提交子计划
        this.props.createChildPlanAction(params);
      }
      if(type === 2) {
        // 变更计划
        this.props.changePlan(params);
      }
      if(type === 3) {
        // 新建任务
        this.props.createTaskAction(params);
      }
      if(type === 4) {
        // 编辑计划
        this.props.editPlanAction(params);
      }
      if(type === 5) {
        // 归档
        this.props.fileTaskByPlanId(params);
      }
      if(type === 6) {
        // 删除
        this.props.delectTaskByPlanId(params);
      }
      if(type === 7) {
        // 收藏
        this.props.collectPlanAction(params);
      }
    }
    handleCancel = () => {
      this.setState({ visible: false });
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
        return <TreeNode title={this.planComponents(item)} key={item.planId}>{this.renderTreeNode(item.children)}</TreeNode>;
      }
      return <TreeNode title={this.planComponents(item)} key={item.planId} isLeaf={item.isLeaf === 'false' ? false : true } />;
    });
  }
  planComponents(item) {
    return (
      <div style={{ fontSize: '15px', height: '25px' }}>
        {item.planTitle}&nbsp;&nbsp;50%&nbsp;&nbsp;
        <Popover
          content={this.getContent(item.procId)} placement="bottom" trigger="click"
        >
           <img src={tanhao} width="16px" />
        </Popover>&nbsp;&nbsp;
        <Popover content={this.getListContent(item.procId)} placement="bottom" trigger="click">
           <img src={editIcon} width="13px" />
        </Popover>
      </div>
    )
  }
  getContent(procId){
    return (
      <div style={{ fontSize: '15px', padding: '2vh' }}>
        <div>任务个数  5</div>
        <div>(含子计划)  0</div>
        <div>估算工时（人/天）  240</div>
        <div>(含子计划)  0</div>
        <div>17.03.01-13.03.30  30</div>
        <div style={{ color: 'red' }}>延期任务  1</div>
      </div>
    );
  }
  getListContent(procId) {
    this.setState({ procId });
    return (
      <div style={{ fontSize: '15px' }}>
         <div className={Styles.smallDiv} onClick={() => this.showModal(1)}>新建子计划</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(2)}>变更计划</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(3)}>新建任务</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(4)}>编辑计划</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(5)}>归档</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(6)}>删除</div>
         <div className={Styles.smallDiv} onClick={() => this.showModal(7)}>收藏计划</div>
      </div>
    );
  }
  showModalContent() {
    const selectId = this.state.selectId;
    const visible = this.state.visible;
    const view = [];
    if(selectId === 1) {
      view.push(
        <CreateChildPlan
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      )
    }
    if(selectId === 2) {
      view.push(
        <ChangePlan
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      )
    }
    if(selectId === 3) {
      view.push(
        <CreatePlan
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      )
    }
    if(selectId === 4) {
      view.push(
        <EditPlan
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      );
    }
    if(selectId === 5) {
      view.push(
        <FilePlan
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      );
    }
    if(selectId === 6) {
      view.push(
        <DeletePlan
          visible={visible}
          handleCancel={() => this.handleCancel()}
          handleOk={(type, params) => this.handleOk(type, params)}
        />
      );
    }
    if(selectId === 7) {
      // 执行收藏的操作
      this.handleOk(7);
    }
    return view;
  }
  render() {
    return (
      <div>
        <Tree onSelect={this.onSelect} loadData={(node) => this.onLoadData(node)}>
          {this.renderTreeNode(this.state.tree)}
        </Tree>
        <div
          style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}
          onClick={() => this.showModal(3)}
        >
          <span style={{ color: '#80E6BD', fontSize: '20px', marginRight: '10px' }}>+</span>新建计划
        </div>
        {this.showModalContent()}
      </div>
    );
  }
}

export default TaskMenu;
