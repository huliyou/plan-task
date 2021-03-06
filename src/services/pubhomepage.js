import { request } from '../utils'
import Config from '../utils/config'

export async function query (params) {
  return request({
	url: Config.baseURL+'/csm_pub/rest/prjMaintenance/queryPrj',
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: '/api/users',
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: '/api/users',
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: '/api/users',
    method: 'put',
    data: params,
  })
}
