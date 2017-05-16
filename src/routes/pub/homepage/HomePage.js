import React, { PropTypes } from 'react'
import { connect } from 'dva'
import {Button,Modal} from 'antd'
import styles from './homePage.less'
import {config} from '../../../utils'
import Createprj from '../project/createprj';
import Updateprj from './updateprj';
import Config from '../../../utils/config'
import moment from 'moment';
var $ = require('jquery');
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm
function getAjaxData(url,type,obj,sentdata){
	 $.ajax({
	       url:url ,
	       type:type,
	       data:'param='+JSON.stringify(obj),
	       datatype:'json',
	       async:false,
	       success:function(data){sentdata(data)},
	       error:function(data){ sentdata(data)}
	      })
}
//function getData (prjId){
//	let obj={};
//	obj.prjId = prjId;//项目ID
//	console.log('prjIdsss',obj);
//	getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/deletePrj','get',obj,sentdata);
//	function sentdata(data){
//		console.log('data',data);
//	}
//}
class Home extends React.Component {
	state = { 
			visible: false,
			crevisible: false,
			homeData:"",
			updateprjId:"",
		}
	componentWillMount = () =>  {
		//初始化查询
		this.init();
	}
	init = () =>{
		let obj={};
		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/queryPrj','get',obj,this.getInit);
	}
	getInit = (data) =>{
		console.log(4511,data.items);
		this.setState({
			homeData: data.items,
		});
		console.log("初始化项目",this.state.homeData);
	}
	showList = (key) => {
    	var i=key+1;
    	$('#topbox1>div').eq(i).find('div').css('display','block');
	}
	leaveList = (key) => {
    	var p=key+1;
    	$('#topbox1>div').eq(p).find('div').css('display','none');
	}
	showCrePrj = () =>{
		//显示新建项目页面
		this.setState({
			crevisible: true,
		});
		this.refs.bb.getForm().resetFields();
	}
	closeCrePrj= () =>{
		//关闭新建项目页
		this.setState({
			crevisible: false,
		});
	}
	
	showPrj = (value) => {
		//显示项目编辑
		//初始化工作地点
		//this.getCantCity(value);
		this.setState({
			visible: true,
			updatePrjId:value.prjId,//项目Id
			updatePrjName:value.prjName,//项目名称
			updatePrjNo:value.prjNo,//项目编码
			updatePrjType:value.prjType,//项目类型
			updateImGrade:value.imGrade,//重要程度
			updatePrjDesc:value.prjDesc,//项目描述
			updatePrjDept:value.prjDept,//归属部门
			updatePrjOrg:value.prjOrg,//归属单位
			updateDevOrg:value.devOrg,//承建单位
			updateDerDept:value.derDept,//承建部门
			updateManager:value.Manager,//项目经理
			udapteBeginDate:value.beginDate ? value.beginDate : moment(),//项目起始时间
			udapteEndDate:value.endDate ? value.endDate : moment(),//项目结束时间
			updatePrjStatus:value.prjStatus,//项目状态
			updatePrjPhase:value.prjPhase,//项目阶段
			updateIsSecrecy:value.isSecrecy,//是否保密
			updatePrjDesc:value.prjDesc,//项目描述
			updatePrjTarget:value.prjTarget,//项目目标
			datas:value,
		});
		this.refs.aa.getForm().resetFields();
	}
//	getCantCity = (value) => {
//		//初始化工作地点省份
//		let obj={};
//		obj.prjId=value.prjId;
//		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/queryCantById','get',obj,this.getCantCityData);
//	}
//	getCantCityData = (data) => {
//		//初始化工作地点省份数据
//		console.log('cantName',data);
//		this.setState({
//			CantCity:data.items.cantName,
//		    });
//	}
	
	deletePrj = (prjId) => {
		//删除项目方法
		let obj={};
		obj.prjId = prjId;//项目ID
		console.log('obj',obj);
		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/deletePrj','get',obj,this.init);
//		confirm({
//	        title: '您确定要删除这条记录吗?',
//	        onOk () {
//	        	this.getData(prjId);
//	        }
//	      })
	}
	upPrj = () =>{
		//关闭编辑项目页
		this.setState({
			visible: false,
		});
	}
	getData = () =>{
		let obj={};
		obj.prjId = prjId;//项目ID
		console.log('obj',obj);
		getAjaxData(Config.baseURL+'/csm_pub/rest/prjMaintenance/deletePrj','get',obj,this.init);
	}
	render(){
    return(
      	 <div className={styles.bodyBox} id='topbox1'>
            <p className={styles.toptitle}>欢迎登陆息化建设现场管理系统</p>
  	        <p className={styles.ptxt1}>想了解如何使用国家电网信息化建设现场管理系统进行项目管理、代码托管与文档版本管理</p>
  	        <p className={styles.ptxt2}>持续集成与交互？请访问<a>帮助中心</a></p>
           <div className={styles.ptxt3}>
           <p onClick={() => this.showCrePrj()}>创建项目</p>
           <Createprj {...this} ref="bb"/>
           <Updateprj {...this} ref="aa"/>
           </div>
           
           <p className={styles.ptxt4}>我的项目</p>
  			{
  				this.state.homeData && this.state.homeData.map((value,key)=>{
                      return(
                          <div className={styles.itembox} key={key}>
                          	<a className={styles.setpro} onMouseLeave={() => this.leaveList(key)}>
  		                        <img src={config.imgURL+'/assets/pub/zhuye/zhuYeShouCang1.png'} onClick={() => this.showList(key)}></img>
  		                        <div className={styles.setlist}>
  		                       <span onClick={() => this.deletePrj(value.prjId)}>删除项目</span>   
  		                       <span onClick={() => this.showPrj(value)}>项目编辑</span>
  		                        </div>
  	                        </a>
  	                        <p><span title={value.prjName} className={styles.onebox}>{value.prjName.substring(11,-2)}</span></p>
  	                        <p><span className={styles.onebox}>{value.creTime}</span></p>
                          </div>
                          )
                  })
              }
           </div>
      	)
	}
	
}
export default Home