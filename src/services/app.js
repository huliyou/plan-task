import { request } from '../utils'
import Config from '../utils/config'

export async function login (params) {
  return request({
    url: Config.baseURL+'/csm_pub/rest/login/userLoginAuth',
    method: 'get',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: Config.baseURL+'/csm_pub/rest/login/userLoginCancel',
    method: 'post',
    data: params,
  })
}

export async function userInfo (params) {
  return request({
    url: Config.baseURL+'/csm_pub/rest/login/getLoginUserInfo',
    method: 'get',
    data: params,
  })
}
