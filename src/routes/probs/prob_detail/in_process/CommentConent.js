import React, { PropTypes } from 'react'
import { Form,Col, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
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
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
      resetFields()
    })
  }


  return (
  	<div>
      <Form layout="horizontal">
         <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probId', {
            initialValue: item.probId,
          })}
        </FormItem>
         <FormItem>
          {getFieldDecorator('discussCentent', {
           
          })
            (<Input type="textarea" rows={4} />)
        }
        </FormItem>
      </Form>
      <Col span={2} style={{ textAlign: 'right' }}><Button type="ghost" onClick={handleOk}>评论</Button></Col>
  	</div>
  )
}

CommentConent.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(CommentConent)
