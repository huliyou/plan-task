import React, { PropTypes } from 'react'
import { Form,Row,TreeSelect, Col, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
// const { MonthPicker, RangePicker } = DatePicker
const FormItem = Form.Item

const Option = Select.Option;
const formItemLayout = {
	  labelCol: {
		    span: 8,
		  },
		  wrapperCol: {
		    span: 16,
		  },
}

const widthFormItemLayout = {
		  labelCol: {
		    span: 4,
		  },
		  wrapperCol: {
		    span: 20,
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
    title: `${type === 'create' ? '编辑任务' : '新建任务'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  
  const treeData = [
            {
              label: '功能开发',
              value: '功能开发',
              key: '功能开发'
            },{
              label: '功能测试',
              value: '功能测试',
              key: '功能测试'
            },
          ];
  
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
	      
	<Row>
	     <Col span={12}>
	        <FormItem label="项目：" hasFeedback {...formItemLayout} >
	          {getFieldDecorator('themeName', {
	            initialValue: item.themeName,
	            rules: [
	              {
	                required: true,
	                message: '项目未填写',
	              },
	            ],
	          })(<Input  style={{ width: 150 }} />)}
	      </FormItem>
	      </Col>
 
      
   
		<Col span={12}>  
		     <FormItem label="类型" hasFeedback {...formItemLayout}>
		  	{getFieldDecorator('phaseAct', {
		  	  initialValue:item.phaseAct,
		  	  rules: [
		  	     { 
		  	      required: true, 
		  	      message: '任务类型不能为空!' 
		  	    },
		  	  ],
		  	})(
		  	   <Select placeholder="">
		  	    <Option value="任务">任务</Option>
		  	    <Option value="BUG">BUG</Option>
		  	  </Select>
		  	)}
		  	</FormItem>  
		  </Col>  
	  </Row>	
	  
	  <Row>
		 <Col span={24}>   
		     <FormItem label="标题：" hasFeedback {...widthFormItemLayout}>
		    {getFieldDecorator('planName', {
		      initialValue: item.planName,
		      rules: [
		        {
		          required: true,
		          message: '标题',
		        },
		      ],
		    })(
		      // <Select placeholder="">
		      //   <Option value="male">male</Option>
		      //   <Option value="female">female</Option>
		      // </Select>
		      <Input />
		    )}
		  </FormItem>
		  </Col>   
	 </Row>
	 
		<Row>
		 <Col span={12}>
		  <FormItem label="负责人：" asFeedback {...formItemLayout}>
			{getFieldDecorator('pduty', {
			  initialValue:item.pduty,
			  rules: [
			      {
			       required: true, 
			       message: '负责人不能为空 !' ,
			     },
			  ],
			})(
			  <Input />
			)}
			</FormItem>
		 </Col>   
		 

		 <Col span={12}>
			<FormItem label="所属计划" hasFeedback {...formItemLayout}>
			{getFieldDecorator('planId', {
			  initialValue: item.planId,
			  rules: [
			    {
			      required: true,
			    },
			  ],
			})(
             <TreeSelect style={{ width: 150 }} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
             		treeData={treeData}
             		placeholder="请选择所属计划"
             		treeDefaultExpandAll
		       />)}
			</FormItem>
			</Col>	
     </Row>	

		<Row>
		  <Col span={24}>
			<FormItem label="内容：" hasFeedback {...widthFormItemLayout}>
			{getFieldDecorator('themeDesc', {
			  initialValue: item.themeDesc,
			  rules: [
			    {
			      required: true,
			      message: '内容未填写',
			    },
			  ],
			})(<Input type="textarea" rows={4} />)}
			</FormItem>
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
