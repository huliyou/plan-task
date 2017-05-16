import { Modal, Button, Input,InputNumber, Form, Row, Col,DatePicker,TreeSelect} from 'antd';
import React, {PropTypes} from 'react';
import Config from '../../../../utils/config';
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
    	this.setState({visible:false,planTitle:"",planId:"",
    		          planBeginDate:moment(),planEndDate:moment(),parentPlanCode:this.props.state.selectedPlanId,planWorkload:0,planDesc:"",});
    },
    
    
    //渲染并返回一个虚拟DOM
    render:function() {
    	const { getFieldDecorator } = this.props.form;
        return(
        		<div>
                
                <Row>
					<Col span={12}> 
						<Button type="primary" onClick={this.showModal}>新建地点</Button>
		    		</Col>
		    		<Col span={12}> 
		    			<Button type="primary" onClick={this.showModalUpdate}>修改地点</Button>
			    	</Col>
			    </Row>
                <Modal title={this.state.title} visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.handleCancel}>
                    <Row>
                    	<Col span={24}>
        			        <FormItem label="区域序号：" hasFeedback {...formItemLayout}>
        			         {getFieldDecorator('cantId', {
        			        	 initialValue: this.state.cantId,
        			             rules: [
        			                     {
        			                       required: true,
        			                       message: '此处不能为空',
        			                     },
        			                   ],})(<Input />)}
        			         </FormItem>
        		        </Col>
        	        </Row>
        	        
        		     <Row>
     		    	<Col span={24}>    
     		    	<FormItem label="区域代码：" hasFeedback {...formItemLayout} >
     		          {getFieldDecorator('cantCode', {
     		            initialValue: this.state.cantCode,
     		            rules: [
     		              {
     		                required: true,
     		                message: '此处不能为空',
     		              },
     		            ],
     		          })(<Input />)}
     		      </FormItem>
     		     </Col> 
     		     </Row>
     		    <Row>
		    	<Col span={24}>    
		    	<FormItem label="区域名称：" hasFeedback {...formItemLayout} >
		          {getFieldDecorator('cantName', {
		            initialValue: this.state.cantName,
		            rules: [
		              {
		                required: true,
		                message: '此处不能为空',
		              },
		            ],
		          })(<Input />)}
		      </FormItem>
		     </Col> 
		     </Row>
		     <Row>
		        <Col span={24}>  
		        <FormItem label="地点简称：" hasFeedback {...formItemLayout}>
			    {getFieldDecorator('shortName', {
			      initialValue:  this.state.shortName,
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
		        </Col> 
	        </Row>
     		    <Row>
		    	<Col span={24}>    
		    	<FormItem label="地点类型：" hasFeedback {...formItemLayout} >
		          {getFieldDecorator('cantTypeId', {
		            initialValue:  this.state.cantTypeId,
		            rules: [
		              {
		                required: true,
		                message: '此处不能为空',
		              },
		            ],
		          })(<Input />)}
		      </FormItem>
		     </Col> 
		     </Row>
        	        <Row>
    		        <Col span={24}>  
    		        <FormItem label="父节点：" hasFeedback {...formItemLayout}>
    			    {getFieldDecorator('parentId', {
    			      initialValue:  this.state.parentId,
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
          title: "新增地点",
        /*  CantId:"01",planTitle:"",planId:"",
          planBeginDate:moment(),planEndDate:moment(),parentPlanCode:this.props.state.selectedPlanId,planWorkload:0,planDesc:"",*/
        });
       this.props.form.resetFields();
      },
    /**
     * 修改按钮响应事件处理方法
     */
    showModalUpdate:function() {
    	if(this.props.state.selectedCantId)
	    {
    		alert(this.props.state.selectedCantId)
    	  this.setState({ 
   	         actionType:"update",
   	         visible : true,
   	         title: "修改地点",
   	       });
	      this.getPlanInfo();
	    }
    	else
		{
    		alert("请选择地点");
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
      	  	obj.cantId=data.cantId;
      	    obj.cantName=data.cantName;
      	  	obj.cantCode=data.cantCode;
      	  	obj.cantTypeId=data.cantTypeId;
      	  	obj.shortName=data.shortName;
    	  	obj.parentId=data.parentId;
    	  	obj.actionType = this.state.actionType; 
      	  	getAjaxData(Config.baseURL+'/csm_pub/rest/PubCant/save','get',obj,this.props.initplaceTree);
      	  	this.handleCancel();    	      
    	    })
       },
       /**
        * 修改时，设置各控件值
        */
       initPlanInfo:function(data){
    	   console.log(11111,data);
    	   debugger;
     	 this.setState({ 
	         visible: true,
	         cantId:data.resultValue.items[0].cant_id,
	         cantName:data.resultValue.items[0].cant_name,
	         shortName:data.resultValue.items[0].short_name,
	         cantCode:data.resultValue.items[0].cant_code,
	         cantTypeId:data.resultValue.items[0].cant_type_id,
	         parentId:data.resultValue.items[0].parent_id,	         
	       });
     	 this.props.form.resetFields();
       },
       
       getPlanInfo:function(){ 
   		 let obj={};
   		 obj.cantId=""+this.props.state.selectedCantId;//项目ID
   	  	 getAjaxData(Config.baseURL+'/csm_pub/rest/PubCant/getPlaceInfo','get',obj,this.initPlanInfo);
      },
           
      
});
export default Form.create()(ShowModal);