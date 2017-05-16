import React, {PropTypes} from 'react';
import {Table} from 'antd';
import ProbItem from './ProbItem/ProbItem';
import DetailItem from './ProbItem/DetailItem';

const {Column} = Table;

function ProbsListBody({
	pathname,
    probsList,
}) {
	return(
	<div>
		{
		probsList.map((item,index)=>{
			if(item.probStatus == '待关闭'){
				return <ProbItem pathname={'/prob_detail/to_close'} key={index} probItem={item} probId={item.probId} />;	
			}else{
				return <DetailItem pathname={'/prob_detail/in_process'} key={index} probItem={item} probId={item.probId} />;	
			}
		  })
		}
	</div>
   )
}

ProbsListBody.propTypes = {
	pathname:PropTypes.string.isRequired,
    probsList: PropTypes.array.isRequired,
};
export default ProbsListBody;
