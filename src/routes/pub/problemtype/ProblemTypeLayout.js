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


let ProblemTypeLayout = React.createClass({
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
    	//prjTypeId项目类型id，templetId模板id，probTypeId计划模板id，tTempletTitle模板计划标题,tParentPlanCode父计划,probTypeDesc计划模板描述
    	this.setState({prjTypeId:"",templetId:"",probTypeId:"",tTempletTitle:"",
    		upTypeId:"",probTypeDesc:""});
//    	this.initProblemTypeTree();    	
    },
    
    
    //渲染并返回一个虚拟DOM
    render:function() {
    	const { getFieldDecorator } = this.props.form;
        return(
    		<div style={{color:"red"}}>
    			<br/><br/><br/><br/>
	    		<Form onSubmit={this.handleSubmit} >
				   <FormItem label="问题类型："  hasFeedback {...formItemLayout}  >
						{getFieldDecorator('probTypeName', {
						  initialValue: this.props.state.selectedProblemType.probTypeName,
						  rules: [
						    {
						      required: true,
						      message: '类型未填写！',
						    },
						  ],
						})(<Input />)}
				  </FormItem>
				
				<FormItem label="上级类型：" hasFeedback {...formItemLayout}>
					{getFieldDecorator('upTypeId', {
					  initialValue: this.props.state.selectedProblemType.upTypeId,
					  rules: [
					    {
					      required: false,
					      message: '父类型不能为空！',
					    },
					  ],
					})(<Input />)}
				</FormItem>
				
				<FormItem label="类型描述：" hasFeedback {...formItemLayout}>
					{getFieldDecorator('probTypeDesc', {
					  initialValue:  this.props.state.selectedProblemType.probTypeDesc,
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
	   	     console.log("form.getFieldsValue",data);
	   	    let obj={};
	   	    obj.probTypeId=this.props.state.selectedProblemType.probTypeId;//计划id
	   	  	obj.probTypeName=data.probTypeName;//问题分类标题
	   	    obj.probTypeDesc=data.probTypeDesc;//问题分类描述
	   	    obj.isUse='0';//是否可用，‘0’可用，‘1’不可用
   	  		obj.actionType="created";
   	  		getAjaxData(Config.baseURL+'/csm_prob/rest/probtype/saveOrUpdateProbType','get',obj,this.props.initProblemTypeTree);
   	    })
    },
    
    
    /**
     * 清除表单信息
     */
    handleReset :function() {
        this.props.form.resetFields();
      },
       
});
export default Form.create()(ProblemTypeLayout);