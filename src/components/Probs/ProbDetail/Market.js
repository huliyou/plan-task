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

const props = {
  action: '',
  name: 'file',
  multiple: true,
  showUploadList: true,
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
   },
  };
  
const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    resetFields,
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
        // key: item.key,
        // probItem:item,
      }
      onOk(data)
      resetFields()
    })
  }

  const modalOpts = {
    title:'入集市',
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
      
       <FormItem label="填写说明：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
           rules: [
              {
                required: true,
                message: '说明未填写',
              },
            ],
          })
            (<Input type="textarea" rows={4} />)
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
