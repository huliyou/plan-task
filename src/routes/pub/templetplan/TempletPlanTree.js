import React, { PropTypes } from 'react'
import { Tree,Button, Row, Col,Form, } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Config from '../../../utils/config'


var $ =require('jquery');
const TreeNode = Tree.TreeNode;

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

let TempletPlanTree = React.createClass({
    //1.创建阶段
    getDefaultProps:function() {
        return {aaa:12};
    },

    //2.实例化阶段
    getInitialState:function() {
        return {};
    },

    //render之前调用，业务逻辑都应该放在这里，如对state的操作等
    componentWillMount:function() {
        this.initTempletPlanTree();
    },

    //渲染并返回一个虚拟DOM
    render:function() {
        return(
        		<div style={{width:350,background:'#ffffff',height:600}}>
	        		<Row>
			    		<Col span={6}> 
			    			<Button type="primary" onClick={this.addTemplet}>新建模板</Button>
				    	</Col>
				    	<Col span={6}> 
				    		<Button type="primary" onClick={this.deleteTemplet}>删除模板</Button>
				    	</Col>
				    	<Col span={6}> 
				    		<Button type="primary" onClick={this.addTempletPlan}>新建计划</Button>
				    	</Col>
				    	<Col span={6}> 
				    		<Button type="primary" onClick={this.deleteTempletPlan}>删除计划</Button>
			    		</Col>
				    </Row>
	        		<Tree showLine onSelect={this.onSelect} className="draggable-tree">
		               {this.props.state.treeNodes}
		            </Tree>
	            </div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
    },
      
    initTempletPlanTree:function() {
    	let obj={};
		obj.companyId="529ffd4733e611e7bbc2005056a42951";//项目ID
		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/getTempletPlanAllList','get',obj,this.refrashTree);
    },
    
    refrashTree:function(data) {
    	console.log("refrashTree",data);
        this.props.setTempletPlanTreeNodes(data.resultValue.items);
    },
    
    onSelect:function(info,e) {
    	this.props.setSelectedTempletPlan(e.node.props.value);
    },
    
    addTemplet:function() {
    	this.props.setAddTemplet();
    },
    
    addTempletPlan:function() {
    	if(this.props.state.selectedTempletPlan.templetId){
    		this.props.setAddTempletPlan();
//    		alert('addTempletPlan:'+this.props.state.selectedTempletPlan.templetId);
    	}else{
    		alert("请选择模板");
    	}
    },
    
    deleteTempletPlan:function() {
    	if(this.props.state.selectedNodeType=="P"){
    		if(this.props.state.selectedTempletPlan.tplanId)
    		  {
    			let obj={};
    			obj.tplanId=this.props.state.selectedTempletPlan.tplanId;//
    			getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/deleteTempletPlan','get',obj,this.initTempletPlanTree);
    			this.props.setSelectedTempletPlan("");
    		  }
    		  else
    		  {
    			  alert("请选择计划");
    		  }
    	}
    	else
    	{
    		alert("请选择计划");
    	}
    },
    
    deleteTemplet:function() {
    	if(this.props.state.selectedNodeType=="M"){
//    		alert(this.props.state.selectedTempletPlan.templetId);
		  	  if(this.props.state.selectedTempletPlan.templetId)
		  	  {
		  		let obj={};
		  		obj.templetId=this.props.state.selectedTempletPlan.templetId;//
		  		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/deleteProcTempletInf','get',obj,this.initTempletPlanTree);
		  		this.props.setSelectedTempletPlan("");
		  	  }
		  	  else
		  	  {
		  		  alert("请选择模板");
		  	  }
    	}else {
    		alert("请选择模板");
    	}
     },
    
});
export default Form.create()(TempletPlanTree);