import React, { PropTypes } from 'react'
import { request } from '../../utils'
import Config from '../../utils/config'
import {util} from '../../utils/index'
import ProbTable from './ProbTable'
import moment from 'moment';
import { queryByProjectId } from '../../services/pond'
import { Form,message,Table, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon, TreeSelect  } from 'antd'
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true 

const OptGroup  = Select.OptGroup;
const SHOW_ALL = TreeSelect.SHOW_ALL;
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item
const Option = Select.Option;

let tableData = [];
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

//问题类型
const probsType = [{
  label: '信息系统建设类问题',
  value: '信息系统建设类问题',
  key: '信息系统建设类问题',
  children: [{
    label: '人员问题',
    value: '人员问题',
    key: '人员问题',
  }, {
    label: '进度问题',
    value: '进度问题',
    key: '进度问题',
  }, {
    label: '变更问题',
    value: '变更问题',
    key: '变更问题',
  }, {
    label: '软硬件问题',
    value: '软硬件问题',
    key: '软硬件问题',
  }, {
    label: '集成问题',
    value: '集成问题',
    key: '集成问题',
  }, {
    label: '成本问题',
    value: '成本问题',
    key: '成本问题',
  }, {
    label: '其他问题',
    value: '其他问题',
    key: '其他问题',
  }
  ]},
  {
    label: '信息系统应用类问题',
    value: '信息系统应用类问题',
    key: '信息系统应用类问题',
    children: [{
      label: 'BUG类问题',
      value: 'BUG类问题',
      key: 'BUG类问题',
      }, {
      label: '需求类问题',
      value: '需求类问题',
      key: '需求类问题',
      }, {
      label: '咨询类问题',
      value: '咨询类问题',
      key: '咨询类问题',
      }, {
      label: '投诉类问题',
      value: '投诉类问题',
      key: '投诉类问题',
      }
    ]
  }
];

const probsTypeProps = {

  treeData:probsType,
  //multiple: false,
  defaultExpandAll:true,
  showSearch:true,
  treeCheckable: false,
  dropdownStyle:{ maxHeight: 400, overflow: 'auto' },
  showCheckedStrategy: SHOW_ALL,
  // searchPlaceholder: '请选择问题来源',
  style: {
    width: 300,
  },
};

class CreateProbs extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        //visible: false
	        solveUser:props.solveUser
	    };
	    tableData = [];
    }
    handleOk = ()=> {
	    this.props.form.validateFields((errors) => {
	      if (errors) {
	        return
	      }
	      const data = {
	      	probs:tableData,
	        ...this.props.form.getFieldsValue(),
	      }
	      console.log("保存数据",data)
	      this.props.onOk(data)
	      this.props.form.resetFields();
	    })
  	}

  	//关联问题下拉选项改变时 改变table里面的数据
  	handleChange = (value,option)=>{
  		let tempItem = {
  			probId:value,
	      	probTitle:option.props.searchValue,
  		}
  		let status = util.isInArray(tableData,tempItem);
		if(!status){
			tableData.push(tempItem)
		    this.setState({
		      tableData :tableData
		    })
		}
  	}
  	handleMenuClick = (record)=>{
  		let tempItem = {
  			probId:record.probId,
	      	probTitle:record.probTitle,
  		}
  		tableData = util.removeItem(tableData,tempItem)
	    this.setState({
	      tableData :tableData
	    })
  		console.log("删除数据",record)
  	}

  	//选择项目改变时 改变人员下拉框
  	handlePrjIdChange = (value,option)=>{
	  	//console.log('fetching user', value);
	    axios.get(Config.baseURL+'/csm_prob/rest/probPublic/findProjectPerson?projectId='+value)
	      .then((response) => {
		    //console.log("response",response);
		    const { statusText, status } = response
		    let data = response.data.data
		    //console.log("re",data);
		    this.setState({ solveUser:  data});
  		})

  	}  
