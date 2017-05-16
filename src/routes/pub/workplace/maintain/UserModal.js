import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
var $ =require('jquery');
import Config from '../../../../utils/config'
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
const Option = Select.Option;

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
class UserModal extends React.Component {
	render(){
			const { getFieldDecorator } = this.props.form;
			return(
					<div>
					<Modal title="项目编辑" width="600px" visible={this.props.state.visible} onOk={this.handleSubmit} onCancel={this.handleCancel}>
									
					        			        <FormItem label="地点代码：" hasFeedback {...formItemLayout}>
					        			         {getFieldDecorator('workplaceCode', {
					        			        	 initialValue: "",
					        			             rules: [
					        			                     {
					        			                       required: true,
					        			                       message: '此处不能为空',
					        			                     },
					        			                   ],})(<Input />)}
					        			         </FormItem>
					        		          
					        		    	<FormItem label="地点名称：" hasFeedback {...formItemLayout} >
					        		          {getFieldDecorator('workplaceName', {
					        		            initialValue: "",
					        		            rules: [
					        		              {
					        		                required: true,
					        		                message: '此处不能为空',
					        		              },
					        		            ],
					        		          })(<Input />)}
					        		      </FormItem>
					        		      
					        		        <FormItem label="地点简称：" hasFeedback {...formItemLayout}>
					        			    {getFieldDecorator('shortName', {
					        			      initialValue: "",
					        			      rules: [
					        			        {
					        			          required: true,
					        			          message: '此处不能为空',
					        			        },
					        			      ],
					        			    })(
					        			      <Input />
					        			    )}
					        			  </FormItem>
					        		  
					        	    	 <FormItem label="上午：" asFeedback {...formItemLayout}>
					        	   	  <FormItem label="上班时间：" hasFeedback {...formItemLayout}>
					        	   	    {getFieldDecorator('am_start_time', {
					        	   	      initialValue:"",
					        	   	      rules: [
					        	   	        {
					        	   	          required: true,
					        	   	        },
					        	   	      ],
					        	   	    })(
					        	   	      <Input />
					        	   	    )}
					        	   	  </FormItem>
					        	   	  <FormItem label="下班时间：" hasFeedback {...formItemLayout}>
					        	   	    {getFieldDecorator('am_end_time', {
					        	   	      initialValue: "",
					        	   	      rules: [
					        	   	        {
					        	   	          required: true,
					        	   	          message: '下班时间未填写',
					        	   	        },
					        	   	      ],
					        	   	    })(
					        	   	      <Input />
					        	   	    )}
					        	   	  </FormItem>
					        	   	  </FormItem> 
					        	       
					        	        <FormItem label="下午：" asFeedback {...formItemLayout}>
					        	  	  <FormItem label="上班时间：" hasFeedback {...formItemLayout}>
					        	  	    {getFieldDecorator('pm_start_time', {
					        	  	      initialValue: "",
					        	  	      rules: [
					        	  	        {
					        	  	          required: true,
					        	  	          message: '上班时间未填写',
					        	  	        },
					        	  	      ],
					        	  	    })(
					        	  	      <Input />
					        	  	    )}
					        	  	  </FormItem>
					        	  	  <FormItem label="下班时间：" hasFeedback {...formItemLayout}>
					        	  	    {getFieldDecorator('pm_end_time', {
					        	  	      initialValue: "",
					        	  	      rules: [
					        	  	        {
					        	  	          required: true,
					        	  	          message: '下班时间未填写',
					        	  	        },
					        	  	      ],
					        	  	    })(
					        	  	      <Input />
					        	  	    )}
					        	  	  </FormItem>
					        	  	  </FormItem> 
					        	       
					</Modal>
					</div>
			)
	}
	
	handleCancel = () =>{
		//关闭
		this.props.closeWin();
	}

	handleSubmit = () =>{ 
		debugger;
	    	  this.props.form.validateFields((errors) => {
	    	     if (errors) {
	    	        return
	    	     }
	    	     
	    	     const data = {
	    	    	...this.props.form.getFieldsValue()    
	    	     }
	      		let obj={};
	      	  	obj.cantId=""+this.props.state.selectedCantId;
	      	    obj.workplaceCode=data.workplaceCode;
	      	  	obj.workplaceName=data.workplaceName;
	      	  	obj.shortName=data.shortName;
	      	  	obj.amStartTime=data.am_start_time;
	      	  	obj.amEndTime=data.am_end_time;
	      	  	obj.pmStartTime=data.pm_start_time;
	    	  	obj.pmEndTime=data.pm_end_time;
	      	  	getAjaxData(Config.baseURL+'/csm_pub/rest/PubCant/savePlace','get',obj,this.props.initplaceTree);
	      	  	this.handleCancel();    	      
	    	    })
	       }
		
	}
export default Form.create()(UserModal)
