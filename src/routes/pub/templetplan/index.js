import React, { PropTypes } from 'react'
import { Tree,Layout,Form } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ConfLayout  from './ConfLayout';
import TempletPlanTree  from './TempletPlanTree';
import Config from '../../../utils/config'
import { DropOption } from '../../../components'
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

const handleMenuClick = (record, e) => {
//    if (e.key === '1') {
    	 alert(1);
//    } else if (e.key === '2') {
//    	alert(2);
//    }
  }




const TreeNode = Tree.TreeNode;
const { Sider, Content } = Layout;
let TempletPlan = React.createClass({
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
    	this.setState({
    		tilteName : "计划标题",
    		selectTreeName : "上级计划",
    		selectedTempletPlan:{tplanTitle:"",
    			tparentPlanCode:"",
    			tplanDesc:"",
    			templetId:"",
    			tplanId:"",},
    	});
    },

    //渲染并返回一个虚拟DOM
    render:function() {
        return(
        		<div>
	        		<Layout style={{height:600}}>
	        	       <Sider style={{width:400,background:'#ffffff'}}>
	        	       		<TempletPlanTree {...this}/>
	        	       </Sider>
	        	       <Layout>
	        	          <Content>
	        	          	<ConfLayout {...this} ref="getConfLayout"/>
	        	          </Content>
	        	       </Layout>
	        	    </Layout>
	        	</div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
    },
        
    setTempletPlanTreeNodes:function(data) {
    	this.setState({
        	treeNodes: this.loop(data),
  	    });
    },
    
    setSelectTempletPlanTreeNodes:function(data) {
    	this.setState({
    		selectTreeNodes: data,
  	    });
    },
    
    resetSelectTPTree:function(data) {
//    	if(data!=this.state.selectedTempletPlan.templetId){
    		let obj={};
    		obj.templetId=data;//项目ID
    		getAjaxData(Config.baseURL+'/csm_proc/rest/templeplan/getTempletPlanList','get',obj,this.refrashSelectTPTree);
//    	}
    },
    
    
    refrashSelectTPTree:function(data) {
    	console.log("refrashSelectTPTree",data);
		this.setState({
			selectTreeNodes:this.loopSelect(data.resultValue.items,""),
    	});
	},
    
    setSelectedTempletPlan:function(data) {
    	if(data[2]=="P"){
    		this.resetSelectTPTree(data[1]);
	    	this.setState({
	    		selectedNodeType:data[2],
	    		tilteName : "计划标题",
	    		selectTreeName : "上级计划",
	    		selectedTempletPlan:{tplanTitle:data[3],
	    			tparentPlanCode:data[5],
	    			tplanDesc:data[4],
	    			templetId:data[1],
	    			tplanId:data[0],},
	    	});
    	}else if(data[2]=="M"){
    		this.setState({
    			selectedNodeType:data[2],
    			tilteName : "模板标题",
        		selectTreeName : "项目类型",
        		selectedTempletId :data[1],
	    		selectedTempletPlan:{tplanTitle:data[3],
	    			tparentPlanCode:data[5],
	    			tplanDesc:"",
	    			templetId:data[1],
	    			tplanId:data[0],},
	    		selectTreeNodes:this.state.prjTypeTreeNodes,
	    	});
    	}else{
    		this.setState({
    			selectedNodeType:data[2],
    			selectedProTypeId : data[0],
	    		selectedTempletPlan:{tplanTitle:"",
	    			tparentPlanCode:"",
	    			tplanDesc:"",
	    			templetId:"",
	    			tplanId:"",},
	    	});
    	}
    	this.refs.getConfLayout.getForm().resetFields();
    	
    },
    
    setAddTemplet:function() {
    	this.setState({
			selectedNodeType:"M",
			tilteName : "模板标题",
    		selectTreeName : "项目类型",
    		selectedTempletPlan:{tplanTitle:"",
    			tparentPlanCode:"",
    			tplanDesc:"",
    			templetId:"",
    			tplanId:"",},
			selectTreeNodes:this.state.prjTypeTreeNodes,
    	});
    	this.refs.getConfLayout.getForm().resetFields();
    },
    
    setAddTempletPlan:function() {
    	this.setState({
			selectedNodeType:"P",
			tilteName : "计划标题",
    		selectTreeName : "上级计划",
    		selectedTempletPlan:{tplanTitle:"",
    			tparentPlanCode:this.state.selectedTempletPlan.tplanTitle,
    			tplanDesc:"",
    			templetId:this.state.selectedTempletPlan.templetId,
    			tplanId:"",},
    	});
    	this.refs.getConfLayout.getForm().resetFields();
    },
    
    
	refrashPrjTypeTree:function(data) {
		this.setState({
			prjTypeTreeNodes:this.loopPrjType(data.resultValue.items),
    	});
		this.setState({
			selectTreeNodes:this.state.prjTypeTreeNodes,
    	});
	},
    
    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
//    	console.log("componentDidMount ConfLayout",this.refs.getConfLayout.getForm());
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
    		if(item.tparentPlanCode==parentPlanCode)
			{
    			if(item.isLeaf=="false")
    			{
    				treeData.push(<TreeNode title={<span><span>{item.tplanTitle}</span><DropOption onMenuClick={handleMenuClick} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} /></span>} key={item.tplanId} value={[item.tplanId,item.templetId,item.type,item.tplanTitle,item.tplanDesc,item.tparentPlanCode]}>
    				{this.loop(data,item.tplanId)}</TreeNode>);
    			}
    			else
				{
    				
					treeData.push(<TreeNode title={<span><span>{item.tplanTitle}</span></span>} key={item.tplanId} value={[item.tplanId,item.templetId,item.type,item.tplanTitle,item.tplanDesc,item.tparentPlanCode]}>
						<DropOption onMenuClick={handleMenuClick} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
					</TreeNode>);
				}
			}
		}
    	return treeData;
    },
//    
    loopSelect:function(data,parentPlanCode){
    	let treeData = [];
    	if(parentPlanCode==null)
    	{
    		parentPlanCode="";
    	}
    	for(var i=0;i<data.length;i++)
		{
    		var item = data[i];
    		if(item.tparentPlanCode==parentPlanCode)
			{
    			if(item.isLeaf=="false")
    			{
    				treeData.push(<TreeNode title={item.tplanTitle} key={item.tplanId} value={item.tplanId}>
    				{this.loopSelect(data,item.tplanId)}</TreeNode>);
    			}
    			else
				{
					treeData.push(<TreeNode title={item.tplanTitle} key={item.tplanId} value={item.tplanId}/>);
				}
			}
		}
    	return treeData;
    },
    
    loopPrjType:function(data){
    	console.log("loopPrjType",data);
    	let treeData = [];
    	for(var i=0;i<data.length;i++)
		{
    		var item = data[i];
    		treeData.push(<TreeNode title={item.prjTypeName} key={item.prjTypeId} value={item.prjTypeId}/>);
		}
    	return treeData;
    },
   
});
export default Form.create()(TempletPlan);



