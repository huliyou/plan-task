import { 
  create, remove,findEvaluateById,enterMarket,submit,
  record,unresolved,updateHandle,Insertdisscuss, 
  findByProbId,queryDiscuss, transfer,pleaseAssist,
  outEvaluate 
} from '../services/probs'
import { parse } from 'qs'
import { outpool,enterpool } from '../services/pond'
import { message } from 'antd'

export default { 

  namespace: 'resprob_detail',


  state: {
    probItem:{},
    postsList:{},
    commentlist:[],
    modalVisible:false,
    handleModalVisible:false,
    transferVisble:false,
    evaluateVisble:false,
    marketVisble:false,
    unresolved:false,
    outpoolVisble:false,
    assisVisble:false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/resprob_detail') {
         dispatch({
            type: 'queryDetail',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *queryDetail ({ payload }, { call, put }) {
      const data = yield call(findByProbId, parse(payload))
      const commentslist = yield call(queryDiscuss, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentlist:commentslist.data,
            pagination: {
              total: commentslist.total,
              current: commentslist.current,
            },
          },
        })
      }
    },
    //提交评论
    *commentSumbit ({ payload }, { call, put }){
      yield call(Insertdisscuss, parse(payload))
      const commentslist = yield call(queryDiscuss, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data.result,
            commentlist:commentslist.data,
            pagination: {
              total: commentslist.total,
              current: commentslist.current,
            },
          },
        })
        message.success('评论成功！');
      }
    },


     /*
       * 未解决问题
     */
    *unresolved ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const putData = {
        probId:payload.probId,
        probSolution:payload.probSolution,
      }
      const data1 = yield call(unresolved, putData)
      const data = yield call(findByProbId, parse(payload))
      const commentslist = yield call(queryDiscuss, parse(payload))
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('提交成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentlist:commentslist.data,
            pagination: {
              total: commentslist.total,
              current: commentslist.current,
            },
          },
        })
       }
      }
    },


/*
    * 入池 
     */
    *enterpool ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const putData = {
        probId:payload.probId,
        remark:payload.remark,
      }
      const data1 = yield call(enterpool, putData)
      const data = yield call(findByProbId,parse(payload))
      const commentslist = yield call(queryDiscuss, parse(payload))
      if (data1) {
        if(data1.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        message.success('入池成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentlist:commentslist.data,
            pagination: {
              total: commentslist.total,
              current: commentslist.current,
            },
          },
        })
       }
      }
    },  

      /*
       * 入集市
     */
    *enterMarket ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const putData = {
        probId:payload.probId,
        remark:payload.remark,
      }
      const data1 = yield call(enterMarket, putData)
      const data = yield call(findByProbId, parse(payload))
      const commentslist = yield call(queryDiscuss, parse(payload))
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('入集市成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentlist:commentslist.data,
            pagination: {
              total: commentslist.total,
              current: commentslist.current,
            },
          },
        })
       }
      }
    },

