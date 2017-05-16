import { Modal, Button,Tree, Input, InputNumber, Form, Row, Col, Select, TreeSelect} from 'antd';
import React, {PropTypes} from 'react';
import Config from '../../../utils/config';
var $ =require('jquery');
function getAjaxData(url,type,obj,sentdata){
 $.ajax({
       url:url,
       type:type,
       data:'param='+JSON.stringify(obj),
       datatype:'json',
       async:true,
       success:function(data){
       	sentdata(data)
       },
       error:function(data){
           sentdata(data)
       }

      })
}

const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item

function onChange(date, dateString) {
	  console.log(date, dateString);
	}

//form表单label样式设置
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}


let ConfLayout = React.createClass({
    //1.创建阶段
    getDefaultProps:function() {
        return {};
    },

    //2.实例化阶段
    getInitialState:function() {
        return {};
    },

    //render之前调用，业务逻辑都应该放在这里，如对state的操作等
    componentWillMount:function() {
    	//prjTypeId项目类型id，templetId模板id，tPlanId计划模板id，tTempletTitle模板计划标题,tParentPlanCode父计划,tPlanDesc计划模板描述
    	this.setState({prjTypeId:"",templetId:"",tPlanId:"",tTempletTitle:"",
    		tParentPlanCode:"",tPlanDesc:""});
    	this.initPrjTypeTree();    	
    },
    
    
    //渲染并返回一个虚拟DOM
    render:function() {
    	const { getFieldDecorator } = this.props.form;
        return(
    		<div style={{color:"red"}}>
    			<br/><br/><br/><br/>
	    		<Form onSubmit={this.handleSubmit} >
				   <FormItem label={this.props.state.tilteName}  hasFeedback {...formItemLayout}  >
						{getFieldDecorator('tplanTitle', {
						  initialValue: this.props.state.selectedTempletPlan.tplanTitle,
						  rules: [
						    {
						      required: true,
						      message: '标题未填写',
						    },
						  ],
						})(<Input />)}
				  </FormItem>
				
				<FormItem label={this.props.state.selectTreeName} hasFeedback {...formItemLayout}>
					{getFieldDecorator('tparentPlanCode', {
					  initialValue: this.props.state.selectedTempletPlan.tparentPlanCode,
					  rules: [
					    {
					      required: false,
					      message: '父计划不能为空！',
					    },
					  ],
					})(<TreeSelect
       			         style={{ width: 150 }}
			         dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			         placeholder="请选择"
			         allowClear
			         treeDefaultExpandAll>
			        	{this.props.state.selectTreeNodes}
			       </TreeSelect>)}
				</FormItem>
				
				<FormItem label="计划描述：" hasFeedback {...formItemLayout}>
					{getFieldDecorator('tplanDesc', {
					  initialValue:  this.props.state.selectedTempletPlan.tplanDesc,
					  rules: [
					    {
					      required: false,
					      message: '内容未填写',
					    },
					  ],
					})(<Input type="textarea" rows={7} />)}
				</FormItem>
				
				<FormItem
		          wrapperCol={{
		            xs: { span: 34, offset: 0 },
		            sm: { span: 26, offset: 10 },
		          }}
		        >
		          <Button type="primary" onClick={this.handleSubmit}  size="large">保存</Button>
		          &nbsp;&nbsp;&nbsp;&nbsp;
		          <Button  size="large" onClick={this.handleReset}>取消</Button>
		        </FormItem>
		        
				</Form>
            </div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
    	console.log("componentDidMount");
    },
    
    handleCancel:function() {
    	this.setState({visible:false,});
      },
    /**
     * 执行保存更新按钮响应事件处理方法
     */
    handleSubmit:function(){
    	this.props.form.validateFields((errors) => {
	   	     if (errors) {
	   	        return
	   	     }
	   	     //获取当前表单信息
	   	     const data = {
	   	    	...this.props.form.getFieldsValue()    
	   	     }
	   	    let obj={};
	   	  	if(this.props.state.selectedNodeType=="P"){
		   	  	obj.templetId=this.props.state.selectedTempletPlan.templetId;//模板id
		   	    obj.tplanId=this.props.state.selectedTempletPlan.tplanId;//计划id
		   	  	obj.tplanTitle=data.tplanTitle;//计划标题
		   	    obj.tplanDesc=data.tplanDesc;//计划描述
		   	  	obj.tparentPlanCode=data.tparentPlanCode;//父计划节点
//		   	  	obj.tparentPlanCode=this.props.state.selectedTempletPlan.tparentPlanCode;//父计划节点
//		   	  	alert("tplanId:"+obj.tplanId+"====="+"tparentPlanCode:"+obj.tparentPlanCode);
		   	  	obj.isUse=0;//是否使用
		   	  	if (this.props.state.selectedTempletPlan.templetId != "" && data.tparentPlanCode == "") {
//		   	  		alert("firstcreated");
		   	  		obj.actionType="firstcreated";
		   	  		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/savePlanTemplet','get',obj,this.initTempletPlanTree);
				}
		   	  	else if (this.props.state.selectedTempletPlan.templetId != "" && this.props.state.selectedTempletPlan.tplanId == "") {
//		   	  		alert("created");
		   	  		obj.actionType="created";
		   	  		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/savePlanTemplet','get',obj,this.initTempletPlanTree);
				}
		   	  	else if (this.props.state.selectedTempletPlan.templetId != "" && data.tparentPlanCode != "")
		  		{
//		   	  		alert("update");
		   	  		obj.actionType="update";
		   	  		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/savePlanTemplet','get',obj,this.initTempletPlanTree);
		  		}
		   	  	else 
		   	  	{
		   	  		alert("请选择模板");
		   	  	}
		   	  	console.log("obj",obj);
//	   	  	    if(this.props.state.selectedTempletPlan.templetId){
//	   	  	    	getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/savePlanTemplet','get',obj,this.initTempletPlanTree);
//			   	  	this.props.setSelectedTempletPlan([this.props.state.selectedTempletPlan.tplanId,this.props.state.selectedTempletPlan.templetId,
//					                                   'P',data.tplanTitle,data.tplanDesc,data.tparentPlanCode]);
//	   	  	    }else
//	   	  	    	{
//	   	  	    	alert("请选择模板");
//		   	  	
//	   	  	    	}
	   	  	}else if(this.props.state.selectedNodeType=="M"){
	   	  		obj.templetId = this.props.state.selectedTempletPlan.templetId;
	   	  		obj.templetName = data.tplanTitle;//模板标题
	   	  		obj.templetDesc=data.tplanDesc;//模板描述	
		   	  	obj.prjTypeId = data.tparentPlanCode;//项目类型id
		   	  	obj.companyId = "529ffd4733e611e7bbc2005056a42951";//公司id
		   	  	obj.isUse = "0";//是否使用
		   	  	if(obj.templetId=="")//判断新增或更新模板
		  		{
		   	  		obj.actionType="created";
		  		}
		   	  	else
		  		{
//		   	  		alert(obj.templetId);
		   	  		obj.actionType="update";
		  		}
		   	  	console.log("obj",obj);
   	  	    	getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/saveProcTempletInf','get',obj,this.initTempletPlanTree);
//		   	  	this.props.setSelectedTempletPlan([this.props.state.selectedTempletPlan.tplanId,this.props.state.selectedTempletPlan.templetId,
//				                                   'P',data.tplanTitle,data.tplanDesc,data.tparentPlanCode]);
		   }
   	    })
    },
    
      
    initTempletPlanTree:function() {
    	let obj={};
		obj.companyId="529ffd4733e611e7bbc2005056a42951";//项目ID
		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/getTempletPlanAllList','get',obj,this.refrashTree);
    },
    
    refrashTree:function(data) {
        this.props.setTempletPlanTreeNodes(data.resultValue.items);
    },
    
    
    initPrjTypeTree:function() {
    	let obj={};
		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/getPrjTypeList','get',obj,this.props.refrashPrjTypeTree);
    },
       
    
    /**
     * 清除表单信息
     */
    handleReset :function() {
        this.props.form.resetFields();
      },
       
});
export default Form.create()(ConfLayout);