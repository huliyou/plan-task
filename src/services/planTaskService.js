import { request } from '../utils'
import Config from '../utils/config'

// !!!: 此处去做异步请求
//
// 获取任务列表
export async function getTasksRequest (params) {
  return request({
    // !!!: 次处填写正确的url
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/',
    method: 'get',
    data: params,
  })
}

// 获取task menu
export async function getTasksMenuRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getPlanList',
    method: 'get',
    data: params,
  })
}
// 新建子计划
export async function createChildPlanRequest(params) {
  return request({
    url: '',
    method: 'post',
    data: params,
  })
}

// 新建任务
export async function createPlanRequest(params) {
  return request({
    url: '',
    method: 'post',
    data: params,
  })
}

// 更改任务
export async function changePlanRequest(params) {
  return request({
    url: '',
    method: 'post',
    data: params,
  })
}

// 删除计划
export async function deletePlanRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/deletePlan',
    method: 'get',
    data: params,
  })
}

export async function getTasksByIdRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/',
    method: 'get',
    data: params,
  })
}

export async function editPlanRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectplan/savePrjPlanChangeInfo',
    method: 'get',
    data: params,
  })
}

// 归档
export async function filePlanRequest(params) {
  return request({
    url: '',
    method: 'get',
    data: params,
  })
}

// 收藏计划
export async function collectPlanRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectplan/savePlanCollection',
    method: 'get',
    data: params,
  })
}
