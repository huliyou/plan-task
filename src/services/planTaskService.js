import { request } from '../utils'
import Config from '../utils/config'

// !!!: 此处去做异步请求
//
//
// 搜索获取任务列表
export async function getTasksRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/',
    method: 'get',
    data: params,
  })
}
// 根据planId获取任务列表
export async function getTasksByIdRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/',
    method: 'get',
    data: params,
  })
}

// 获取计划详情
export async function getPlanInfoRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getPlanInfo',
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

// 保存任务
export async function createPlanRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/save',
    method: 'post',
    data: params,
  })
}

// 更改计划
export async function changePlanRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/savePlan',
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


// 催办任务
export async function remindersTaskRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/saveVice',
    method: 'get',
    data: params,
  })
}

// 关注任务
export async function followTaskRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectplan/savePlanCollection',
    method: 'get',
    data: params,
  })
}

// 删除任务
export async function deleteTaskRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/delete',
    method: 'get',
    data: params,
  })
}

// 关联任务
export async function relationTaskRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectplan/saveProcRelation',
    method: 'get',
    data: params,
  })
}

// 获取任务详情
export async function getTaskInfoRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getQueryInfo',
    method: 'get',
    data: params,
  })
}

// 根据任务ID获取关联任务列表
export async function getRelationTaskListRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getRelevance',
    method: 'get',
    data: params,
  })
}

// 根据任务ID获取附件列表
export async function getFilesListRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getQueryFiles',
    method: 'get',
    data: params,
  })
}


// 根据任务ID获取上级任务列表
export async function getParentTaskListRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getAllRelation',
    method: 'get',
    data: params,
  })
}

// 根据任务ID获取评论列表
export async function getCommentListRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getQueryComment',
    method: 'get',
    data: params,
  })
}

// 根据任务ID获取操作记录列表
export async function getLogListRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/getQueryLog',
    method: 'get',
    data: params,
  })
}

// 根据任务ID添加评论
export async function addCommentRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectproc/saveComment',
    method: 'get',
    data: params,
  })
}

// 根据任务ID保存附件
export async function saveFileRequest(params) {
  return request({
    url: 'http://localhost:9000/TRDP/csm_proc/rest/projectplan/upload',
    method: 'get',
    data: params,
  })
}
