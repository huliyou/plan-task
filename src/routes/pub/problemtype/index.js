import React, { PropTypes } from 'react'
import { Tree,Layout,Form } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ProblemTypeLayout  from './ProblemTypeLayout';
import ProblemTypeTree  from './ProblemTypeTree';
import Config from '../../../utils/config'
import { DropOption } from '../../../components'
var $ =require('jquery');


/***
 * 
 * @param url
 * @param type
 * @param obj
 * @param sentdata
 * @returns
 */
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

const TreeNode = Tree.TreeNode;
const { Sider, Content } = Layout;
let TempletPlan = React.createClass({
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
    	this.setState({
    		selectedProblemType:{probTypeName:"",
    			upTypeId:"",
    			probTypeDesc:"",
    			probTypeId:"",},
    	});
    },

    //渲染并返回一个虚拟DOM
    render:function() {
        return(
        		<div>
	        		<Layout style={{height:600}}>
	        	       <Sider style={{width:400,background:'#ffffff'}}>
	        	       		<ProblemTypeTree {...this} ref="getProblemTypeTree"/>
	        	       </Sider>
	        	       <Layout>
	        	          <Content>
	        	          	<ProblemTypeLayout {...this} ref="getProblemTypeLayout"/>
	        	          </Content>
	        	       </Layout>
	        	    </Layout>
	        	</div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
    },

    
    initProblemTypeTree:function() {
    	let obj={};
		getAjaxData(Config.baseURL+'/csm_prob/rest/probtype/getProbTypeAllList','get',obj,this.refrashTree);
    },
    
    refrashTree:function(data) {
    	this.setState({
        	treeNodes: this.loop(data.resultValue.items),
  	    });
    },
    
    setselectedProblemType:function(info,e) {
    	let data = e.node.props.value;
		this.setState({
    		selectedProblemType:{probTypeName:data[1],
    			upTypeId:data[3],
    			probTypeDesc:data[2],
    			probTypeId:data[0],},
    		selectTreeNodes:this.state.treeNodes,
    	});
    	this.refs.getProblemTypeLayout.getForm().resetFields();
    },
    
    
//    setAddProbType:function() {
//    	this.setState({
//    		selectedProblemType:{probTypeName:"",
//    			upTypeId:this.state.selectedProblemType.probTypeName,
//    			probTypeDesc:"",
//    			probTypeId:this.state.selectedProblemType.probTypeId,},
//    	});
//    	this.refs.getProblemTypeLayout.getForm().resetFields();
//    },
    
    
//	refrashPrjTypeTree:function(data) {
//		this.setState({
//			prjTypeTreeNodes:this.loopPrjType(data.resultValue.items),
//    	});
//		this.setState({
//			selectTreeNodes:this.state.prjTypeTreeNodes,
//    	});
//	},
    
    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
//    	console.log("componentDidMount ProblemTypeLayout",this.refs.getProblemTypeLayout.getForm());
    },
    
    loop:function(data,parentPlanCode){
    	console.log("parentPlanCode",parentPlanCode);
    	let treeData = [];
    	if(parentPlanCode==null)
    	{
    		parentPlanCode="";
    	}
    	for(var i=0;i<data.length;i++)
		{
    		console.log("data"+i,data[i]);
    		var item = data[i];
    		if(item.upTypeId==parentPlanCode)
			{
    			if(item.isLeaf=="false")
    			{
    				treeData.push(<TreeNode title={<span><span>{item.probTypeName}</span><DropOption onMenuClick={e =>this.handleMenuClick(item,e)} menuOptions={[{ key: '1', name: '新建',value:'aaa', }, { key: '2', name: '删除',value:'aaa', }]} /></span>} key={item.probTypeId} value={[item.probTypeId,item.probTypeName,item.probTypeDesc,item.upTypeId,item.isLeaf]}>
    				{this.loop(data,item.probTypeId)}</TreeNode>);
    				console.log("TreeNode:",treeData);
    			}
    			else
				{
					treeData.push(<TreeNode title={<span><span>{item.probTypeName}</span><DropOption onMenuClick={e =>this.handleMenuClick(item.probTypeId,e)} menuOptions={[{ key: '1', name: '新建',value:'aaa', }, { key: '2', name: '删除',value:'aaa', }]} /></span>} key={item.probTypeId} value={[item.probTypeId,item.probTypeName,item.probTypeDesc,item.upTypeId,item.isLeaf]}>
					</TreeNode>);
				}
			}
		}
    	return treeData;
    },
    
    deleteProblemType:function(item) {
    	alert(item);
//		if(item.probTypeId)
//		  {
//			let obj={};
//			obj.probTypeId=item.probTypeId;//
//			getAjaxData(Config.baseURL+'/csm_prob/rest/probtype/deleteProbType','get',obj,this.initProblemTypeTree);
//		  }
//		  else
//		  {
//			  alert("请选择问题类型");
//		  }
    },
    
    addProblemType:function(item) {
    	this.setState({
    		selectedProblemType:{probTypeName:"",
    			upTypeId:item.probTypeId,
    			probTypeDesc:"",
    			probTypeId:"",},
    	});
    	this.refs.getProblemTypeLayout.getForm().resetFields();
    },
    
    handleMenuClick :function(record, e){
        if (e.key === '1') {
        	this.addProblemType(record);
        } else if (e.key === '2') {
        	this.deleteProblemType(record);
        }
    },

    
});
export default Form.create()(TempletPlan);



