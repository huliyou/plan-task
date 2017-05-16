import React, { PropTypes } from 'react'
import { Layout } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PlaceTree  from './placeTree';
import ConfOperation  from './ConfLayout';
import UserFilter  from './UserFilter';



const { Sider, Content } = Layout;
function Demo({maintain,location,loading,dispatch}){
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = maintain
	
  const confLayoutProps = {
		  dataSource: list,
		  onQuery(cantId){
		    	dispatch({
			        type: 'maintain/query',
			        payload: {
			        	cantId: cantId,
			        },
			      })
		    }, 	
		    
		  
  }
  //新建计划模板弹窗


  const userFilterProps = {
	
	    onAdd () {
	      dispatch({
	        type: 'maintain/showModal',
	        payload: {
	          modalType: 'create',
	        },
	      })
	    },
	    switchIsMotion () {
	      dispatch({ type: 'maintain/switchIsMotion' })
	    },
	  }




    return (
    		<div>
	    		<div style={{ padding: 0, minHeight: 0,wdith: 600,height:0 }} >
	    		</div>
    			<Layout style={{ background: '#FFFFFF', padding: 0, minHeight: 380,wdith: 1042,height:500 }}>
			       <Sider style={{ background: '#FFFFFF',wdith:600}}>
			          <PlaceTree {...confLayoutProps}/>
			       </Sider>
			       <Layout style={{ wdith:642}}>
			          <Content style={{ background: '##DDDDDD'}}>
			          <UserFilter {...userFilterProps} />
			          <ConfOperation {...confLayoutProps} />
			          </Content>
			       </Layout>
			    </Layout>
			</div>
    );
    
}

Demo.propTypes = {
  maintain: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ maintain, loading }) => ({ maintain, loading: loading.models.maintain }))(Demo)