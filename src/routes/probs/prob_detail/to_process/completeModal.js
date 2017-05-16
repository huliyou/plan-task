import { Modal, Button, Input, Form, Rate} from 'antd';
import React, {PropTypes} from 'react';

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
} 
 
class CompleteModal extends React.Component {
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
        <Button type="primary" onClick={this.showModal}>问题评价</Button>
        <Modal title="问题评价" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}>
         
         <FormItem label="满意度：" hasFeedback {...formItemLayout}>
          {(<Rate/>)}
        </FormItem>

          <FormItem label="质量：" hasFeedback {...formItemLayout}>
          {(<Rate/>)}
         </FormItem>

        <FormItem label="及时性：" hasFeedback {...formItemLayout}>
          {(<Rate/>)}
        </FormItem>

        </Modal>
      </div>
    );
  }
}
export default CompleteModal;