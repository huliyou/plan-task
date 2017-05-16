import { Modal, Button, Input,InputNumber, Form, Row, Col,DatePicker,TreeSelect} from 'antd';
import React, {PropTypes} from 'react';
import Config from '../../utils/config';
import moment from 'moment';
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

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const widthFormItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const TreeNode = TreeSelect.TreeNode;
const dateFormat = 'YYYY-MM-DD';
let ShowModal = React.createClass({
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
    	this.setState({visible:false,prjId:"4028b4b15aeee0d9015aef7abfe60003",planTitle:"",planId:"",
    		          planBeginDate:moment(),planEndDate:moment(),parentPlanCode:this.props.state.selectedPlanId,planWorkload:0,planDesc:"",});
    },
    
    
    //渲染并返回一个虚拟DOM
    render:function() {
    	const { getFieldDecorator } = this.props.form;
        return(
        		<div>
                
                <Row>
					<Col span={12}> 
						<Button type="primary" onClick={this.showModal}>新建</Button>
		    		</Col>
		    		<Col span={12}> 
		    			<Button type="primary" onClick={this.showModalUpdate}>修改</Button>
			    	</Col>
			    </Row>
                <Modal title="计划编辑页面" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.handleCancel}>
                    <Row>
                    	<Col span={24}>
        			        <FormItem label="标题：" hasFeedback {...widthFormItemLayout}>
        			         {getFieldDecorator('planTitle', {
        			        	 initialValue: this.state.planTitle,
        			             rules: [
        			                     {
        			                       required: true,
        			                       message: '标题',
        			                     },
        			                   ],})(<Input />)}
        			         </FormItem>
        		        </Col>
        	        </Row>
        	        <Row>
        		    	<Col span={12}>    
        			    	<FormItem label="开始时间：" hasFeedback {...formItemLayout}>
        			    	{getFieldDecorator('planBeginDate', {
        			    		initialValue:moment(this.state.planBeginDate, dateFormat),
          			            rules: [
          			                     {
          			                       required: true,
          			                       message: '开始时间',
          			                     },
          			                   ],})(<DatePicker style={{ width: 150 }} format={dateFormat}/>)}			         
        			        </FormItem>
        		        </Col> 
        		        <Col span={12}>  
        			        <FormItem label="结束时间：" hasFeedback {...formItemLayout}>
        			        {getFieldDecorator('planEndDate', {
        			        	initialValue:moment(this.state.planEndDate, dateFormat),
        			        	rules: [
       			                     {
       			                       required: true,
       			                       message: '结束时间',
       			                     },
       			                   ],})(<DatePicker style={{ width: 162 }} format={dateFormat} />)}	
        			        </FormItem>
        		        </Col> 
        	        </Row>
        	        <Row>
        	    	<Col span={12}>    
        		    	<FormItem label="父计划：" hasFeedback {...formItemLayout}>
        		    	{getFieldDecorator('parentPlanCode', {
    			        	 initialValue:this.state.parentPlanCode,
    			             rules: [
    			                     {
    			                       required: false,
    			                       message: '父计划',
    			                     },
    			                     (rule, value, callback, source, options) => {
    			                         if (value==this.state.planId&&value!="") {
    			                             callback('不能选择此计划！')
    			                         }
    			                         // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    			                         callback()
    			                       },
    			                   ],})(<TreeSelect
        			         style={{ width: 150 }}
        			         dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        			         placeholder="请选择"
        			         allowClear
        			         treeDefaultExpandAll>
        			        	{this.props.state.treeNodes}
        			       </TreeSelect>)}
        		        </FormItem>
        	        </Col> 
        	        <Col span={12}>  
        		        <FormItem label="预计人天：" hasFeedback {...formItemLayout}>
        		         {getFieldDecorator('planWorkload', {
    			        	 initialValue:this.state.planWorkload,
    			             rules: [
    			                     {
    			                       required: true,
    			                       message: '预计投入人天',
    			                     },
    			                   ],})(<InputNumber  style={{ width: 162 }}/>)}
        		        </FormItem>
        	        </Col> 
                </Row>
                <Row>
            		<Col span={24}>
        		        <FormItem label="计划描述：" hasFeedback {...widthFormItemLayout}>
        		          {getFieldDecorator('planDesc', {
     			        	 initialValue:this.state.planDesc,
     			             rules: [
     			                     {
     			                       required: true,
     			                       message: '计划描述',
     			                     },
     			                   ],})(<Input type="textarea"  rows={4}/>)}
        		        </FormItem>
        	        </Col> 
        		</Row>
              </Modal>
            </div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
    },
    /**
     * 新建按钮响应事件处理方法
     */
    showModal:function() {
       this.setState({ 
          visible: true,
          actionType:"created",
          prjId:"4028b4b15aeee0d9015aef7abfe60003",planTitle:"",planId:"",
          planBeginDate:moment(),planEndDate:moment(),parentPlanCode:this.props.state.selectedPlanId,planWorkload:0,planDesc:"",
        });
       this.props.form.resetFields();
      },
    /**
     * 修改按钮响应事件处理方法
     */
    showModalUpdate:function() {
    	if(this.props.state.selectedPlanId)
	    {
    	  this.setState({ 
   	         actionType:"update",
   	       });
	      this.getPlanInfo();
	    }
    	else
		{
    		alert("请选择计划");
		}
     },
    
    handleCancel:function() {
    	this.setState({visible:false,});
      },
    /**
     * 保存按钮响应事件处理方法
     */
    handleSubmit:function(){ 
    	  this.props.form.validateFields((errors) => {
    	     if (errors) {
    	        return
    	     }
    	     
    	     const data = {
    	    	...this.props.form.getFieldsValue()    
    	     }
      		let obj={};
      	  	obj.prjId="4028b4b15aeee0d9015aef7abfe60003";//项目ID
      	    obj.planId=this.state.planId;
      	  	obj.planTitle=data.planTitle;//计划名称
      	  	obj.planBeginDate=data.planBeginDate.format("YYYY-MM-DD");//开始时间
      	  	obj.planEndDate=data.planEndDate.format("YYYY-MM-DD");//结束时间
      	  	obj.parentPlanCode=data.parentPlanCode;//计划归属
      	  	obj.planWorkload=data.planWorkload;
      	  	obj.isUse=0;//是否使用
      	  	obj.planDesc=data.planDesc;
      	  	obj.actionType=this.state.actionType;
      	  	console.log("obj",obj);
      	  	getAjaxData(Config.baseURL+'/csm_proc/rest/projectproc/savePlan','get',obj,this.props.initPlanTree);
      	  	this.handleCancel();    	      
    	    })
       },
       /**
        * 修改时，设置各控件值
        */
       initPlanInfo:function(data){
     	 this.setState({ 
	         visible: true,
	         planTitle:data.resultValue.items[0].planTitle,
	         planId:data.resultValue.items[0].planId,
	         planBeginDate:data.resultValue.items[0].planBeginDate,
	         planEndDate:data.resultValue.items[0].planEndDate,
	         parentPlanCode:data.resultValue.items[0].parentPlanCode,
	         planWorkload:data.resultValue.items[0].planWorkload,
	         planDesc:data.resultValue.items[0].planDesc,	         
	       });
     	 this.props.form.resetFields();
       },
       
       getPlanInfo:function(){ 
   		 let obj={};
   	  	 obj.prjId="4028b4b15aeee0d9015aef7abfe60003";//项目ID
   	  	 obj.planId=this.props.state.selectedPlanId[0];
   	  	 getAjaxData(Config.baseURL+'/csm_proc/rest/projectproc/getPlanInfo','get',obj,this.initPlanInfo);
      },
           
      
});
export default Form.create()(ShowModal);