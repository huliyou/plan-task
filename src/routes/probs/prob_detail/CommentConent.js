import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
const FormItem = Form.Item
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const CommentConent = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
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
        probItem:item,
      }
      onOk(data)
      resetFields()
    })
  }


  
  return (
      <Form layout="horizontal">
         <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probId', {
            initialValue: item.probId,
          })}
        </FormItem>
         <FormItem label="转交说明：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('discussCentent', {
           
          })
            (<Input type="textarea" rows={4} />)
        }
        </FormItem>
      </Form>
  )
}

CommentConent.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(CommentConent)
