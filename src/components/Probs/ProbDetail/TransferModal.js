import React, { PropTypes } from 'react'
import { Form, Input, InputNumber,TreeSelect, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
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
      }
      onOk(data)
      resetFields()
    })
  }

  const modalOpts = {
    title:'转交问题！',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

     //处理人
const treeData2 = [
  {
    label: '赵振鲁',
    value: '赵振鲁',
    key: '赵振鲁'
  },{
    label: '刘雁鸣',
    value: '刘雁鸣',
    key: '刘雁鸣'
  },{
    label: '高岩',
    value: '高岩',
    key: '高岩'
  },{
    label: '申玮玮',
    value: '申玮玮',
    key: '申玮玮'
  },{
    label: '吴海滨',
    value: '吴海滨',
    key: '吴海滨'
  },{
    label: '丁云峰',
    value: '丁云峰',
    key: '丁云峰'
  },{
    label: '柴宏伟',
    value: '柴宏伟',
    key: '柴宏伟'
  },{
    label: '高波',
    value: '高波',
    key: '高波'
  },{
    label: '王鹏',
    value: '王鹏',
    key: '王鹏'
  },{
    label: '曲良宵',
    value: '曲良宵',
    key: '曲良宵'
  }
];

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
         <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probId', {
            initialValue: item.probId,
          })}
        </FormItem>
      

       <FormItem label="处理人：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('partakeUser', {
           rules: [
              {
                required: true,
                message: '处理人未填写',
              },
            ],
          })
            (<TreeSelect style={{ width: 300 }} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData2}
        placeholder="请选择处理人"
        treeDefaultExpandAll
      />)
        }
        </FormItem>

         <FormItem label="转交说明：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
           rules: [
              {
                required: true,
                message: '转交说明未填写',
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
