import React, { PropTypes } from 'react'
import { Form, Modal, Button, Icon, Rate  } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: { 
    span: 14,
  },
}
  
const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
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
        //key: item.key,
        //probItem:item,
      }
      onOk(data)
      resetFields()
    })
  }

  const modalOpts = {
    title:'评价',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
         <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probId', {
            initialValue: item.probId,
          })}
        </FormItem>
      
       <FormItem label="满意度：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('satisfaction', {
            rules: [
              {
                required: true,
                message: '满意度未评价',
              },
            ],
          })
            (<Rate />) 
        }
        </FormItem>

        <FormItem label="质量：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('quality', {
           rules: [
              {
                required: true,
                message: '质量未评价',
              },
            ],
          })
            (<Rate />)
        }
        </FormItem>

        <FormItem label="及时性：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('timely', {
           rules: [
              {
                required: true,
                message: '及时性未评价',
              },
            ],
          })
            (<Rate />)
        }
        </FormItem>

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
