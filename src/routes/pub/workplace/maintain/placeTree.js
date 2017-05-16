import React, { PropTypes } from 'react'
import { Tree,Button, Row, Col, } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Config from '../../../../utils/config'
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


let PlaceTree = React.createClass({
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
        this.initplaceTree();
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
	    		    		<Button type="primary" onClick={this.deleteCant}>删除维护</Button>
			    		</Col>
        		    </Row>
	    			<Tree showLine  onSelect={this.onSelect} className="draggable">
		               {this.state.treeNodes}
		            </Tree>
	            </div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
    },
    
    
    loop:function(data,parent_id){
    	let treeData = [];
    	if(parent_id==null)
    	{
    		parent_id="";
    	}
    	for(var i=0;i<data.length;i++)
		{
    		var item = data[i];
    		if(item.parent_id==parent_id)
			{
    			if(item.isLeaf=="false")
    			{
    				treeData.push(<TreeNode title={item.short_name} key={item.cant_id} value={item.cant_id}>
    				{this.loop(data,item.cant_id)}</TreeNode>);
    			}
    			else
				{
					treeData.push(<TreeNode title={item.short_name} key={item.cant_id} value={item.cant_id} style={{width:500}}/>);
				}
			}
		}
    	return treeData;
    },
      
    initplaceTree:function() {
    	let obj={};
    	obj.cantId="01";//项目ID
		getAjaxData(Config.baseURL+'/csm_pub/rest/PubCant/getPlaceList','get',obj,this.refrashTree);
    },
    
    refrashTree:function(data) {
        this.setState({
        	treeNodes: this.loop(data.resultValue.items),//
  	    });
    },
    
    onSelect:function(info,e) {
        this.setState({
        	selectedCantId:e.node.props.value,
  	    });
        this.props.onQuery(e.node.props.value);
    },
    
    deleteCant:function() {
		  if(this.state.selectedCantId)
		  {
			let obj={};
		  	obj.cantId=""+this.state.selectedCantId;//地点名称
			getAjaxData(Config.baseURL+'/csm_pub/rest/PubCant/deleteCant','get',obj,this.initplaceTree);
			this.setState({
		    	selectedcantId: "",
		    });
		  }
		  else
		  {
			  alert("请选择地点");
		  }
    },
    
});
export default PlaceTree;