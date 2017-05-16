import { request } from '../utils'
import Config from '../utils/config'

export async function queryPlanList (params) {
  return request({
   url: Config.baseURL+'/csm_proc/rest/projectplan/tree',
    method: 'get',
    data: params,
  })
}

export async function query (params) {
	  return request({
	    url: Config.baseURL+'/csm_pub/rest/PubCant/',
	    method: 'get',
	    data: params,
	  })
	}

export async function create (params) {
	 console.log("parm",params);
	  return request({
		url: Config.baseURL+'/csm_pub/rest/PubCant/save',
	    method: 'post',
	    data: params,
	  })
	}
