import { Modal, Button, Input, Form, TreeSelect } from 'antd';
import React, {PropTypes} from 'react';

const TreeNode = TreeSelect.TreeNode;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

    const treeData = [{
    label: '工程一',
    value: '工程一',
    key: '工程一',
     children: [{
       label: '项目组一',
       value: '项目组一',
       key: '项目组一',
     }],
   }, {
    label: '工程二',
    value: '工程二',
    key: '工程二',
     children: [{
       label: '项目组一',
       value: '项目组一',
       key: '项目组一',
     }, {
    label: '项目组二',
    value: '项目组二',
    key: '项目组二',
    }, {
    label: '项目组三',
    value: '项目组三',
    key: '项目组三',
   }],
  }];
  const tProps = {
      treeData,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择问题来源',
      style: {
        width: 300,
      },
    };
class ShowModal extends React.Component {
  static get propTypes(){
        return {
            data : PropTypes.object.isRequired
        };
    }
  state = { visible: false }
  showModal = () => {
    this.setState({ 
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>转交</Button>
        <Modal title="提交问题" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}>
         
         <FormItem label="处理人：" hasFeedback {...formItemLayout}>
          {(<TreeSelect {...tProps} />)}
        </FormItem>

          <FormItem label="转交说明：" hasFeedback {...formItemLayout}>
          {(<Input type="textarea" rows={4} />)}
        </FormItem>


        </Modal>
      </div>
    );
  }
}
export default ShowModal;