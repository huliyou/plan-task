import { request } from '../utils'
import Config from '../utils/config'

/**
 * 沟通中
 */
export async function query (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryAllProb',
    method: 'get',
    data: params,
  })
}

/**
 * 沟通历史
 */
export async function queryHistory (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryCommunicationHistory',
    method: 'get',
    data: params,
  })
}

//查询问题详情的评论列表
export async function queryCom (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryProbInfo',
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/save',
    method: 'post',
    data: params,
  })
}

/**
 * 删除问题
 */
export async function remove (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/delete2',
    method: 'post',
    data: params,
  })
}

/**
 * 提交问题
 */
export async function submit (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/probInfoSubmit',
    method: 'post',
    data: params,
  })
}

/**
 * 问题处理
 */
export async function updateHandle (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/savesolveproblem',
    method: 'post',
    data: params,
  })
}

/**
 * 问题转交
 */
export async function transfer (params) {
  console.log(params)
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/transfer',
    method: 'post',
    data: params,
  })
}

/**
 * 查询详情
 * @param  问题id
 * @return 问题详情
 */
export async function queryDetail (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryDetail',
    method: 'get',
    data: params,
  })
}

/**
 *  问题未解决 
 */
export async function unresolved (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probpartake/saveInUnSolve',
    method: 'post',
    data: params,
  })
}


/**
 * 入集市
 */
export async function enterMarket (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probpartake/saveInMarket',
    method: 'post',
    data: params,
  })
  }

/**
 * 评价
 */
export async function outEvaluate (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/probInfoEvaluate',
    method: 'post',
    data: params,
  })
}

/**
 * 带文件列表的问题详情查询
 */
export async function findByProbId (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/findByProbId',
    method: 'get',
    data: params,
  })
}
/**
 * [查询问题评论列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function queryDiscuss (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probdiscussinfo/queryDiscuss',
    method: 'get',
    data: params,
  })
}


/**
 * 邀请协助
 */
export async function pleaseAssist (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probpartake/invitationList',
    method: 'post',    
    data: params,
  })
}

/**
 * 问题详情添加评论
 */
export async function Insertdisscuss (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probdiscussinfo/Insertdisscuss',
    method: 'post',
    data: params,
  })
}

/**
 * 问题补充
 */
export async function supplement (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probsupplement/saveprobSupplement',
    method: 'post',
    data: params,
  })
}
/**
 * 查询问题评价信息
 */
export async function findEvaluateById (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/findEvaluateById',
    method: 'get',
    data: params,
  })
}

/**
 * 查询操作记录
 */
export async function record (params) {
  return request({
    url: Config.baseURL+'/csm_prob/rest/probinfo/queryProbPartakeRecord',
    method: 'get',
    data: params,
  })
}

