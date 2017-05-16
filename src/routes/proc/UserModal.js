import { Form,Row,TreeSelect, Col, Input, InputNumber,Tree, Cascader, Radio, Modal, Select, DatePicker, Upload, Button, Icon } from 'antd'
import React, {PropTypes} from 'react';
import Config from '../../utils/config';
import moment from 'moment';
var $ =require('jquery');

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
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

const dateFormat = 'YYYY-MM-DD';

let UserModal = React.createClass({
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
        this.initPlanTree();   
    },
    
    
    //渲染并返回一个虚拟DOM
    render:function() {
    	const { getFieldDecorator } = this.props.form;
        return(
        	<div>
		        	<Row>
			    		<Col span={24}> 
			    			<Button type="primary" onClick={this.showModal}>新建任务</Button>
				    	</Col>
				    </Row>
		        	<Modal title="任务编辑页面" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.handleCancel}>
		        		<Row>
				   	     <Col span={12}>
				   	        <FormItem label="项目：" hasFeedback {...formItemLayout} >
				   	          {getFieldDecorator('themeName', {
				   	            initialValue: "",
				   	            rules: [
				   	              {
				   	                required: true,
				   	                message: '项目未填写',
				   	              },
				   	            ],
				   	          })(<Input  style={{ width: 150 }} />)}
				   	      </FormItem>
				   	      </Col>
				   		<Col span={12}>  
				   		     <FormItem label="类型" hasFeedback {...formItemLayout}>
				   		  	{getFieldDecorator('phaseAct', {
				   		  	  initialValue:"",
				   		  	  rules: [
				   		  	     { 
				   		  	      required: true, 
				   		  	      message: '任务类型不能为空!' 
				   		  	    },
				   		  	  ],
				   		  	})(<Select style={{width:150}}>
						  	    <Option value="任务">任务</Option>
						  	    <Option value="BUG">BUG</Option>
						  	  </Select>)}
				   		  	</FormItem>  
				   		  </Col>  
				   	  </Row>	
				   	  <Row>
				   		 <Col span={24}>   
				   		     <FormItem label="标题：" hasFeedback {...widthFormItemLayout}>
				   		    {getFieldDecorator('planName', {
				   		      initialValue: "",
				   		      rules: [
				   		        {
				   		          required: true,
				   		          message: '标题',
				   		        },
				   		      ],
				   		    })(
				   		      <Input />
				   		    )}
				   		  </FormItem>
				   		  </Col>   
				   	 </Row>
				   	 <Row>
				   		 <Col span={12}>
				   		  <FormItem label="负责人：" asFeedback {...formItemLayout}>
				   			{getFieldDecorator('pduty', {
				   			  initialValue:"",
				   			  rules: [
				   			      {
				   			       required: true, 
				   			       message: '负责人不能为空 !' ,
				   			     },
				   			  ],
				   			})(
				   			  <Input />
				   			)}
				   			</FormItem>
				   		 </Col>   
				   		 <Col span={12}>
				   			<FormItem label="所属计划" hasFeedback {...formItemLayout}>
				   			{getFieldDecorator('planId', {
	    			        	 initialValue:"",
	    			             rules: [
	    			                     {
	    			                       required: false,
	    			                       message: '计划',
	    			                     },
	    			                   ],})(<TreeSelect
	        			         style={{ width: 150 }}
	        			         dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
	        			         placeholder="请选择"
	        			         allowClear
	        			         treeDefaultExpandAll>
	    			                   {this.state.treeNodes}
	        			       </TreeSelect>)}
				   			</FormItem>
				   			</Col>	
				        </Row>	
				   		<Row>
				   		  <Col span={24}>
					   			<FormItem label="内容：" hasFeedback {...widthFormItemLayout}>
					   			{getFieldDecorator('themeDesc', {
					   			  initialValue: "",
					   			  rules: [
					   			    {
					   			      required: true,
					   			      message: '内容未填写',
					   			    },
					   			  ],
					   			})(<Input type="textarea" rows={4} />)}
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
        });
       
      },
      
     initPlanTree:function() {
    	let obj={};
 		obj.prjId="4028b4b15aeee0d9015aef7abfe60003";//项目ID
 		getAjaxData(Config.baseURL+'/csm_proc/rest/projectproc/getPlanList','get',obj,this.refrashTree);
      },
      
     refrashTree:function(data) {
          console.log("----------refrashTree---------");
          this.setState({
          	treeNodes: this.loop(data.resultValue.items),
    	  });
     },
      
     loop:function(data,parentPlanCode){
      	let treeData = [];
      	if(parentPlanCode==null)
      	{
      		parentPlanCode="";
      	}
      	for(var i=0;i<data.length;i++)
  		{
      		var item = data[i];
      		if(item.parentPlanCode==parentPlanCode)
  			{
      			if(item.isLeaf=="false")
      			{
      				treeData.push(<TreeNode title={item.planTitle} key={item.planId} value={item.planId}>
      				{this.loop(data,item.planId)}</TreeNode>);
      			}
      			else
  				{
  					treeData.push(<TreeNode title={item.planTitle} key={item.planId} value={item.planId} style={{width:500}}/>);
  				}
  			}
  		}
      	return treeData;
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
    	obj.themeName=data.themeName;
    	obj.phaseAct=data.phaseAct;
    	obj.planName=data.planName;
    	obj.pduty=data.pduty;
    	obj.planId=data.planId;
    	obj.themeDesc=data.themeDesc;
    	console.log("handleSubmit",this.props);
        this.props.onOk(obj);
  	  	this.handleCancel();    	      
 	    })
    },

           
      
});
export default Form.create()(UserModal);