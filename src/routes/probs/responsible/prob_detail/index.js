import ProbDetail from '../../../../components/Probs/ProbDetail/ProbDetail';
import { routerRedux,Link } from 'dva/router';
import React, { PropTypes } from 'react';
import { connect } from 'dva';

function ResProbDetail({
  probItem,
  location, 
  postsList,
  dispatch,
  commentlist,
  modalVisible,
  supplementVisble,
  transferVisble,
  unresolved,
  assisVisble,
  outpoolVisble,
  marketVisble,
  evaluateVisble,
}){

	const probDetailProps = {
		probItem,
	  location, 
	  postsList,
	  dispatch,
	  assisVisble:false,
	  commentlist,
	  modalVisible,
	  supplementVisble,
	  transferVisble,
	  unresolved,
	  outpoolVisble,
	  marketVisble,
	  evaluateVisble,
	}
  return(
  		<ProbDetail {...probDetailProps}/>
  )

}
export default ResProbDetail;