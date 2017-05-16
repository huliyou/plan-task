import { request } from '../utils'
import Config from '../utils/config'

// !!!: 此处去做异步请求
export async function getTasksRequest (params) {
  return request({
    // !!!: 次处填写正确的url
    url: 'url',
    method: 'get',
    data: params,
  })
}
