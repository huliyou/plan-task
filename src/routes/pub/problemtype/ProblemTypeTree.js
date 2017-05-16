import React, { PropTypes } from 'react'
import { Tree,Button, Row, Col,Form, } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
const TreeNode = Tree.TreeNode;

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
        this.props.initProblemTypeTree();
    },

    //渲染并返回一个虚拟DOM
    render:function() {
        return(
        		<div style={{width:350,background:'#ffffff',height:600}}>
	        		<Row>
			    		<Col span={5}> 
				    	</Col>
				    	<Col span={6}> 
				    		<Button type="primary" onClick={this.addProblemType}>新建问题类型</Button>
				    	</Col>
				    	<Col span={2}> 
				    	</Col>
				    	<Col span={6}> 
			    		</Col>
			    		<Col span={5}> 
				    	</Col>
				    </Row>
	        		<Tree showLine onSelect={this.props.setselectedProblemType} className="draggable-tree">
		               {this.props.state.treeNodes}
		            </Tree>
	            </div>
            );
    },

    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
    },
    
    addProblemType:function() {
    	if(this.props.state.selectedProblemType.probTypeId){
    		let obj={};
    		obj.probTypeId=this.props.state.selectedProblemType.probTypeId;
    		obj.upTypeId=this.props.state.selectedProblemType.upTypeId;
    		this.props.setAddProbType();
//    		alert('addProblemType:'+this.props.state.selectedProblemType.upTypeId);
    	}else{
    		alert("请选择问题类型");
    	}
    },
    
  
});
export default Form.create()(TempletPlanTree);