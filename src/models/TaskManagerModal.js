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
    taskListCard: [{
      procType: '设计',
      data: [{procId: 2,
      planName: '计划2',
      status: '已完成',
      workDay: 30,
      procType: '设计',
      weight: '30%',
      pDuty: 'wangsds',
      createTime: '2017-04-02'},
      {
        procId: 3,
        planName: '计划2',
        status: '已完成',
        workDay: 30,
        procType: '设计',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-02',
      }, {
        procId: 4,
        planName: '计划2',
        status: '已完成',
        workDay: 30,
        procType: '设计',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-02',
      }, {
        procId: 5,
        planName: '计划2',
        status: '已完成',
        workDay: 30,
        procType: '设计',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-02',
      }],
    }, {
      procType: '需求',
      data: [{
        procId: 6,
        planName: '计划2',
        status: '已完成',
        workDay: 30,
        procType: '需求',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-02',
      }],
    }],
    taskCardData: {
      taskCount: 20, // 任务总数
      completeTask: 16, // 完成任务总数
      remainTime: 18, // 剩余时间天数
      // 数据统计数据
      cardData: [
        {
          type: '运维',
          taskNumber: 10,
          completeTask: 2,
        },
        {
          type: '设计',
          taskNumber: 10,
          completeTask: 2,
        },
        {
          type: '开发',
          taskNumber: 10,
          completeTask: 8,
        },
        {
          type: '测试',
          taskNumber: 10,
          completeTask: 2,
        },
        {
          type: '交付',
          taskNumber: 10,
          completeTask: 2,
        },
        {
          type: '验收',
          taskNumber: 10,
          completeTask: 2,
        }
      ],
      // 燃尽图数据
      lineData: [
        {time: '2017-03-01', 任务总数: 4000, 实际进度: 2400 },
        {time: '2017-04-01', 任务总数: 3000, 实际进度: 1398 },
        {time: '2017-05-01', 任务总数: 2000, 实际进度: 9800 },
      ],
    }
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
        put({ type: 'getTasksFailure' });
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