/*
    * 问题处理
    */
    *updateHandle ({ payload }, { select, call, put }) {
       message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
     const putData = {
        probId:payload.probId,
        probSolution:payload.probSolution,
        partakeUser:payload.partakeUser,
        relProbId:payload.relProbId,
      } 
      const data1 = yield call(updateHandle, putData)

      const data = yield call(findByProbId, parse(payload))
      const commentlist = yield call(queryDiscuss, parse(payload))

      if (data1) {
        if(data1.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('问题处理成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentslist:commentlist.data,
            pagination: {
              total: commentlist.total,
              current: commentlist.current,
            },
          },
        })
       }
      }
    },


 //查询操作记录
     *record ({ payload }, { call, put }) {
      const data = yield call(record, payload)
      if ( data) {
        let tempItem ={}
        data.data.map((item,index)=>{
          tempItem = item;
        })
        yield put({
          type: 'evaluate',
          payload: {
            postsList: tempItem,
          },
        })
      }
    },

     //查询问题评价信息
    *findEvaluateById ({ payload }, { call, put }) {
      const data = yield call(findEvaluateById, payload)
      if ( data) {
        let tempItem ={}
        data.data.map((item,index)=>{
          tempItem = item;
        })
        yield put({
          type: 'evaluate',
          payload: {
            postsList: tempItem,
          },
        })
      }
    },


     //删除问题
    *delete ({ payload }, { call, put }) { 
     message.config({
         top: 200,
         duration: 3,
        });     
      const data = yield call(remove, { probId: payload })
       if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        yield put({
          type: 'querySuccess',
          payload: {
            postsList: data.result,
          },
        })
        message.success('删除成功！');
       }
      }
    },

    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      const data = yield call(create, payload)
      if ( data) {
        yield put({
          type: 'querySuccess',
          payload: {
            postsList: data.data,
            pagination: {
              total: data.total,
              current: data.current,
            },
          },
        })
      }
    }, 
  
  	/*
     * 问题转交
     */
    *transfer ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const putData = {
        probId:payload.probId,
        remark:payload.remark,
        partakeUser:payload.partakeUser,
      }
      const data1 = yield call(transfer, putData)
      const data = yield call(findByProbId, parse(payload))
      const commentlist = yield call(queryDiscuss, parse(payload))
     if (data1) {
        if(data1.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('问题转交成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentslist:commentlist.data,
            pagination: {
              total: commentlist.total,
              current: commentlist.current,
            },
          },
        })
       }
      }
    },
  
   //提交问题
    *submit ({ payload }, { call, put }) { 
     message.config({
         top: 200,
         duration: 3,
        });     
      const data1 = yield call(submit, parse(payload))

      const data = yield call(findByProbId, parse(payload))
      const commentlist = yield call(queryDiscuss, parse(payload))

       if (data1) {
        if(data1.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentslist:commentlist.data,
            pagination: {
              total: commentlist.total,
              current: commentlist.current,
            },
          },
        })
        message.success('提交成功！');
       }
      }
    },

   /*
       * 评价
     */
    *outEvaluate ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const putData = {
        probId:payload.probId,
        satisfaction:payload.satisfaction,
        quality:payload.quality,
        timely:payload.timely,
      }
      const data1 = yield call(outEvaluate, putData)
      const data = yield call(findByProbId, parse(payload))
      const commentlist = yield call(queryDiscuss, parse(payload))
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('评价成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentslist:commentlist.data,
            pagination: {
              total: commentlist.total,
              current: commentlist.current,
            },
          },
        })
       }
      }
    },


  /*
     * 邀请协助
     */
    *pleaseAssist ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const putData = {
        probId:payload.probId,
        goalPartakeUser:payload.goalPartakeUser,
      }
      const data1 = yield call(pleaseAssist, putData)
      const data = yield call(findByProbId, parse(payload))
      const commentlist = yield call(queryDiscuss, parse(payload))
     if (data) { 
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('邀请协助成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
            commentslist:commentlist.data,
            pagination: {
              total: commentlist.total,
              current: commentlist.current,
            },
          },
        })
       }
      }
    },
    *switchIsMotion ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchIsMotion',
      })
    },
  },

  reducers: {
    querySuccess (state, action) {
      const { probItem,commentlist,pagination } = action.payload
      return {  
        ...state,
        probItem,
        commentlist,
        pagination
      }
    },
     showModal (state, action) {
      const { str } = action.payload
      if(str == '1'){
        //处理问题页面
        return { ...state, handleModalVisible: true}  
       }else if(str == '2'){
        //转交
        return { ...state, transferVisble: true}  
     }else if (str == '3'){
      //问题未解决 
      return { ...state,  unresolved: true}     
     }else if (str == '6'){
      //已解决 
      return { ...state,  evaluateVisble: true}     
     }else if (str == '4'){
      //入池
      return { ...state,  outpoolVisble: true}     
     }else if (str == '5'){
      //入集市
      return { ...state,  marketVisble: true}     
     }else if (str == '7'){
      //未解决
      return { ...state,  assisVisble: true}     
     }
    },
    hideModal (state) {
      return { 
        ...state,
       modalVisible: false,
       evaluateVisble:false ,
       assisVisble:false,
       transferVisble:false,
       unresolved :false, 
       marketVisble:false,
       handleModalVisible:false,
       outpoolVisble:false
     }
    },
    evaluate (state, action){
      return { ...state, ...action.payload}
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
