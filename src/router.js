import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     console.log(1,window.location);
     if(r!=null)return  unescape(r[2]); return "";
}

function getCookie(name)
{
  var strCookie=document.cookie;
  var arrCookie=strCookie.split("; ");
  for(var i=0;i<arrCookie.length;i++)
  {
    var arr=arrCookie[i].split("=");
    if(arr[0]==name)
      return arr[1];
  }
  return "";
}


const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },
        /*
         * 系统主页
         * add by 孙宝然 2017-04-27
         */
         {
           path: 'homepage',
           name: 'homepage',
           getComponent (nextState, cb) {
             require.ensure([], require => {
               registerModel(app, require('./models/pubhomepage'))//绑定models
               cb(null, require('./routes/pub/homePage/'))
             }, 'pub-homePage')//routes下的文件夹中的index.js文件
           },
         },
        //添加 url 请求路径
        {
          path: 'probs',
          name: 'probs',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/probs'))
              cb(null, require('./routes/probs/'))//routes下的文件夹prob
            }, 'probs')//routes下的文件夹prob中的index.js文件
          },
        },
         {
          path: 'probs/communicate',
          name: 'probs/communicate',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/communicate'))
              cb(null, require('./routes/probs/communicate/'))//routes下的文件夹prob
            }, 'probs-communicate')//routes下的文件夹prob中的index.js文件
          },
        },
         {
          path: '/probs/pond',
          name: '/probs/pond',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/pond'))
              cb(null, require('./routes/probs/pond/'))//routes下的文件夹prob
            }, 'probs-pond')//routes下的文件夹prob中的index.js文件
          },
        },
         /**
         * 我负责的url路径
         * sp 2017.4.27
         * 问题管理
         */
        {
          path: 'probs/responsible',
          name: 'probs/responsible',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/responsible'))
              cb(null, require('./routes/probs/responsible/'))//routes下的文件夹prob
            }, 'probs-responsible')//routes下的文件夹prob中的index.js文件
          },
        },
        /**
         * 添加 url 请求路径
         * hwy 2017.5.2
         * 问题管理-显示评论首页
         */
        {
          path: 'probmgr',
          name: 'probmgr',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/probmgr'))
              cb(null, require('./routes/probs/probmgr/'))//routes下的文件夹probs
            }, 'probmgr')//routes下的文件夹/probs/中的index.js文件
          },
        },
        {
          path: '/prob_detail',
          name: '/prob_detail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/probDetail'))
              cb(null, require('./routes/probs/prob_detail/'))//routes下的文件夹prob
            }, 'probs_detail')//routes下的文件夹prob中的index.js文件
          },
        },
        {
          path: '/resprob_detail',
          name: '/resprob_detail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/resprobdetail'))
              cb(null, require('./routes/probs/responsible/prob_detail/'))//routes下的文件夹prob
            }, 'resprob_detail')//routes下的文件夹prob中的index.js文件
          },
        },
        /**
         * 添加 url 请求路径
         * hwy 2017.4.27
         * 问题管理-问题详情-处理中问题页面
         */
        {
          path: '/prob_detail/in_process',
          name: '/prob_detail/in_process',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/detail'))
              cb(null, require('./routes/probs/prob_detail/in_process/'))//routes下的文件夹probs/prob_detail
            }, 'in_process')//routes下的文件夹/probs/prob_detail/in_process中的index.js文件
          },
        },
        /**
         * 添加 url 请求路径
         * hwy 2017.4.28
         * 问题管理-问题详情-待关闭问题页面
         */
        {
          path: '/prob_detail/to_close',
          name: '/prob_detail/to_close',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/detailClose'))
              cb(null, require('./routes/probs/prob_detail/to_close/'))//routes下的文件夹probs/prob_detail
            }, 'to_close')//routes下的文件夹/probs/prob_detail/to_close中的index.js文件
          },
        },

        /**
         * 添加 url 请求路径
         * hwy 2017.4.28
         * 问题管理-问题详情-待提交问题页面
         */
        {
          path: 'prob_detail/to_commit',
          name: 'prob_detail/to_commit',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              //registerModel(app, require('./models/pond'))
              cb(null, require('./routes/probs/prob_detail/to_commit/'))//routes下的文件夹probs/prob_detail
            }, 'to_commit')//routes下的文件夹/probs/prob_detail/to_commit中的index.js文件
          },
        },

        /**
         * 维护 url 请求路径
         * hwy 2017.4.28
         * 工作台-工作维护
         */
        {
          path: 'dashboard/maintain',
          name: 'dashboard/maintain',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/maintain'))
              cb(null, require('./routes/pub/workplace/maintain/'))//routes下的文件夹pub/workplace
            }, 'maintain')//routes下的文件夹/pub/workplace/maintain中的index.js文件
          },
        },
        /**
         * 添加 url 请求路径
         * hwy 2017.4.28
         * 问题管理-问题详情-待处理问题页面
         */
        {
          path: 'prob_detail/to_process',
          name: 'prob_detail/to_process',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              //registerModel(app, require('./models/pond'))
              cb(null, require('./routes/probs/prob_detail/to_process/'))//routes下的文件夹probs/prob_detail
            }, 'to_process')//routes下的文件夹/probs/prob_detail/to_process中的index.js文件
          },
        },
        /**
         * 添加 url 请求路径
         * hwy 2017.4.28
         * 问题管理-问题详情-已编制问题页面
         */
        {
          path: 'prob_detail/already',
          name: 'prob_detail/already',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              //registerModel(app, require('./models/pond'))
              cb(null, require('./routes/probs/prob_detail/already/'))//routes下的文件夹probs/prob_detail
            }, 'already')//routes下的文件夹/probs/prob_detail/already中的index.js文件
          },
        },

        /**
         * 维护 url 请求路径
         * hwy 2017.4.28
         * 工作台-工作维护
         */
        {
          path: 'dashboard/maintain',
          name: 'dashboard/maintain',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/maintain'))
              cb(null, require('./routes/pub/workplace/maintain/'))//routes下的文件夹pub/workplace
            }, 'maintain')//routes下的文件夹/pub/workplace/maintain中的index.js文件
          },
        },

        /**
         * 添加 url 请求路径
         * liuym
         * 维护计划
         */
        {
            path: 'proc/planDetail',
            name: 'proc/planDetail',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                //registerModel(app, require('./models/proc'))
                cb(null, require('./routes/proc/planDetail'))//routes下的文件夹prob
              }, 'planDetail')//routes下的文件夹prob中的index.js文件
            },
          },

        {
            path: 'proc/UserModal',
            name: 'proc/UserModal',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                //registerModel(app, require('./models/proc'))
                cb(null, require('./routes/proc/UserModal'))//routes下的文件夹prob
              }, 'taskDetail')//routes下的文件夹prob中的index.js文件
            },
          },

          /**
           * 添加 url 请求路径
           * wxj
           * 任务计划管理
           */
          {
            path: 'procs/task-manager',
            name: 'TaskManager',
            getComponent (nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/TaskManagerModal'))
                cb(null, require('./components/TaskManager'))//routes下的文件夹prob
              }, 'proc')//routes下的文件夹prob中的index.js文件
            },
          },

        /**
         * 添加 url 请求路径
         * wxj
         * 任务计划
         */
        {
          path: 'procs/proc',
          name: 'procs/proc',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/proc'))
              cb(null, require('./routes/proc/'))//routes下的文件夹prob
            }, 'proc')//routes下的文件夹prob中的index.js文件
          },
        },

        /**
         * 添加 url 请求路径
         * zyc
         * 计划模板
         */
        {
          path: 'systemconf/templetconf',
          name: 'systemconf/templetconf',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/pub/proc/templetplan'))
              cb(null, require('./routes/pub/templetplan/'))//routes/pub/templetplan下的文件夹templetplan,默认首先读取index.js
            }, 'templetplan')//routes/pub下的文件夹templetplan中的index.js文件
          },
        },

        /**
         * 添加 url 请求路径
         * zyc
         * 问题分类配置
         */
        {
          path: 'systemconf/problemtype',
          name: 'systemconf/problemtype',
          getComponent (nextState, cb) {
            require.ensure([], require => {
//              registerModel(app, require('./models/pub/proc/templetplan'))
              cb(null, require('./routes/pub/problemtype/'))//routes/pub/problemsort下的文件夹problemsort,默认首先读取index.js
            }, 'problemtype')//routes/pub下的文件夹problemsort中的index.js文件
          },
        },

      ],
    },
  ]

  //var ticket = GetQueryString("ticket");
//  var ticket = 'ticket';
//  if(ticket!="")
//  {
//    document.cookie = "ticket="+ticket;
//    return <Router history={history} routes={routes} />
//  }
//  else
//  {
//    ticket = getCookie("ticket");
//    if(ticket=="")
//    {
//      window.location = "http://192.168.65.159:7101/isc_sso/login?service=http%3A%2F%2Flocalhost%3A8989";
//    }
//    else
//    {
      return <Router history={history} routes={routes} />
//    }
//    }
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
