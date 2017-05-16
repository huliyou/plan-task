import React, { PropTypes } from 'react'
import {Modal,Button,message,Form, Input,Select, DatePicker, Icon, Cascader, Row, Col,Radio,TreeSelect } from 'antd'
import Config from '../../../utils/config'
import moment from 'moment';
var $ = require('jquery');
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;
const dateFormat = 'YYYY-MM-DD';
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

class Updateprj extends React.Component {
	state= {
		disabled: true,
		udapteBeginDate: moment(),
		udapteEndDate: moment(),
	}
	componentWillMount = () =>  {
		//初始化查询项目信息
		this.getDimPrjStatus();
		this.getImportantGrade();
		this.getPrjPhase();
		this.getPrivace();
    }
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
				  labelCol: {
				    xs: { span: 24 },sm: { span: 8 },
				  },
				  wrapperCol: {
				    xs: { span: 24 },sm: { span: 14 },
				  },
		    	};
	    const widthFormItemLayout = {
	    		 labelCol: {span: 2,},
	 			 wrapperCol: { span: 20,},
	    		};
		return(
			<Modal title="项目编辑" width="800px" visible={this.props.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
		    <Form>
				<Row>
				<Col span={8}>
		          <FormItem label="项目名称：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('updatePrjName', {
			        	 initialValue:this.props.state.updatePrjName,
			             })(<Input/>)}
			      </FormItem>
			    </Col>
			    <Col span={8}>
			      <FormItem label="项目编码：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('updatePrjNo', {
			        	 initialValue:this.props.state.updatePrjNo,
			             })(<Input/>)} 
			      </FormItem>
			    </Col>
			    <Col span={8}>
		          <FormItem label="项目类型：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('updatePrjType', {
			        	 initialValue:this.props.state.updatePrjType,
			             })(<Input disabled={this.state.disabled} />)}    
			      </FormItem>
			    </Col>
			   </Row>
			   
				<Row>
			    <Col span={8}>
			      <FormItem label="重要程度：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('updateImGrade', {
			        	 initialValue:this.props.state.updateImGrade,
			             })(<TreeSelect
	 			         placeholder="请选择"
	 			         allowClear
	 			         treeDefaultExpandAll>
				      	 {this.state.ImportantGradeData}
				      	 </TreeSelect>)}
			      </FormItem>
			    </Col>
			    <Col span={8}>
			      <FormItem label="归属单位：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('updatePrjOrg', {
			        	 initialValue:this.props.state.updatePrjOrg,
			             })(<Input/>)}
			      </FormItem>
			    </Col>
			    <Col span={8}>
		          <FormItem label="归属部门：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('updatePrjDept', {
			        	 initialValue:this.props.state.updatePrjDept,
			             })(<Input/>)}    
			      </FormItem>
			    </Col>
			   </Row>
			   
				<Row>
			    <Col span={8}>
			      <FormItem label="承建单位：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('updateDevOrg', {
			        	 initialValue:this.props.state.updateDevOrg,
			             })(<Input/>)}    
			      </FormItem>
			    </Col>
			    <Col span={8}>
			      <FormItem label="承建部门：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('updateDerDept', {
			        	 initialValue:this.props.state.updateDerDept,
			             })(<Input/>)}
			      </FormItem>
			    </Col>
			    <Col span={8}>
		          <FormItem label="项目经理：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('updateManager', {
			        	 initialValue:this.props.state.updateManager,
			             })(<Input/>)}
			      </FormItem>
			    </Col>
			   </Row>
			   
				<Row>
			    <Col span={8}>
			      <FormItem label="项目起始时间：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('udapteBeginDate', {
			        	initialValue:moment(this.props.state.udapteBeginDate,dateFormat),
			        	})(<DatePicker style={{ width: 150 }} format={dateFormat} />)}	
			      </FormItem>
			    </Col>
			    <Col span={8}>
			      <FormItem label="计划完成时间：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('udapteEndDate', {
			        	initialValue:moment(this.props.state.udapteEndDate,dateFormat),
			        	})(<DatePicker style={{ width: 150 }} format={dateFormat} />)}	
			      </FormItem>
			    </Col>
			    <Col span={8}>
		          <FormItem label="项目状态：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('updatePrjStatus', {
			        	 initialValue:this.props.state.updatePrjStatus,
			             })(<TreeSelect
	 			         placeholder="请选择"
	 			         allowClear
	 			         treeDefaultExpandAll>
			             {this.state.PrjStatusData}
				      	 </TreeSelect>)}
			      </FormItem>
			    </Col>
			   </Row>
				<Row>
			    <Col span={8}>
			      <FormItem label="项目阶段：" hasFeedback {...formItemLayout}>
			      {getFieldDecorator('updatePrjPhase', {
			        	 initialValue:this.props.state.updatePrjPhase,
			             })(<TreeSelect
	 			         placeholder="请选择"
	 			         allowClear
	 			         treeDefaultExpandAll>
			             {this.state.PrjPhaseData}
				      	 </TreeSelect>)}
			      </FormItem>
			    </Col>
			    <Col span={8}>
			      <FormItem label="项目预计金额：" hasFeedback {...formItemLayout}>
			      <Input id='jine'></Input>
			      </FormItem>
			    </Col>
			    <Col span={8}>
		          <FormItem label="关联项目：" hasFeedback {...formItemLayout}>
		          <TreeSelect>
		          
			      </TreeSelect>
			      </FormItem>
			    </Col>
			   </Row>
			   <Row>
			   <Col span={8}>
			   <FormItem label="是否保密：" hasFeedback {...formItemLayout}>
		          <RadioGroup onChange={this.onChange} value={this.props.state.updateIsSecrecy} id='isSecrecy'>
		          <Radio name="isSecrecy" value={1}>是</Radio>
		          <Radio name="isSecrecy" value={2}>否</Radio>
		          </RadioGroup>
	          </FormItem>
	          </Col>
		      </Row>
		       <Row><Col>
		          <FormItem label="项目描述：" hasFeedback {...widthFormItemLayout}>
		          {getFieldDecorator('updatePrjDesc', {
			        	 initialValue:this.props.state.updatePrjDesc,
			             })(<Input style={{width:650}} type="textarea" placeholder="请输入项目描述" autosize={{ minRows: 2, maxRows: 6 }} />)}
		          </FormItem>
		       </Col></Row>
		       <Row><Col>
		          <FormItem label="项目目标：" hasFeedback {...widthFormItemLayout}>
		          {getFieldDecorator('updatePrjTarget', {
			        	 initialValue:this.props.state.updatePrjTarget,
			             })(<Input style={{width:650}} type="textarea" placeholder="请输入项目目标" autosize={{ minRows: 2, maxRows: 6 }} />)}
		          </FormItem>
		       </Col></Row>
		       <Row><Col>
		       <FormItem label="办公地点：" hasFeedback {...widthFormItemLayout} >
		        <Select  style={{ width: 150 }}  onChange={this.handleProvinceChange} >
		        {this.state.provinceOptions}
		        </Select>
		        <Select value={this.state.secondCity} style={{ width: 150 }} onChange={this.onSecondCityChange} >
		        {this.state.cityOptions}
		        </Select>
		        <Select value={this.state.xiangxi} style={{ width: 338 }} onChange={this.xiangxiCityChange} >
		        {this.state.xiangxiOptions}
		        </Select>
	        </FormItem>
	          </Col>
	          </Row>
	        </Form>
	        </Modal>
		)
	}
	
	handleCancel = (e) => {
		this.props.upPrj();
	}
	onChange = (e) => {
	  	//单选按钮点击单选按钮方法
	    this.setState({
	      value: e.target.value,
	    });
	}
	getDimPrjStatus = () => {
		//获取项目状态
		let obj={};
		obj.dimCode='DIM_PROJECT_STATUS',
		getAjaxData(Config.baseURL+'/csm_pub/rest/codeDim/getCodeListByDimCode','get',obj,this.getDimPrjStatusData);
	}
	getDimPrjStatusData = (data) => {
		//获取项目状态数据
		this.setState({
	    	PrjStatusData: this.loop(data.resultValue.items),
		    });
	}
	getImportantGrade  = () => {
		//获取重要程度数据
		let obj={};
		obj.dimCode='DIM_PROJECT_GRADE',
		getAjaxData(Config.baseURL+'/csm_pub/rest/codeDim/getCodeListByDimCode','get',obj,this.getImportantGradeData);
	}
	
	loop = data => data.map((item) => {
	      return <TreeNode title={item.dimValName} key={item.dimValCode} value={item.dimValCode} isLeaf={true} disabled={item.key === '0-0-0'} />;
	});
	
	getImportantGradeData = (data) => {
		console.log("getImportantGradeData",data);
		//获取重要程度数据
		this.setState({
			ImportantGradeData: this.loop(data.resultValue.items),
		    });
	}
	getPrjPhase = () => {
		//获取项目阶段数据
		let obj={};
		obj.dimCode='DIM_PROJECT_PHASE',
		getAjaxData(Config.baseURL+'/csm_pub/rest/codeDim/getCodeListByDimCode','get',obj,this.getPrjPhaseData);
	}
	getPrjPhaseData = (data) => {
		//获取项目阶段数据
		this.setState({
			PrjPhaseData:this.loop(data.resultValue.items),
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
	handleOk = () => {
		console.log('prjId',this.props.state.updatePrjId);
		this.props.form.validateFields((errors) => {
			const data = {
	    	    	...this.props.form.getFieldsValue()    
	    	     }
			let obj={};
			obj.prjId=this.props.state.updatePrjId;
			obj.prjName= data.updatePrjName;//项目名称
			obj.prjNo = data.updatePrjNo;//项目编码
			obj.importantGrade = data.updateImGrade;//重要程度
			obj.prjOrg= data.updatePrjOrg;//归属单位
			obj.prjDept= data.updatePrjDept;//归属部门
			obj.devOrg= data.updateDevOrg;//承建单位
			obj.derDept= data.updateDerDept;//承建部门
			obj.Manager= data.updateManager;//项目经理
			obj.beginDate= data.udapteBeginDate.format("YYYY-MM-DD");//起始时间
			obj.endDate= data.udapteEndDate.format("YYYY-MM-DD");//结束时间
			obj.prjStatus= data.updatePrjStatus;//项目状态
			obj.prjPhase= data.updatePrjPhase;//项目阶段
			//项目金额
			//关联项目
			//obj.isSecrecy = $('#isSecrecy').val()//是否保密
			obj.prjDesc= data.updatePrjDesc;//项目描述
			obj.prjTarget= data.updatePrjTarget;//项目目标
			console.log('obj',obj);
			getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/saveOrUpdatePrj','get',obj,sentdata);
			function sentdata(data){
				console.log('data',data);
			}
			this.handleCancel();
			this.props.componentWillMount();
	    })
	}
	
}
export default Form.create()(Updateprj)