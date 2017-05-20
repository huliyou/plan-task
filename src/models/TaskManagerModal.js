import { create, remove, update, query, outpool ,findProjectPerson} from '../services/pond'
import { findByProb } from '../services/communicate';
import { parse } from 'qs';
import { message } from 'antd';
import { getTasksRequest, getTasksMenuRequest, createChildPlanRequest } from '../services/planTaskService.js';
import Immutable from 'immutable';

const planItems = [
    {
        "planId": "04a20787359711e7bbc2005056a42951",
        "prjId": "4028b4b15aeee0d9015aef7abfe60003",
        "phase": null,
        "planCode": null,
        "parentPlanCode": "",
        "planDesc": null,
        "planBeginDate": "2017-03-15",
        "planEndDate": "2017-06-30",
        "planStatus": null,
        "planRealBeginDate": null,
        "planRealEndDate": null,
        "planTitle": "平台分项方案工作",
        "isUse": null,
        "planWorkload": null,
        "isLeaf": "false"
    },
    {
        "planId": "05e16527359711e7bbc2005056a42951",
        "prjId": "4028b4b15aeee0d9015aef7abfe60003",
        "phase": null,
        "planCode": null,
        "parentPlanCode": "03a9b24c359711e7bbc2005056a42951",
        "planDesc": null,
        "planBeginDate": "2017-03-16",
        "planEndDate": "2017-03-20",
        "planStatus": null,
        "planRealBeginDate": null,
        "planRealEndDate": null,
        "planTitle": "整体计划完善",
        "isUse": null,
        "planWorkload": null,
        "isLeaf": "true"
    },
    {
        "planId": "04a20ec8359711e7bbc2005056a42951",
        "prjId": "4028b4b15aeee0d9015aef7abfe60003",
        "phase": null,
        "planCode": null,
        "parentPlanCode": "",
        "planDesc": null,
        "planBeginDate": "2017-03-19",
        "planEndDate": "2017-09-30",
        "planStatus": null,
        "planRealBeginDate": null,
        "planRealEndDate": null,
        "planTitle": "需求获取与确认工作",
        "isUse": null,
        "planWorkload": null,
        "isLeaf": "false"
    },
    {
        "planId": "064ce491359711e7bbc2005056a42951",
        "prjId": "4028b4b15aeee0d9015aef7abfe60003",
        "phase": null,
        "planCode": null,
        "parentPlanCode": "04a20ec8359711e7bbc2005056a42951",
        "planDesc": null,
        "planBeginDate": "2017-03-19",
        "planEndDate": "2017-03-28",
        "planStatus": null,
        "planRealBeginDate": null,
        "planRealEndDate": null,
        "planTitle": "需求研讨分析",
        "isUse": null,
        "planWorkload": null,
        "isLeaf": "true"
    },
    {
        "planId": "05e165d7359711e7bbc2005056a42951",
        "prjId": "4028b4b15aeee0d9015aef7abfe60003",
        "phase": null,
        "planCode": null,
        "parentPlanCode": "03a9b24c359711e7bbc2005056a42951",
        "planDesc": null,
        "planBeginDate": "2017-03-20",
        "planEndDate": "2017-03-31",
        "planStatus": null,
        "planRealBeginDate": null,
        "planRealEndDate": null,
        "planTitle": "项目人员筹备工作",
        "isUse": null,
        "planWorkload": null,
        "isLeaf": "true"
    },
    {
        "planId": "05e1672e359711e7bbc2005056a42951",
        "prjId": "4028b4b15aeee0d9015aef7abfe60003",
        "phase": null,
        "planCode": null,
        "parentPlanCode": "03a9b24c359711e7bbc2005056a42951",
        "planDesc": null,
        "planBeginDate": "2017-03-20",
        "planEndDate": "2017-04-28",
        "planStatus": null,
        "planRealBeginDate": null,
        "planRealEndDate": null,
        "planTitle": "搭建测试环境",
        "isUse": null,
        "planWorkload": null,
        "isLeaf": "true"
    },
//     {
//         "planId": "064cddbe359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "04a20787359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-03-22",
//         "planEndDate": "2017-03-31",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "初稿阶段",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "05e16688359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "03a9b24c359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-03-27",
//         "planEndDate": "2017-03-31",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "项目人员入场审查",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "054a7cce359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-04-07",
//         "planEndDate": "2017-05-31",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "敏捷研发阶段(第一阶段)",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "064ce2d6359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "04a20787359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-04-13",
//         "planEndDate": "2017-04-27",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "内部完稿阶段",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "0682699f359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e16464359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-04-24",
//         "planEndDate": "2017-04-28",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "ISC",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce5de359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7cce359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-05-04",
//         "planEndDate": "2017-05-04",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "问题沟通管理",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "054a78aa359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-05-07",
//         "planEndDate": "2017-05-31",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "试点实施计划",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce4dc359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "04a20ec8359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-05-08",
//         "planEndDate": "2017-05-12",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "阶段确认需求",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "03a9b24c359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": "项目前期准备",
//         "planBeginDate": "2017-05-14",
//         "planEndDate": "2017-05-14",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "项目前期准备",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "064ce61e359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7cce359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-05-15",
//         "planEndDate": "2017-05-19",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "人员队伍管理",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce55e359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7cce359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-05-16",
//         "planEndDate": "2017-05-19",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "系统配置",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "2b947a785e5e434bb1f192508227bf74",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": "wxiBiaoti01",
//         "planBeginDate": "2017-05-16",
//         "planEndDate": "2017-05-17",
//         "planStatus": "",
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "wxiBiaoti01(xiugai)",
//         "isUse": "0",
//         "planWorkload": 0,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "377c1e70a09946f7a786479ccaba8b90",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": "wxiBiaoti01",
//         "planBeginDate": "2017-05-16",
//         "planEndDate": "2017-05-16",
//         "planStatus": "",
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "wxiBiaoti01",
//         "isUse": "0",
//         "planWorkload": 0,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce681359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7cce359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-05-17",
//         "planEndDate": "2017-05-22",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "知识共享管理",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce59b359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7cce359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-05-18",
//         "planEndDate": "2017-05-19",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "计划任务",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "054a7dd6359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-06-01",
//         "planEndDate": "2017-06-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "敏捷研发阶段(第二迭代)",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "05e16464359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-06-01",
//         "planEndDate": "2017-07-31",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "系统集成",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "064ce6c0359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7dd6359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-01",
//         "planEndDate": "2017-06-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "系统配置",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce6fe359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7dd6359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-01",
//         "planEndDate": "2017-06-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "问题管理",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce73b359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7dd6359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-01",
//         "planEndDate": "2017-06-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "任务计划",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce779359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7dd6359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-01",
//         "planEndDate": "2017-06-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "人员队伍",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce7b6359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-06-01",
//         "planEndDate": "2017-06-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "知识共享",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06826705359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e16464359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-05",
//         "planEndDate": "2017-06-20",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "IRS系统",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "068267b1359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e16464359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-08",
//         "planEndDate": "2017-06-27",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "测试云服务平台系统",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce51f359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-06-10",
//         "planEndDate": "2017-06-20",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "概设确认评审",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06826853359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e16464359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-12",
//         "planEndDate": "2017-06-23",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "I6000系统",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "068268f1359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e16464359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-06-14",
//         "planEndDate": "2017-06-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "企业知识管理系统",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "064ce44a359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-06-15",
//         "planEndDate": "2017-06-20",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "定稿阶段",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "054a7ea9359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2016-07-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "敏捷研发阶段(第三次迭代)",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "05e15e79359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2016-08-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "第三测试及安全测评",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "068256e5359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7ea9359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2017-07-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "系统配置",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "068259eb359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7ea9359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2017-07-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "问题管理",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825adb359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7ea9359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2017-07-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "任务计划",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825ba0359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "054a7ea9359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2017-07-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "人员队伍",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825c63359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2017-07-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "知识共享",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825d0e359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-01",
//         "planEndDate": "2017-07-10",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "第三方测试材料准备",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825fbf359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-10",
//         "planEndDate": "2017-07-20",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "安全测试材料准备",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825db8359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-11",
//         "planEndDate": "2017-07-15",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "材料审核修订",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825e61359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-16",
//         "planEndDate": "2017-07-20",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "测试问题缺陷修改",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06825f11359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-07-21",
//         "planEndDate": "2017-07-25",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "获取第三方测试报告",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "05e1629d359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-08-01",
//         "planEndDate": "2017-09-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "统一定版后迭代优化",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "05e163a3359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-08-01",
//         "planEndDate": "2017-08-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "系统上线阶段",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "false"
//     },
//     {
//         "planId": "06826065359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-08-01",
//         "planEndDate": "2017-08-15",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "测试及漏洞消缺",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "0682626b359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e1629d359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-08-01",
//         "planEndDate": "2017-08-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "第一次迭代",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "068263b6359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e163a3359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-08-01",
//         "planEndDate": "2017-08-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "上线材料准备",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "0682610a359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-08-16",
//         "planEndDate": "2017-08-20",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "获取安全测试报告",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "068261c0359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e15e79359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-08-21",
//         "planEndDate": "2017-08-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "软著移交",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "0682630f359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-09-01",
//         "planEndDate": "2017-09-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "第二次迭代",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06826466359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e163a3359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-09-01",
//         "planEndDate": "2017-09-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "上线材料审核修订",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06826507359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e163a3359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-09-01",
//         "planEndDate": "2017-09-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "系统资源申请",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "068265af359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "05e163a3359711e7bbc2005056a42951",
//         "planDesc": null,
//         "planBeginDate": "2017-09-01",
//         "planEndDate": "2017-09-30",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "上线申请",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     },
//     {
//         "planId": "06826655359711e7bbc2005056a42951",
//         "prjId": "4028b4b15aeee0d9015aef7abfe60003",
//         "phase": null,
//         "planCode": null,
//         "parentPlanCode": "",
//         "planDesc": null,
//         "planBeginDate": "2017-09-25",
//         "planEndDate": "2017-12-31",
//         "planStatus": null,
//         "planRealBeginDate": null,
//         "planRealEndDate": null,
//         "planTitle": "上线试运行",
//         "isUse": null,
//         "planWorkload": null,
//         "isLeaf": "true"
//     }
];
//
// // function convertItemsToForest(items) {
// //   const results = [];
// //   items.map((item, key) => {
// //     // 第一层, 没有父节点
// //     if (!item.parentPlanCode) {
// //       results.push(item);
// //       items.splice(key, 1);
// //     }
// //   });
// //   while(items.length) {
// //
// //   }
// // }
// // convertItemsToForest(planItems);


export default {
  namespace: 'TaskManager',
  // !!!: Modal的状态
  state: {
    planItems,
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
    taskInfo: {

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
    // 异步请求行为 获取taskMenu
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
      put({ type: 'getTasksByIdLoading' })
      const requestResult = call(getTasksByIdRequest());
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
    // 变更计划
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
