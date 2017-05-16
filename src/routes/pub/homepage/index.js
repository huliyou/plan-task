import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Homepage from './HomePage'
function HomePage ({ location, dispatch, loading,homepage }) {
  const {modalVisible,list} = homepage
  const userModalProps = {
    visible: modalVisible,
    onCancel () {
        dispatch({ 
          type: 'homepage/hideModal',
        })
    },
  }
  const userListProps = {
		dataSource: list,
  }
  const userFilterProps = {
//		  createprj () {
//	        dispatch({
//	          type: 'homepage/showModal',
//	          payload: {
//	            modalType: 'create',
//	          },
//	        })
//	      },
  }
  return (
		  
    <div className="content-inner">
      <Homepage {...userFilterProps} />
    </div>
  )
}

HomePage.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}  

export default connect(({ homepage, loading }) => ({ homepage, loading: loading.models.homepage }))(HomePage)
