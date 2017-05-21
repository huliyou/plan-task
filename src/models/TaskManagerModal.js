import { create, remove, update, query, outpool ,findProjectPerson} from '../services/pond'
import { findByProb } from '../services/communicate';
import { parse } from 'qs';
import { message } from 'antd';
import { getTasksRequest, getTasksMenuRequest, createChildPlanRequest,
  createPlanRequest, deletePlanRequest, filePlanRequest, collectPlanRequest,
  getTasksByIdRequest, editPlanRequest, changePlanPlanRequest, getRelationPlanListRequest
 } from '../services/planTaskService.js';
import Immutable from 'immutable';

const planItems = [
    {
        "planId": "04a20787359711e7bbc2005056a42951",
        "planCode": null,
        "parentPlanCode": "",
        "planTitle": "平台分项方案工作",
        "isLeaf": "false",
        "percent": "20%",
    },
    {
        "planId": "05e16527359711e7bbc2005056a42951",
        "planCode": null,
        "parentPlanCode": "03a9b24c359711e7bbc2005056a42951",
        "planTitle": "整体计划完善",
        "isLeaf": "true",
        "percent": "20%",
    },
    {
        "planId": "04a20ec8359711e7bbc2005056a42951",
        "planCode": null,
        "parentPlanCode": "",
        "planTitle": "需求获取与确认工作",
        "isLeaf": "false",
        "percent": "20%",
    },
    {
        "planId": "064ce491359711e7bbc2005056a42951",
        "planCode": null,
        "parentPlanCode": "04a20ec8359711e7bbc2005056a42951",
        "planTitle": "需求研讨分析",
        "isLeaf": "true",
        "percent": "20%",
    },
    {
        "planId": "05e165d7359711e7bbc2005056a42951",
        "planCode": null,
        "parentPlanCode": "03a9b24c359711e7bbc2005056a42951",
        "planTitle": "项目人员筹备工作",
        "isLeaf": "true",
        "percent": "20%",
    },
    {
        "planId": "05e1672e359711e7bbc2005056a42951",
        "planCode": null,
        "parentPlanCode": "03a9b24c359711e7bbc2005056a42951",
        "planTitle": "搭建测试环境",
        "isLeaf": "true",
        "percent": "20%",
    },
  ];


export default {
  namespace: 'TaskManager',
  // !!!: Modal的状态
  state: {
    isFetching: false,
    errMsg: '',
    selectPlanId: null,
    // menu树
    planItems,
    // 任务列表
    taskList: {
      total: 160,
      current: 1,
      listData: [{
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
    taskListCard: [{
      procType: '设计',
      data: [{
        procId: 2,
        planName: '计划2',
        status: '已完成',
        workDay: 30,
        procType: '设计',
        weight: '30%',
        pDuty: 'wangsds',
        createTime: '2017-04-02'
      },
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
    },
  },
  // !!!: Modal订阅
  subscriptions: {
  },
  // !!!: Modal有哪些行为（effects理解为行为或者影响）
  effects: {
    // 异步请求行为 搜索获取taskList
    *getTasks ({ payload }, { call, put }) {
      put({ type: 'getTasksLoading' });
      const requestResult = call(getTasksRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'getTasksByIdSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'getTasksByIdFailure'});
      }
    },
    // 异步请求行为 获取taskMenu
    *getTasksMenu ({ payload }, { call, put }) {
      put({ type: 'getTasksMenuLoading' })
      const requestResult = call(getTasksMenuRequest());
      // 根据requestResult结果判断
      if (requestResult.successful === 'true') {
        put({
          type: 'getTasksMenuSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'getTasksMenuFailure'});
      }
    },
    // 创建子计划
    *CreateChildPlan({ payload }, { call, put }) {
      put({ type: 'createChildPlanLoading' })
      const requestResult = call(createChildPlanRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'createChildPlanSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'createChildPlanFailure'});
      }
    },
    // 创建子任务
    *createTask({ payload }, { call, put }) {
      put({ type: 'createPlanLoading' })
      const requestResult = call(createPlanRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'createChildPlanSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'createChildPlanFailure'});
      }
    },
    // 删除计划
    *DeletePlan({ payload }, { call, put }) {
      put({ type: 'deletePlanLoading' })
      const requestResult = call(deletePlanRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'deletePlanSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'deletePlanFailure'});
      }
    },
    // 归档计划
    *filePlan({ payload }, { call, put }) {
      put({ type: 'filePlanLoading' })
      const requestResult = call(filePlanRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'filePlanSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'filePlanFailure'});
      }
    },
    // 收藏计划
    *collectPlan({ payload }, { call, put }) {
      put({ type: 'collectPlanLoading' })
      const requestResult = call(collectPlanRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'collectPlanSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'collectPlanFailure'});
      }
    },
    // 根据任务ID获取列表
    *getTasksById({ payload }, { call, put }) {
      console.log(payload);
      put({ type: 'getTasksByIdLoading' })
      const requestResult = call(getTasksByIdRequest());
      // 根据requestResult结果判断
      if (requestResult.successful === 'true') {
        put({
          type: 'getTasksByIdSuccess',
          payload: requestResult.resultValue,
        });
      } else {
        put({ type: 'getTasksByIdFailure'});
      }
    },
    // 编辑计划
    *editPlan({ payload }, { call, put }) {
      put({ type: 'editPlanLoading' })
      const requestResult = call(editPlanRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'editPlanSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'editPlanFailure'});
      }
    },
    *changePlan({ payload }, { call, put }) {
      put({ type: 'changePlanLoading' })
      const requestResult = call(changePlanPlanRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'changePlanSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'changePlanFailure'});
      }
    },
    // 获取关联任务列表
    *getRelationPlanList({ payload }, { call, put }) {
      put({ type: 'getRelationPlanListLoading' })
      const requestResult = call(getRelationPlanListRequest());
      // 根据requestResult结果判断
      if (1) {
        put({
          type: 'getRelationPlanListSuccess',
          payload: requestResult.data,
        });
      } else {
        put({ type: 'getRelationPlanListFailure'});
      }
    },
  },
  // !!!: 行为产生的对state的数据加工，函数名跟effect中的type匹配
  reducers: {
    getTasksByIdLoading(state, action) {
      // 修改状态的loading标志
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getTasksByIdSuccess(state, action) {
      // 修改状态的tasks状态
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        taskList: action.resultValue,
      }
    },
    getTasksByIdFailure(state, action) {
      // 修改状态的error标志
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getTasksMenuLoading(state, action) {
      // 修改状态的loading标志
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getTasksMenuSuccess(state, action) {
      // 修改状态的tasks状态
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        planItems: action.resultValue,
      }
    },
    getTasksMenuFailure(state, action) {
      // 修改状态的error标志
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    selectPlanId(state, action) {
      return {
        ...state,
        selectPlanId: action.payload.planId,
      }
    }
  },
}
