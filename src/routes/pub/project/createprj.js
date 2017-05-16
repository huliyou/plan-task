import React, { PropTypes } from 'react'
import {Modal,Button,message,Form, Input,Select, Icon, Row, Col,TreeSelect,Radio,Cascader } from 'antd'
import styles from './createprj.less'
import Config from '../../../utils/config'
var $ = require('jquery');
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;
function getAjaxData(url,type,obj,sentdata){
	 $.ajax({
	       url:url,
	       type:type,
	       data:'param='+JSON.stringify(obj),
	       datatype:'json',
	       async:false,
	       success:function(data){sentdata(data)},
	       error:function(data){ sentdata(data)}
	      })
	}

const treeData = [ ];
class Createprj extends React.Component {
	state = { 
		visible: false,
		disabled:true,
		value: 2,
		Treevalue: undefined,
		prjType:undefined,
	}
	componentWillMount = () =>  {
		//初始化查询项目类型方法
		this.getPrjType();
		this.getPrivace();
    }

	handleCancel = (e) => {
		this.props.closeCrePrj();
	} 
	
	onChange = (e) => {
	  	//单选按钮点击单选按钮方法
	    this.setState({
	      value: e.target.value,
	    });
	}
	onChanged = (Treevalue) => {
	//下啦框点击方法
	    console.log(arguments);
	    this.setState({ Treevalue });
	}
	
