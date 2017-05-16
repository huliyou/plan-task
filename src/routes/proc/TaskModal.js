import React, { PropTypes } from 'react'
import { Form,Row,TreeSelect, Col, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
// const { MonthPicker, RangePicker } = DatePicker
import { Search } from '../../components'
import UserFilter  from './UserFilter';

const FormItem = Form.Item

const Option = Select.Option;
const formItemLayout = {
	  labelCol: {
		    span: 6,
		  },
		  wrapperCol: {
		    span: 10,
		  },
}

const widthFormItemLayout = {
		  labelCol: {
		    span: 8,
		  },
		  wrapperCol: {
		    span: 10,
		  },
		}
const TreeNode = TreeSelect.TreeNode;
const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
       
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '任务关联' : '任务关联'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  
  
  const props = {
		  action: '',
		  name: 'file',
		  multiple: true,
		  showUploadList: false,
		  onChange({ file, fileList }) {
		    if (file.status !== 'uploading') {
		      console.log(file, fileList);
		    }
		  },
	 };

  return (
		  <Modal  {...modalOpts}>
	      <Form layout="horizontal">
	      <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('procId', {
            initialValue: item.procId,
          })}
        </FormItem>	   
        
       
        
         <FormItem label="添加关联项目" hasFeedback {...formItemLayout} >
         </FormItem>
        
	<Row>
	     <Col span={60}>
	        <FormItem label="项目名称：" hasFeedback {...widthFormItemLayout} >
	          {getFieldDecorator('themeName', {
	            initialValue:item.themeName,
	            rules: [
	              {
	                required: true,
	                message: '项目名称未填写',
	              },
	            ],
	          })(<Input style={{ width: 250 }} />)}
	      </FormItem>
	      </Col>
 
	  </Row>	
	  
	  <Row>
		 <Col span={60}>   
		     <FormItem label="issue编号：" hasFeedback {...widthFormItemLayout}>
		     </FormItem>
		  </Col> 
		  <Col>
	       <Search />
	     </Col>
	 </Row>
	 
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
