import { create, remove, update, query, outpool ,findProjectPerson} from '../services/pond'
import { findByProb } from '../services/communicate';
import { parse } from 'qs';
import { message } from 'antd';
import { getTasksRequest } from '../services/planTaskService.js';
import Immutable from 'immutable';

export default {
  // !!!: Modal的名字，connect中绑定此Modal的数据，state.MyDuty.....
  namespace: 'planTask',
  // !!!: Modal的状态
  state: {
    taskMenu: [
      {
        planId: 1, //计划项编号
        planCode: '23141', // 计划项编码
        planTitle: '未计划任务', // 计划项标题
      },
      {
        planId: 2, //计划项编号
        planCode: '23141', // 计划项编码
        planTitle: '未计划任务', // 计划项标题
        planChild: [
          {
            planId: 1, //计划项编号
            planCode: '23141', // 计划项编码
            planTitle: '未计划任务', // 计划项标题
          },
          {
            planId: 1, //计划项编号
            planCode: '23141', // 计划项编码
            planTitle: '未计划任务', // 计划项标题
          },
        ]
      },
    ],
  },
  // !!!: Modal订阅
  subscriptions: {
  },
  // !!!: Modal有哪些行为（effects理解为行为或者影响）
  effects: {
    // 异步请求行为
    *getTasks({ payload}, { call, put}){
      put({ type: 'getTasksLoading'});
      const requestResult = call(getTasksRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'getTasksSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'getTasksFailure'});
      }
    }
  },
  // !!!: 行为产生的对state的数据加工，函数名跟effect中的type匹配
  reducers: {
    getTasksLoading(state, action) {
      // 修改状态的loading标志
    },
    getTasksSuccess(state, action) {
      // 修改状态的tasks状态
    },
    getTasksFailure(state, action) {
      // 修改状态的error标志
    },
    changeGroup(state, action) {
      return {
        ...state,
        searchData: {
          group: action.payload.group,
        },
      }
    }
  },
}
