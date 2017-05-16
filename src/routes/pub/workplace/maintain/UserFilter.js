import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Switch } from 'antd'
import UserModal  from './UserModal';

class UserFilter extends React.Component {
	state = { 
			visible: false,
		}
	render(){
		return (
				<Row gutter={24}>
			      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
			       
			      </Col>
			      <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
			        <Button size="large" type="ghost" onClick={this.newWin}>新建地点</Button>
			      </Col>
			      <UserModal {...this}/>
			    </Row>
		)
	}
	newWin = () => {
		if(this.state.selectedCantId)
	    {
    		alert(this.state.selectedCantId)
    	  this.setState({ 
   	         visible : true,
   	       });
	    }
    	else
		{
    		alert("请选择地点");
		}
	}
	closeWin = () =>{
		this.setState({
			visible: false,
		});
	}
}

export default Form.create()(UserFilter)