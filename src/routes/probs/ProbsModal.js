import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon, TreeSelect  } from 'antd'
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const TreeNode = TreeSelect.TreeNode;
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
    title: `${type === 'create' ? '新建问题' : '修改问题'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
//处理人
const treeData2 = [{
  label: '项目组一',
  value: '项目组一',
  key: '项目组一',
  children: [{
    label: '张三',
    value: '张三',
    key: '张三',
  }, {
    label: '李四',
    value: '李四',
    key: '李四',
  }],
}, {
  label: '项目组二',
  value: '项目组二',
}];
//问题类型
const treeData3 = [{
  label: '工程',
  value: '工程',
  key: '工程',
  children: [{
    label: '技术',
    value: '技术',
    key: '技术',
  }, {
    label: '人力',
    value: '人力',
    key: '人力',
  }],
}];

//问题来源
const treeData = [{
  label: '工程一',
  value: '工程一',
  key: '工程一',
   children: [{
     label: '项目组一',
     value: '项目组一',
     key: '项目组一',
   }],
 }, {
  label: '工程二',
  value: '工程二',
  key: '工程二',
   children: [{
     label: '项目组一',
     value: '项目组一',
     key: '项目组一',
   }, {
  label: '项目组二',
  value: '项目组二',
  key: '项目组二',
  }, {
  label: '项目组三',
  value: '项目组三',
  key: '项目组三',
 }],
}];

const tProps = {
      treeData,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      // searchPlaceholder: '请选择问题来源',
      style: {
        width: 300,
      },
    };




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
  // defaultFileList: [{
  //   uid: 1,
  //   name: 'xxx.png',
  //   status: 'done',
  //   reponse: 'Server Error 500',  // custom error message to show
  //   url: 'http://www.baidu.com/xxx.png',
  // }, {
  //   uid: 2,
  //   name: 'yyy.png',
  //   status: 'done',
  //   url: 'http://www.baidu.com/yyy.png',
  // }, {
  //   uid: 3,
  //   name: 'zzz.png',
  //   status: 'error',
  //   reponse: 'Server Error 500',  // custom error message to show
  //   url: 'http://www.baidu.com/zzz.png',
  // }],
  //  // <FormItem label="处理期限：" hasFeedback {...formItemLayout}>
        //   {getFieldDecorator('dueDate', {
        //     initialValue:item.dueDate,
        //     rules: [
        //       {
        //         // required: true,
        //         // message: '不能为空',
        //       },
        //     ],
        //   })(
        //    <DatePicker onChange={onChange}/>
        //     )}
        // </FormItem>


  // function onChange(date, dateString) {
  //   console.log(date, dateString);
  // }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
         <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probId', {
            initialValue: item.probId,
          })}
        </FormItem>

        <FormItem hasFeedback {...formItemLayout}>
          {getFieldDecorator('probCode', {
            initialValue: item.probCode,
          })}
        </FormItem>
        
        <FormItem label="标题：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('probTitle', {
            initialValue: item.probTitle,
            rules: [
              {
                required: true,
                message: '标题未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        
        <FormItem label="问题来源：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('prjId', {
            initialValue: item.prjId,
          })(          
            <Input/>
          )}
        </FormItem>
         <FormItem label="处理人：" asFeedback {...formItemLayout}>
          {getFieldDecorator('solveUser', {
            initialValue:item.solveUser,
            rules: [
                {
                 required: true, 
                 message: '处理人不能为空 !' ,
               },
            ],
          })(
             <TreeSelect style={{ width: 300 }} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData2}
        placeholder="请选择处理人"
        treeDefaultExpandAll
      />
          )}
        </FormItem>
        <FormItem label="问题类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('probTypeId', {
            initialValue:item.probTypeId,
            rules: [
               { 
                required: true, 
                message: '问题类型不能为空!' 
              },
            ],
          })(
            <TreeSelect style={{ width: 300 }} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData3}
              placeholder="请选择问题类型"
              treeDefaultExpandAll/>)}
        </FormItem>        
       <FormItem label="问题紧急程度：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('probLevel',{
            initialValue:item.probLevel,
            rules:[
              {
              required:true,
              message:'请填写问题紧急程度',
            },
            ],
          })(
            <Select>
              <Option value="1">一般</Option>
              <Option value="2">紧急</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="联系电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('tel',{
            initialValue:item.tel,
            rules:[
              {
                required:true,
                message:'联系电话不能为空',
              }
            ]
          })(
              <Input/>
          )}
        </FormItem>
        <FormItem label="是否督办" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isSupervise', {
            initialValue: item.isSupervise,
            rules: [
              {
                required: true,
                message: '请选择是否督办',
              },
            ],
          })(
            <Radio.Group>
              <Radio value ="0">是</Radio>
              <Radio value="1">否</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="问题描述：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('probDescribe', {
            initialValue: item.probDescribe,
            rules: [
              {
                required: true,
                message: '问题描述未填写',
              },
            ],
          })(<Input type="textarea" rows={4} />)}
        </FormItem>
        <FormItem label="附件：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {            
            rules: [
              {
                
                // message: '附件不能为空',
              },
            ],
          })(
           <Upload {...props}>
             <Button>
                <Icon type="upload" /> Upload
            </Button>
          </Upload>
          )}
        </FormItem>
        <FormItem label="关联问题：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('relProbId', {
            initialValue: item.relProbId,           
          })(
            <Select>
              <Option value="1">文件不能上传</Option>
              <Option value="2">提示不明确</Option>
            </Select>
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
