import React, { PropTypes } from 'react'
import { connect } from 'dva'
import {Button,Modal} from 'antd'
import styles from './homePage.less'
import bjtupian from '../../../img/pub/zhuye/zhuYeBeiJing3.png';
import cons from '../../../img/pub/zhuye/zhuYeShouCang1.png';
import newPrj from '../project/createprj111';
import Config from '../../../utils/config'
var $ = require('jquery');
const confirm = Modal.confirm
function getAjaxData(url,type,obj,sentdata){
	 $.ajax({
	       url:url,
	       type:type,
	       data:'param='+JSON.stringify(obj),
	       datatype:'json',
	       async:true,
	       success:function(data){sentdata(data)},
	       error:function(data){ sentdata(data)}
	      })
	}
function Home ({ loading, dataSource,createprj,homepage}) {
	const homeData=eval(homepage.list);
	const showList = (key) => {
    	var i=key+1;
    	$('#topbox1>div').eq(i).find('div').css('display','block');
	}
	const  leaveList = (key) => {
    	var p=key+1;
    	$('#topbox1>div').eq(p).find('div').css('display','none');
	}
	
	const deletePrj = (prjId) => {
		confirm({
	        title: '您确定要删除这条记录吗?',
	        onOk () {
	        	let obj={};
	    		obj.prjId = prjId;//项目ID
	    		console.log('obj',obj);
	    		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/deletePrj','get',obj,sentdata);
	    		function sentdata(data){
	    			console.log('data',eval(data.items));
	    		}
	        }
	      })
	}
	
    return(
       	 <div className={styles.bodyBox} id='topbox1'>
            <p className={styles.toptitle}>欢迎登陆息化建设现场管理系统</p>
   	        <p className={styles.ptxt1}>想了解如何使用国家电网信息化建设现场管理系统进行项目管理、代码托管与文档版本管理</p>
   	        <p className={styles.ptxt2}>持续集成与交互？请访问<a>帮助中心</a></p>
            <div className={styles.ptxt3}>
            <newPrj />
            </div>
            <p className={styles.ptxt4}>我的项目</p>
   			{
   				homeData && homeData.map((value,key)=>{
                       return(
                           <div className={styles.itembox} key={key}>
                           	<a className={styles.setpro} onMouseLeave={() => leaveList(key)}>
   		                        <img src={cons} onClick={() => showList(key)}></img>
   		                        <div className={styles.setlist}>
   		                       <span>
   		                       		<Button size="large" type="ghost" onClick={() => deletePrj(value.prjId)}>删除项目</Button>
   		                       </span>   
   		                       <span>
   		                       		<Button size="large" type="ghost" onClick={createprj}>项目编辑</Button>
   		                       </span>
   		                        </div>
   	                        </a>
   	                        <p><span className={styles.onebox}>{value.prjName}</span></p>
   	                        <p><span className={styles.onebox}>{value.creTime}</span></p>
                           </div>
                           )
                   })
               }
            </div>
       	)
}
Home.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  createprj: PropTypes.func,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
}

export default connect(({homepage})=>({homepage}))(Home);Home
