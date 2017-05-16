import React, { PropTypes } from 'react'
import { Form, Modal, Button, Icon, Rate,Input  } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: { 
    span: 14,
  },
}
 
const Evaluate = ({
  disabled = true,
  item = {},
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
    getFieldsValue,
  },
}) => {
  return (
      <Form layout="horizontal">
         <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probId', {
            initialValue: item.probId,
          })}
        </FormItem>
       <FormItem label="满意度：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('satisfaction', {
           	initialValue: item.satisfaction,
          })
            (<Rate disabled={disabled} value = {3}/>)
        }
        </FormItem>
        <FormItem label="质量：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('quality', {
           	initialValue: item.quality,
          })
            (<Rate disabled={disabled} value = {3}/>)
        }
        </FormItem>
        <FormItem label="及时性：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('timely', {
           	initialValue: item.timely,
          })
            (<Rate disabled={disabled}/>)
        }
        </FormItem>
      </Form>
  )
}
Evaluate.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
}

export default Form.create()(Evaluate)
