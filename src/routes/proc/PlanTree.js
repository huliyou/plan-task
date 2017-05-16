import React, { PropTypes } from 'react'
import { Tree,Button, Row, Col, } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Config from '../../utils/config'
import PlanModal  from './PlanDetail';
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

let PlanTree = React.createClass({
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
        this.initPlanTree();
    },

    //渲染并返回一个虚拟DOM
    render:function() {
        return(
        		<div>
        			<Row>
    		    		<Col span={16}> 
        		    		<PlanModal {...this}/>
        		    	</Col>
        		    	<Col span={8}> 
	    		    		<Button type="primary" onClick={this.deletePlan}>删除</Button>
			    		</Col>
        		    </Row>
	    			<Tree showLine onSelect={this.onSelect} className="draggable-tree">
		               {this.state.treeNodes}
		            </Tree>
	            </div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
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
      
    initPlanTree:function() {
    	let obj={};
		obj.prjId="4028b4b15aeee0d9015aef7abfe60003";//项目ID
//		obj.dimCode="DIM_PROJECT_PHASE";//项目ID
		getAjaxData(Config.baseURL+'/csm_proc/rest/projectproc/getPlanList','get',obj,this.refrashTree);
//		getAjaxData(Config.baseURL+'/csm_pub/rest/codeDim/getCodeListByDimCode','get',obj,this.refrashTree);
    },
    
    refrashTree:function(data) {
        this.setState({
        	treeNodes: this.loop(data.resultValue.items),
  	    });
    },
    
    onSelect:function(info) {
        this.setState({
        	selectedPlanId: info,
  	    });
        this.props.onQuery(info);
    },
    
    deletePlan:function() {
		  if(this.state.selectedPlanId)
		  {
			let obj={};
			obj.prjId="4028b4b15aeee0d9015aef7abfe60003";//项目ID
		  	obj.planId=""+this.state.selectedPlanId;//计划名称
			getAjaxData(Config.baseURL+'/csm_proc/rest/projectproc/deletePlan','get',obj,this.initPlanTree);
			this.setState({
		    	selectedPlanId: "",
		    });
		  }
		  else
		  {
			  alert("请选择计划");
		  }
    },
    
});
export default PlanTree;