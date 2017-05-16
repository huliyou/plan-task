import React, { PropTypes } from 'react'
import Config from '../../../utils/config'
import { Form, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
const FormItem = Form.Item

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
      }
      onOk(data)
      resetFields()
    })
  }

  const modalOpts = {
    title:'问题补充',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
//上传文件组件配置
  const upload = {
    action: Config.baseURL+'/csm_prob/rest/probfile/upload',
    data:{
      tableName:'22222222',
      primaryKey:'2222222',
    },
    name: 'file',
    multiple: false,
    showUploadList: true,
    onChange({ file, fileList }) {
      switch(file.status){
        case 'uploading':
          console.log("正在上传")
          break;
        case 'done':
        const fileListMap = [];
        fileList.map((item,index)=>{
          const fileItem = {
            fileId:item.response.probFileId,
            fileName:item.response.fileName,
          }
          fileListMap.push(fileItem);
        })
        console.log("fileListMap  "+fileListMap)
        setFieldsValue({
          attList:fileListMap,
        })
        const data = {
          ...getFieldsValue(),
          //key: item.key,
        }
        console.log(data)
          message.success('文件上传完成！');
          console.log("上传完成")
          break;
        case 'error':
          console.log("上传失败")
          break;
        case 'removed':
          console.log("删除文件")
          break;
      }
     },
    };
  
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
         <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probId', {
            initialValue: item.probId,
          })}
        </FormItem>
      
       <FormItem label="问题描述：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('probDescribe', {
            initialValue: item.probDescribe,
          })(<Input type="textarea" rows={4} />)}
        </FormItem>
        <FormItem label="附件：" hasFeedback {...formItemLayout}>
          {(
              <Upload {...upload}>
                <Button>
                  <Icon type="upload" /> Upload
                </Button>
              </Upload>
            )}
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
