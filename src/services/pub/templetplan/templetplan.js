import { request } from '../../../utils'
import Config from '../../../utils/config'

export async function queryTempletPlanList (params) {
  return request({
   url: Config.baseURL+'/csm_proc/rest/projectproc/getPlanList?param={"prjId":"4028b4b15aeee0d9015aef7abfe60003"}',
    method: 'get',
    data: params,
  })
}

export async function createTempletPlan (params) {
	 console.log("parm",params);
	  return request({
		url: Config.baseURL+'/csm_proc/rest/projectplan/save',
	    method: 'post',
	    data: params,
	  })
	}