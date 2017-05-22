import { create, remove, update, query, outpool ,findProjectPerson} from '../services/pond'
import { findByProb } from '../services/communicate';
import { parse } from 'qs';
import { message } from 'antd';
import { getTasksRequest, getTasksMenuRequest, createChildPlanRequest,
  createPlanRequest, deletePlanRequest, filePlanRequest, collectPlanRequest,
  getTasksByIdRequest, editPlanRequest, changePlanPlanRequest, getRelationPlanListRequest,
  getPlanInfoRequest, remindersTaskRequest, followTaskRequest, deleteTaskRequest, relationTaskRequest, getTaskInfoRequest,
  getRelationTaskListRequest, getFilesListRequest, getParentTaskListRequest, getCommentListRequest, getLogListRequest, addCommentRequest
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
    selectProcId: null,
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
    // 任务详情
    getTaskInfo: {
      procId: 6,
      phase: '已完成',
      procType: '',
      themeCode: '',
      themeName: '计划2',
      themeDesc: 'erwrwrwer',
      planId: '',
      prjId: '',
      priority: '',
      pDuty: 'wangsds',
      workDay: '',
      dateTo: '',
      rPocId: '',
      weight: '',
      createTime: '2017-04-02',
      createName: 'fdsfs',
    },
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
    // 计划详情
    planInfo: {
      planId: 1,
      phase: '完成',
      planCode: 'wqrqrerwr',
      parentPlanCode: 'wqrqrerwr',
      planDesc: 'wqrqrerwr',
      planBeginDate: '2017-03-10',
      planEndDate: '2017-03-10',
      planStatus: '完成',
      planRealBeginDate: '017-03-10',
      planRealEndDate: '017-03-10',
      isUse: true,
      prjId: 12,
      currentVersion: '',
      planTitle: '',
      planWorkload: '',
    },

    // 关联任务列表
    relationTaskList: [{
      procId: 1,
      themeName: 'eweqwe',
      themeCode: 'eweqwe',
      pDuty: 'fwerwr',
      priority: 'erwerw',
      rPocId: 'ewrwe',
    }, {
      procId: 2,
      themeName: 'eweqwe',
      themeCode: 'eweqwe',
      pDuty: 'fwerwr',
      priority: 'erwerw',
      rPocId: 'ewrwe',
    }, {
      procId: 3,
      themeName: 'eweqwe',
      themeCode: 'eweqwe',
      pDuty: 'fwerwr',
      priority: 'erwerw',
      rPocId: 'ewrwe',
    }],
    // 附件列表
    filesList: [{
      fileId: 1,
      prjId: 'eweq',
      procId: 'eweq',
      fileTypeId: 'eweq',
      fileName: 'eweq',
      fileSize: 'eweq',
      fileExtention: 'eweq',
      fileUrl: 'eweq',
      uploadName: 'eweq',
      uploadDate: 'eweq',
      deliverableId: 'eweq',
      isDeliverable: 'eweq',
    },{
      fileId: 2,
      prjId: 'eweq',
      procId: 'eweq',
      fileTypeId: 'eweq',
      fileName: 'eweq',
      fileSize: 'eweq',
      fileExtention: 'eweq',
      fileUrl: 'eweq',
      uploadName: 'eweq',
      uploadDate: 'eweq',
      deliverableId: 'eweq',
      isDeliverable: 'eweq',
    }],
    // 获取上级关联列表
    parentTaskList: [{
      procId: 1,
      themeName: 'ewe',
      themeCode: 'ewe',
      pDuty: 'ewe',
      priority: 'ewe',
      rPocId: 'ewe',
      status: 'ewe',
    }, {
      procId: 2,
      themeName: 'ewe',
      themeCode: 'ewe',
      pDuty: 'ewe',
      priority: 'ewe',
      rPocId: 'ewe',
      status: 'ewe',
    }],
    // 获取评论列表
    commentList: [{
      commentId: 1,
      prjId: '123',
      procId: '123',
      commentName: '123',
      commentDate: '123',
      commentDesc: '123',
      rCommentId: '123',
    }, {
      commentId: 2,
      prjId: '123',
      procId: '123',
      commentName: '123',
      commentDate: '123',
      commentDesc: '123',
      rCommentId: '123',
    }],
    // 操作记录
    logList: [{
      logId: 1, // 日志序号
      prjId: '3123', // 项目序号
      procId: '3123', // 任务序号
      operationName: '3123', // 操作人
      operationDesc: '3123', // 操作内容
      operationDate: '3123', // 操作时间
    }, {
      logId: 2, // 日志序号
      prjId: '3123', // 项目序号
      procId: '3123', // 任务序号
      operationName: '3123', // 操作人
      operationDesc: '3123', // 操作内容
      operationDate: '3123', // 操作时间
    }],
    // 搜索参数
    selectParams: {
      procId: '',
      themeName: '',
      themeCode: '',
      pDuty: '',
      priority: '',
      planId: '',
    }
  },
  // !!!: Modal订阅
  subscriptions: {
  },
  // !!!: Modal有哪些行为（effects理解为行为或者影响）
  effects: {
    // 异步请求行为 搜索获取taskList
    *getTasks ({ payload }, { call, put }) {
      yield put({ type: 'getTasksLoading' });
      const requestResult = yield call(getTasksRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'getTasksByIdSuccess',
          payload: requestResult.resultValue,
        });
      } else {
        yield put({ type: 'getTasksByIdFailure'});
      }
    },
    // 异步请求行为 获取taskMenu
    *getTasksMenu ({ payload }, { call, put }) {
      yield put({ type: 'getTasksMenuLoading' })
      const requestResult = yield call(getTasksMenuRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'getTasksMenuSuccess',
          payload: requestResult.resultValue,
        });
      } else {
        yield put({ type: 'getTasksMenuFailure'});
      }
    },
    // 创建子计划
    *CreateChildPlan({ payload }, { call, put }) {
      yield put({ type: 'createChildPlanLoading' })
      const requestResult = yield call(createChildPlanRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'createChildPlanSuccess',
          payload,
        });
        message.success('创建成功');
      } else {
        yield put({ type: 'createChildPlanFailure'});
      }
    },
    // 保存任务
    *createTask({ payload }, { call, put }) {
      yield put({ type: 'createPlanLoading' })
      const requestResult = yield call(createPlanRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'createChildPlanSuccess',
          payload: requestResult.resultValue,
        });
        message.success('创建成功');
      } else {
        yield put({ type: 'createChildPlanFailure'});
          message.success('创建失败');
      }
    },
    // 删除计划
    *DeletePlan({ payload }, { call, put }) {
      yield put({ type: 'deletePlanLoading' })
      const requestResult = yield call(deletePlanRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'deletePlanSuccess',
          payload: requestResult.resultValue,
        });
        message.success('删除成功');
      } else {
        yield put({ type: 'deletePlanFailure'});
          message.success('删除失败');
      }
    },
    // 归档计划
    *filePlan({ payload }, { call, put }) {
      yield put({ type: 'filePlanLoading' })
      const requestResult = yield call(filePlanRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'filePlanSuccess',
          payload: requestResult.resultValue,
        });
        message.success('归档成功');
      } else {
        yield put({ type: 'filePlanFailure'});
          message.success('归档失败');
      }
    },
    // 收藏计划
    *collectPlan({ payload }, { call, put }) {
      yield put({ type: 'collectPlanLoading' })
      const requestResult = yield call(collectPlanRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'collectPlanSuccess',
          payload: requestResult.resultValue,
        });
          message.success('收藏成功');
      } else {
        yield put({ type: 'collectPlanFailure'});
          message.success('收藏失败');
      }
    },
    // 根据任务ID获取列表
    *getTasksById({ payload }, { call, put }) {
      yield put({ type: 'getTasksByIdLoading' })
      const requestResult = yield call(getTasksByIdRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'getTasksByIdSuccess',
          payload: requestResult.resultValue,
        });
      } else {
        yield put({ type: 'getTasksByIdFailure'});
      }
    },
    // 编辑计划
    *editPlan({ payload }, { call, put }) {
      yield put({ type: 'editPlanLoading' })
      const requestResult = yield call(editPlanRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'editPlanSuccess',
          payload: requestResult.resultValue,
        });
      } else {
        yield put({ type: 'editPlanFailure'});
      }
    },

    // 更改计划
    *changePlan({ payload }, { call, put }) {
      yield put({ type: 'changePlanLoading' })
      const requestResult = yield call(changePlanPlanRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'changePlanSuccess',
          payload: requestResult.resultValue,
        });
        message.success('更改成功');
      } else {
        yield put({ type: 'changePlanFailure'});
          message.success('更新失败');
      }
    },
    // 获取关联任务列表
    *getRelationTaskList({ payload }, { call, put }) {
      yield put({ type: 'getRelationTaskListLoading' })
      const requestResult = yield call(getRelationTaskListRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'getRelationTaskListSuccess',
          payload: requestResult.resultValue,
        });
      } else {
        yield put({ type: 'getRelationTaskListFailure'});
      }
    },
    // 关联任务
    *relationTask({ payload }, { call, put }) {
          yield put({ type: 'relationTaskLoading' })
          const requestResult = yield call(relationTaskRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'relationTaskSuccess',
              payload: requestResult.resultValue,
            });
            message.success('关联成功');
          } else {
            yield put({ type: 'relationTaskFailure'});
              message.success('关联失败');
          }
        },
    // 获取计划详情
    *getPlanInfo({ payload }, { call, put }) {
      yield put({ type: 'getPlanInfoLoading' })
      const requestResult = yield call(getPlanInfoRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'getPlanInfoSuccess',
          payload: requestResult.resultValue,
        });
      } else {
        yield put({ type: 'getPlanInfoFailure'});
      }
    },
    // 催办任务
    *remindersTask({ payload }, { call, put }) {
      yield put({ type: 'remindersTaskLoading' })
      const requestResult = yield call(remindersTaskRequest());
      // 根据requestResult结果判断
      if (requestResult.successful) {
        yield put({
          type: 'remindersTaskSuccess',
          payload: requestResult.resultValue,
        });
        message.success('操作成功');
      } else {
        yield put({ type: 'remindersTaskFailure'});
          message.success('操作失败');
      }
    },
      // 关注任务
    *followTask({ payload }, { call, put }) {
        yield put({ type: 'followTaskLoading' })
        const requestResult = yield call(followTaskRequest());
        // 根据requestResult结果判断
        if (requestResult.successful) {
          yield put({
            type: 'followTaskSuccess',
            payload: requestResult.resultValue,
          });
          message.success('关注成功');
        } else {
          yield put({ type: 'followTaskFailure'});
            message.success('关注失败');
        }
      },
        // 删除任务
    *deleteTask({ payload }, { call, put }) {
          yield put({ type: 'deleteTaskLoading' })
          const requestResult = yield call(deleteTaskRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'deleteTaskSuccess',
              payload: requestResult.resultValue,
            });
            message.success('删除成功');
          } else {
            yield put({ type: 'deleteTaskFailure'});
            message.success('删除失败');
          }
    },
    // 获取任务详情
    *getTaskInfo({ payload }, { call, put }) {
          yield put({ type: 'getTaskInfoLoading' })
          const requestResult = yield call(getTaskInfoRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'getTaskInfoSuccess',
              payload: requestResult.resultValue,
            });
          } else {
            yield put({ type: 'getTaskInfoFailure'});
          }
    },
    // 获取附件列表
    *getFilesList({ payload }, { call, put }) {
          yield put({ type: 'getQueryListLoading' })
          const requestResult = yield call(getFilesListRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'getQueryListSuccess',
              payload: requestResult.resultValue,
            });
          } else {
            yield put({ type: 'getQueryListFailure'});
          }
    },
    // 获取上级任务列表
    *getParentTaskList({ payload }, { call, put }) {
          yield put({ type: 'getParentTaskListLoading' })
          const requestResult = yield call(getParentTaskListRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'getParentTaskListSuccess',
              payload: requestResult.resultValue,
            });
          } else {
            yield put({ type: 'getParentTaskListFailure'});
          }
    },
    // 获取评论列表
    *getCommentList({ payload }, { call, put }) {
          yield put({ type: 'getCommentListLoading' })
          const requestResult = yield call(getCommentListRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'getCommentListSuccess',
              payload: requestResult.resultValue,
            });
          } else {
            yield put({ type: 'getCommentListFailure'});
          }
    },
    // 获取操作记录列表
    *getLogList({ payload }, { call, put }) {
          yield put({ type: 'getLogListLoading' })
          const requestResult = yield call(getLogListRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'getLogListSuccess',
              payload: requestResult.resultValue,
            });
          } else {
            yield put({ type: 'getLogListFailure'});
          }
    },
    // 添加评论
    *addComment({ payload }, { call, put }) {
          yield put({ type: 'addCommentLoading' })
          const requestResult = yield call(gaddCommentRequest());
          // 根据requestResult结果判断
          if (requestResult.successful) {
            yield put({
              type: 'addCommentSuccess',
              payload: requestResult.resultValue,
            });
            message.success('添加成功');
            // dispatch({
            //   type: 'TaskManager/getCommentList',
            //   payload,
            // })
          } else {
            yield put({ type: 'addCommentFailure'});
            message.success('添加成功');
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
        taskListCard: action.payload,
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
        planItems: action.payload,
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

    getPlanInfoLoading(state, action) {
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getPlanInfoSuccess(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        planInfo: action.payload,
      }
    },
    getPlanInfoFailure(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getTasksLoading(state, action) {
      // 修改状态的loading标志
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getTasksSuccess(state, action) {
      // 修改状态的tasks状态
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        taskList: action.payload,
      }
    },
    getTasksFailure(state, action) {
      // 修改状态的error标志
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getRelationTaskListLoading(state, action) {
      // 修改状态的loading标志
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getRelationTaskListSuccess(state, action) {
      // 修改状态的tasks状态
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        relationTaskList: action.payload,
      }
    },
    getRelationTaskListFailure(state, action) {
      // 修改状态的error标志
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getTaskInfoLoading(state, action) {
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getTaskInfoSuccess(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        taskInfo: action.payload,
      }
    },
    getTaskInfoFailure(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getFilesListLoading(state, action) {
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getFilesListSuccess(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        filesList: action.payload,
      }
    },
    getFilesListFailure(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getParentTaskListLoading(state, action) {
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getParentTaskListSuccess(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        parentTaskList: action.payload,
      }
    },
    getParentTaskListFailure(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getCommentListLoading(state, action) {
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getCommentListSuccess(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        commentList: action.payload,
      }
    },
    getCommentListFailure(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    CreateChildLoading(state, action) {
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    CreateChildListSuccess(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        planItems: state.planItems.push(action.payload),
      }
    },
    CreateChildListFailure(state, action) {
      // 修改状态的error标志
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },

    getLogListLoading(state, action) {
      return {
        ...state,
        isFetching: true,
        errMsg: '',
      }
    },
    getLogListSuccess(state, action) {
      return {
        ...state,
        isFetching: false,
        errMsg: '',
        logList: action.payload,
      }
    },
    getLogListFailure(state, action) {
      // 修改状态的error标志
      return {
        ...state,
        isFetching: false,
        errMsg: action.errMsg,
      }
    },



    // 选中的计划Id
    selectPlanId(state, action) {
      return {
        ...state,
        selectPlanId: action.payload.planId,
      }
    },
    // 选中的任务Id
    selectProcId(state, action) {
      console.log('1:' , action.payload.procId);
      return {
        ...state,
        selectProcId: action.payload.procId,
      }
    },
    selectParams(state, action) {
      return {
        ...state,
        selectParams: action.payload,
      }
    }
  },
}
