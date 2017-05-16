import { request } from '../utils'
import Config from '../utils/config'

export async function query (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probmycreate/queryMyCreate',
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
    url: Config.baseURL+'/csm_prob/rest/probinfo/delete2',
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/createissue',
    method: 'post',
    data: params,
  })
}

export async function findByProb (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/findByProb',
    method: 'get',
    data: params,
  })
}