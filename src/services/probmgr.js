import { request } from '../utils'
import Config from '../utils/config'

/**
 * [问题管理首页代办列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function query (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryMydealProbInfo',
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

/**
 * 问题推荐
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function recommend (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryRecommendProbs',
    method: 'get',
    data: params,
  })
}

export async function colsed (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryClosedProbs',
    method: 'get',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/save',
    method: 'post',
    data: params,
  })
}
