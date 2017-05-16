import React, { PropTypes } from 'react'
import Config from '../../../utils/config'
import { Form, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon, TreeSelect  } from 'antd'
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const TreeNode = TreeSelect.TreeNode;
const SHOW_ALL = TreeSelect.SHOW_ALL;
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
 const treeData = [
  {
    label: '外部导入',
    value: '外部导入',
    key: '外部导入'
  },{
    label: '本地添加',
    value: '本地添加',
    key: '本地添加'
  },
];

const tProps = {
      treeData,
      multiple: false,
      //treeCheckable: true,
      showCheckedStrategy: SHOW_ALL,
      // searchPlaceholder: '请选择问题来源',
      style: {
        width: 300,
      },
    };




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
        //resetFields();
        fileList.map((item,index)=>{
          console.log('item==='+item)
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

  const regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$"; 

    function onChange(date, dateString) {
  console.log(date, dateString);
}
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
             initialValue:item.prjId,
          })(          
            <TreeSelect {...tProps} />
          )}
        </FormItem>
       
         <FormItem label="问题负责人：" asFeedback {...formItemLayout}>
          {getFieldDecorator('solveUser', {
            initialValue:item.solveUser,
            rules: [
                {
                 required: true, 
                 message: '问题负责人不能为空 !' ,
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

        <FormItem label="处理期限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dueDate', {
            initialValue:item.dueDate,
            rules: [
               { 
                required: true, 
                message: '处理期限不能为空!' 
              },
            ],
          })(
           <DatePicker onChange={onChange}/>
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
              },{ 
                validator(rule, values, callback){
                  if(values.match(regex)){
                    callback()
                  }else{
                    callback('请填写正确手机号码')
                  }
                }
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
        <FormItem label="关联问题：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('relProbId', {
            initialValue: item.relProbId,
            rules: [
              {
                // message: '关联问题不能为空',
              },
            ],
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
