import { create, remove, update, query, outpool ,findProjectPerson} from '../services/pond'
import { findByProb } from '../services/communicate';
import { parse } from 'qs';
import { message } from 'antd';
import { getTasksRequest, getTasksMenuRequest } from '../services/planTaskService.js';
import Immutable from 'immutable';

export default {
  namespace: 'TaskManager',
  // !!!: Modal的状态
  state: {
    // menu树
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
            planId: 3, //计划项编号
            planCode: '23141', // 计划项编码
            planTitle: '未计划任务', // 计划项标题
          },
          {
            planId: 4, //计划项编号
            planCode: '23141', // 计划项编码
            planTitle: '未计划任务', // 计划项标题
          },
        ]
      },
    ],
    taskList: [{
      key: 1,
      procId: 1,
      planName: '计划1',
      status: '新建',
      workDay: 30,
      procType: '设计',
      weight: '30%',
      pDuty: 'wangsds',
      createTime: '2017-04-01',
      children: [{
        key: 2,
        procId: 34,
        planName: '计划1',
        status: '新建',
        workDay: 30,
        procType: '设计',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-01',
      }, {
        key: 3,
        procId: 6,
        planName: '计划1',
        status: '新建',
        workDay: 30,
        procType: '设计',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-01',
        children: [{
          key: 4,
          procId: 7,
          planName: '计划2',
          status: '已完成',
          workDay: 30,
          procType: '设计',
          weight: '30%',
          pDuty: 'wangsds',
          createTime: '2017-04-02',
        }],
      }, {
        key: 5,
        procId: 4,
        planName: '计划2',
        status: '已完成',
        workDay: 30,
        procType: '设计',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-02',
        children: [{
          key: 6,
          procId: 5,
          planName: '计划2',
          status: '已完成',
          workDay: 30,
          procType: '设计',
          weight: '30%',
          pDuty: 'wangsds',
          createTime: '2017-04-02',
        }],
      }],
    }, {
      key: 7,
      procId: 2,
      planName: '计划2',
      status: '已完成',
      workDay: 30,
      procType: '设计',
      weight: '30%',
      pDuty: 'wangsds',
      createTime: '2017-04-02',
    }],
  },
  // !!!: Modal订阅
  subscriptions: {
  },
  // !!!: Modal有哪些行为（effects理解为行为或者影响）
  effects: {
    // 异步请求行为 获取taskList
    *getTasks ({ payload }, { call, put }) {
      put({ type: 'getTasksLoading' });
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
    },
    // 异步请求行为 获取taskList
    *getTasksMenu ({ payload }, { call, put }) {
      put({ type: 'getTasksMenuLoading' })
      const requestResult = call(getTasksMenuRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'getTasksMenuSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'getTasksMenuFailure'});
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