	render() {
		const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
			  labelCol: {
			    xs: { span: 12 },sm: { span: 4 },
			  },
			  wrapperCol: {
			    xs: { span: 12 },sm: { span: 16 },
			  },
	    	};
	    const widthFormItemLayout = {
	    		 labelCol: {span: 12,},
	 			 wrapperCol: { span: 12,},
	    		};
	    return (
	    	<div>
			  <Modal title="创建项目" width="700px" visible={this.props.state.crevisible} onOk={this.handleOk} onCancel={this.handleCancel}>
		      <div className="bodyBox">
		         <div  className={styles.projectinfo} id='projectinfo'>
		         <Form>
		            <Row><Col span={24}>
				         <FormItem label="项目名称：" hasFeedback {...formItemLayout}>
				         {getFieldDecorator('prjName', {
				        	 initialValue:"",
				        	 rules: [
	        	       	              {
	        	      	                required: true,
	        	      	                message: '项目名称不能为空！',
	        	      	              },
	        	      	            ],
				             })(<Input/>)} 
				          </FormItem>
				    </Col></Row>
				    <Row><Col span={24}>
				          <FormItem label="项目编码：" hasFeedback {...formItemLayout}>
				          {getFieldDecorator('PrjNo', {
					        	 initialValue:"",
					       })(<Input/>)}
				          </FormItem>
			        </Col></Row>
			          <Row><Col span={8}>
					          <FormItem label="产品关联：" hasFeedback {...widthFormItemLayout}>
					          <TreeSelect 
						          value={this.state.Treevalue}
						          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						          treeData={treeData}
						          treeDefaultExpandAll
						          onChange={this.onChanged} id='guanlian' style={{ width: 170 }}></TreeSelect>
					          </FormItem>
				          </Col>
				          <Col span={12}>
					          <FormItem label="项目类型：" hasFeedback {...widthFormItemLayout}>
					          {getFieldDecorator('prjType', {
						        	 initialValue:"",
						        	 rules: [
	        	       	              {
	        	      	                required: true,
	        	      	                message: '项目类型不能为空！',
	        	      	              },
	        	      	            ],
						             })(<TreeSelect
						             style={{ width: 170 }}
				 			         placeholder="请选择"
				 			         allowClear
				 			         treeDefaultExpandAll>
						             {this.state.prjType}
							      	 </TreeSelect>)}
					          </FormItem>
						</Col></Row>
			       <Row><Col span={24}>
			          <FormItem label="项目描述：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('prjDesc', {
				        	 initialValue:this.props.state.updatePrjDesc,
				             })(<Input type="textarea" placeholder="请输入项目描述" autosize={{ minRows: 2, maxRows: 6 }} />)}
			          </FormItem>
			       </Col></Row>
			       	<Row>
			       	
			       	<FormItem label="办公地点：" hasFeedback {...formItemLayout} >
				        <Select  style={{ width: 100 }} onChange={this.handleProvinceChange} placeholder="请选择省份">
				          {this.state.provinceOptions}
				        </Select>
				        <Select value={this.state.secondCity} style={{ width: 100 }} onChange={this.onSecondCityChange} placeholder="请选择市级">
				          {this.state.cityOptions}
				        </Select>
				        <Select value={this.state.xiangxi} style={{ width: 200 }} onChange={this.xiangxiCityChange} placeholder="请选择详细地点">
				          {this.state.xiangxiOptions}
				        </Select>
			        </FormItem>
			       	
			          </Row>
			          <FormItem label="是否保密：" hasFeedback {...formItemLayout}>
				          <RadioGroup onChange={this.onChange} value={this.state.value} id='isSecrecy'>
				          <Radio name="isSecrecy" value={1}>是</Radio>
				          <Radio name="isSecrecy" value={2}>否</Radio>
				          </RadioGroup>
			          </FormItem>
		         </Form>
		         </div>
		        </div>
	      </Modal></div>
	    )
	  }
	
	getPrjType = () =>{
		let obj={};
		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/queryPrjtype','get',obj,this.getPrjTypeData);
	}
	getPrjTypeData = (data) => {
		//获取项目类型数据
		console.log(11121,data); 
		this.setState({
			prjType: this.loop(data.items),
			});
	}
	 handleProvinceChange = (value) => {
	    console.log(99,value);
	    let obj={};
	    obj.parentId=value;
		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/queryCant','get',obj,this.getCityData);
		this.setState({
		    secondCity: undefined,
		}); 
		this.setState({
			xiangxi: undefined,
		});
	 }
	 getCityData = (data) =>{
		 console.log("data",data.items);
		 if(data.items != null){
			 this.setState({
				 cityOptions: this.loopCity(data.items),
			 }); 
		 }else{
			 this.setState({
				 cityOptions: undefined,
			 }); 
		 }
		 console.log(333,this.state.cityOptions);
	 }
	 onSecondCityChange = (value) => {
	    this.setState({
	      secondCity: value,
	    });
	    console.log(456,value);
	    let obj={};
		obj.cantId=value;
		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/queryCantXiangXi','get',obj,this.getXiangXi);
		this.setState({
			xiangxi: undefined,
		});
	 }
	 xiangxiCityChange = (value) => {
	    this.setState({
	    	xiangxi: value,
		});
	 }
	 getXiangXi = (data) =>{
	 console.log(2222,data);
		 if(data.items != null){
			 this.setState({
				 xiangxiOptions: this.loopCityXiangxi(data.items),
			 }); 
		 }else{
			 this.setState({
				 xiangxiOptions: undefined,
			 }); 
		 }
	 }
	 getPrivace = () => {
		//点击省级下啦菜单
		let obj={};
		obj.parentId='01';
		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/queryCant','get',obj,this.getPrivaceData);
	 }
	 getPrivaceData = (data) =>{
		this.setState({
			provinceOptions: this.loopCity(data.items),
			});
	 }
	 loopCity= data => data.map((item) => {
		return <Option key={item.cantCode}>{item.cantName}</Option>;
	 });
	 loopCityXiangxi= data => data.map((item) => {
			return <Option key={item.workId}>{item.workName}</Option>;
		 });
	 loop = data => data.map((item) => {
	      return <TreeNode title={item.prjTypeName} key={item.prjTypeId} value={item.prjTypeId} isLeaf={true} disabled={item.key === '0-0-0'} />;
	 });
	
	 getPrjWork = (value) =>{
		console.log(22222,value);
	 }

	 handleOk = (e) => {
		//完成方法！
		  this.props.form.validateFields((errors) => {
			  if (errors) {
	    	        return
	    	     }
				const data = {
		    	    	...this.props.form.getFieldsValue()    
		    	     }
			let obj={};
			obj.prjName = data.prjName;//项目名称
			obj.prjNo = data.PrjNo;//项目编码
			obj.prjType = data.prjType;//项目类型
			obj.prjDesc = data.prjDesc;//项目描述
			obj.workplaceId = this.state.xiangxi;//项目工作地点
			obj.isSecrecy = this.state.value;//是否保密
			console.log('obj',obj);
			getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/saveOrUpdatePrj','get',obj,sentdata);
			function sentdata(data){
				console.log('data',data);
				console.log('data',data.message);
				message.success(data.message);
			}
			this.handleCancel();
			this.props.init();
		  })
	  }
}
export default Form.create()(Createprj)