import { request } from '../utils'
import Config from '../utils/config'

export async function query (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probpool/queryProbPool',
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/createissue',
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

/**
 * 出池
 */
export async function outpool (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probpartake/savePartake',
    method: 'post',
    data: params,
  })
}

/**
 * 入池
 */
export async function enterpool (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probpartake/saveInPool',
    method: 'post',
    data: params,
  })
}
export async function findProjectPerson (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probPublic/findProjectPerson',
    method: 'get',
    data: params,
  })
}
