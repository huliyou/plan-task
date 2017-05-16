import { request } from '../utils'
import Config from '../utils/config'

export async function queryPlanList (params) {
  return request({
   url: Config.baseURL+'/csm_proc/rest/projectplan/tree',
    method: 'get',
    data: params,
  })
}

export async function create (params) {
	 console.log("parm",params);
	  return request({
		url: Config.baseURL+'/csm_proc/rest/projectproc/save',
	    method: 'post',
	    data: params,
	  })
	}

export async function query (params) {
	  return request({
	    url: Config.baseURL+'/csm_proc/rest/projectproc/',
	    method: 'get',
	    data: params,
	  })
	}

export async function delet (params) {
	  return request({
	    url: Config.baseURL+'/csm_proc/rest/projectproc/delete',
	    method: 'POST',
	    data: params,
	  })
	}

export async function update (params) {
	  return request({
	    url: Config.baseURL+'/csm_proc/rest/projectproc/update',
	    method: 'POST',
	    data: params,
	  })
	}

export async function queryAddInfo (params) {
	  return request({
	    url: Config.baseURL+'/csm_proc/rest/projectproc/queryAddInfo',
	    method: 'POST',
	    data: params,
	  })
	}