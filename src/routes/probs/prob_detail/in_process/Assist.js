import React, { PropTypes } from 'react'
import Config from '../../../../utils/config'
import {connect} from 'dva';
import { Form,Modal, TreeSelect,Select,Button, Icon } from 'antd'
const FormItem = Form.Item;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}


//选择人
const treeData = [
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

const tProps = {
      treeData,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      style: {
        width: 300,
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
    setFieldsValue,
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
        probItem:item,
      }
      onOk(data)
      resetFields()
    })
  }

  const modalOpts = {
    title:'选择人员', 
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

         <FormItem label="姓名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('goalPartakeUser', {
              rules: [
              {
                required: true,
                message: '姓名未填写',
              },
            ],
          })
            (<TreeSelect {...tProps} />)
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
function mapStateToProps(state, ownProps) {
    return {
       ...state
    };
}
export default connect(mapStateToProps)(Form.create()(modal));

