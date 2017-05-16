import React, { PropTypes } from 'react'
import { Layout,Button ,Form,Row, Col,Tree} from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PlanTree  from './PlanTree';
import UserList  from './UserList';
import UserFilter  from './UserFilter';
import UserModal  from './UserModal';
import UserUpdateModal  from './UserUpdateModal';
import TaskModal  from './TaskModal';
const { Sider, Content } = Layout;
const TreeNode = Tree.TreeNode;

function Demo({proc,location,loading,dispatch}){
	const { list, pagination, currentItem, modalVisible, modalType, isMotion,selectedPlanId,treeNodes,modalVisible2 } = proc;
	const userListProps = {
		dataSource: list,
	   loading,
	    pagination,
	    location,
	    isMotion,
	    onPageChange (page) {
		      const { query, pathname } = location
		      dispatch(routerRedux.push({
		        pathname,
		        query: {
		          ...query,
		          page: page.current,
		          pageSize: page.pageSize,
		        },
		      }))
		    },
		onQuery(palnId){
		    	dispatch({
			        type: 'proc/query',
			        payload: {
			        	palnId:palnId,
			        },
			      })
		    },  
		 onDeleteItem (id) {
		        dispatch({
		          type: 'proc/delete',
		          payload: id,
		        })
		      },  
		  onOk (item){
			        dispatch({
				          type: 'proc/create',
				          payload: item,
				        })
				      },
		   onEditItem (item) {
          dispatch({
              type: 'proc/showModal',
              payload: {
                modalType: 'update',
                currentItem: item,
              },
            })
          },
		          
		 onShowProcAssociation (){
			          dispatch({
			              type: 'proc/showModal2',
			              payload: {
			                modalType: 'update',
			              },
			            })
			          }      
		     }
	const userUpdateModalProps = {
		    item: modalType === 'create' ? {} : currentItem,
		    type: 'create',
		//    visible: false,
		    visible:modalVisible,   
		    onOk (item) {
		      dispatch({
		        type: `proc/${modalType}`,
		        payload: item,
		      })
		    },
		    
		    onCancel () {
		      dispatch({
		        type: 'proc/hideModal',
		      })
		    },
		  }
	
	const taskModalProps = {
		    item: modalType === 'create' ? {} : currentItem,
		    type: 'create',
//		    visible: false,
		    visible:modalVisible2,
		    onOk (item) {
		      dispatch({
		        type: `proc/${modalType}`,
		        payload: item,
		      })
		    },
		    
		    onCancel () {
		      dispatch({
		        type: 'proc/hideModal2',
		      })
		    },
		  }
	
	
	    //1.创建阶段
	    const getDefaultProps = () => {
	    	return {};
	    }

	    //2.实例化阶段

	    const getInitialState = () => {
	    	return {};
	    }

	    //render之前调用，业务逻辑都应该放在这里，如对state的操作等
	    const componentWillMount = () => {
	    	console.log("----------componentWillMount----------");
	    }
	    
	    
	    //渲染并返回一个虚拟DOM
//	    render:function() {
	    	
//	    	const { getFieldDecorator } = this.props.form;
	        return(
	        		<div>
	        		<div style={{ padding: 0, minHeight: 60,wdith: 400,height:60 }} >
	        			
	        		</div>
	    			<Layout style={{ background: '#FFFFFF', padding: 0, minHeight: 380,wdith: 800,height:700 }}>
	    		         <Sider style={{ background: '#FFFFFF',wdith:300}}>
	    		            <PlanTree {...userListProps}/>
	    		         </Sider>
	    		     <Layout >
	    		     
	    		          <Content style={{ background: '##DDDDDD'}}>
	    		          	<Row>
	    			          	<Col span={22}>	 
	    		      			</Col> 
	    	          			<Col span={2}>	 
	    	          			<UserModal {...userListProps}/>
	    	          			<UserUpdateModal {...userUpdateModalProps}/>
	    	          			<TaskModal {...taskModalProps}/>
	    	          			</Col> 
	    	                </Row>
	    	                <Row>
	    	            		<Col span={24}>	 
	    	            			<UserList {...userListProps} />
	    	            		</Col> 
	    		            </Row>
	    		          </Content>
	    		      </Layout>
	    		    </Layout>
	    		  </div>
	        )
//	    },

	    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构

	    const componentDidMount = () => {
	    }
	    
	    const refrashTree = (data) => {
	    	console.log("refrashTree",data);
	    	this.setState({
	        	treeNodes: this.loop(data.resultValue.items),
	  	    });
	    }       
	    
	    const loop = (data,parentPlanCode) =>{
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
	    }
}

Demo.propTypes = {
		  proc: PropTypes.object,
		  location: PropTypes.object,
		  loading: PropTypes.bool,
		}
export default connect(({ proc, loading }) => ({ proc, loading: loading.models.proc })) (Demo)