render() {
    	
	let solveUserSelect=[];
	let fileListMap = [];
    this.state.solveUser.map((item,index)=>{
		let p = [];
	  	item.children.map((_item,_index)=>{
			p.push(<Option key={_item.label} value={_item.label} searchValue={_item.label} >{_item.label}</Option>)
	  	})
      	solveUserSelect.push(
	      	<OptGroup label={item.label}>
	      	{
	      		p
	      	}
	      	</OptGroup>
      	);
    })
    //console.log("solveUser",solveUserSelect);

	const { item, type} = this.props;

	const { getFieldDecorator,setFieldsValue,getFieldsValue } = this.props.form;
	//问题来源
	const prjId = Config.buildDict('project',this.props.dictItems);

	//关联问题的数据字典
	const probsDict = Config.buildDict('prjId',this.props.dictItems);
	
	const regex = /^1(3|4|5|7|8)\d{9}$/; 

	const tableColums = [{
	    title: '标题',
	    dataIndex: 'probTitle',
	    key: 'probTitle',
	  }, {
	    title: '操作',
	    dataIndex: 'options',
	    key: 'options',
	    render: (text, record) => {
	      return (
      		<div>
      			<Button onClick={e => this.handleMenuClick(record)}>附件</Button>
	          	<Button onClick={e => this.handleMenuClick(record)}>删除</Button>
	        </div>
	      )},
	  }]
	  
	//上传文件组件配置
  const upload = {
    action: Config.baseURL+'/csm_prob/rest/probfile/upload',
    name: 'file',
    multiple: false,
    showUploadList: true,
    onChange({ file, fileList }) {
      switch(file.status){
        case 'uploading':
          console.log("正在上传")
          break;
        case 'done':
        //resetFields();
        fileList.map((item,index)=>{
          console.log('item==='+item)
          const fileItem = {
          	fileUrl:item.response.fileUrl,
            fileId:item.response.probFileId,
            fileName:item.response.fileName,
          }
          fileListMap.push(fileItem);
        })
        console.log("fileList  ",fileList)
        console.log("fileListMap  ",fileListMap)
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
    	<Modal 
    		title={type=='create'?'新建问题':'修改问题'}
		    visible={this.props.visible}
		    onOk= {this.handleOk}
		    onCancel={this.props.onCancel}
		    wrapClassName= 'vertical-center-modal'
    	>
		    <Form layout="horizontal">
		    <FormItem hasFeedback {...formItemLayout}>
	          {getFieldDecorator('probId', {
	            initialValue: item.probId,
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
	            <Select
	              showSearch 
	              optionFilterProp="children"
	              onChange = {this.handlePrjIdChange}
	              filterOption={
	                (input, option) => option.props.searchValue.toLowerCase().indexOf(input.toLowerCase()) >= 0
	              }
	            >
	              {
	                prjId
	              }
	            </Select>
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
	          <Select 
	          	showSearch
			    style={{ width: 200 }}
			    filterOption={
	                (input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
	              }
	  		    >
			    {solveUserSelect}
			  </Select>
	          )}
	        </FormItem>
	        <FormItem label="处理期限" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('dueDate', {
	            initialValue:item.dueDate ? moment(item.dueDate) : null,
	            rules: [
	               { 
	                required: true, 
	                message: '处理期限不能为空!' 
	              },
	            ], 
	          })(
	          	<DatePicker dueDate format="YYYY-MM-DD" />
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
	          })( <TreeSelect  {...probsTypeProps} /> )
	        }
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
	              <Option value="一般">一般</Option>
	              <Option value="紧急">紧急</Option>
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
	        <FormItem hasFeedback {...formItemLayout}>
	          {getFieldDecorator('attList', {
	          })}
	        </FormItem>
	        <FormItem label="关联问题：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('choosedProb', {
	            rules: [
	              {
	                message: '关联问题不能为空',
	              },
	            ],
	          })(
	            <Select 
	              showSearch 
	              onSelect={this.handleChange}
	              optionFilterProp="children"
	              filterOption={
	                (input, option) => option.props.searchValue.toLowerCase().indexOf(input.toLowerCase()) >= 0
	              }
	            >
	              {
	              	probsDict
	              }
	            </Select>
	          )}
	        </FormItem>        
	      </Form>
      		<Table pagination={false} columns={tableColums} dataSource={tableData} />
	 	</Modal>
   	)
}


}
export default Form.create({})(CreateProbs);