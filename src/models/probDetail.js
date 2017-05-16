import { create, remove, submit,record,findEvaluateById,supplement,queryDetail,findByProbId, queryDiscuss, transfer, unresolved,enterMarket,outEvaluate } from '../services/probs' 
import { parse } from 'qs'
import { outpool } from '../services/pond'
import { message } from 'antd'


export default {

  namespace: 'prob_Detail',
 
  state: { 
    probItem:{},
    commentlist:[],
    postsList:{},
    modalVisible:false,
    transferVisble:false,
    unresolved:false,
    outpoolVisble:false,
    marketVisble:false,
    evaluateVisble:false,
    supplementVisble:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/prob_detail') {
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
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
          },
        })
      }
    },
    *queryCommentList ({ payload }, { call, put }){
        const data = yield call(queryDiscuss, parse(payload))
        if (data) {
          yield put({
            type: 'commentList',
            payload: {
              commentlist:data.data,
            },
          })
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
       if (data1) {
        if(data1.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
          },
        })
        message.success('提交成功！');
       }
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
          message.success('删除成功！');
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
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('评价成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
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
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('入集市成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
           },
        })
       }
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
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {  
        message.success('提交成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
           },
        })
       }
      }
    },

    /*
    * 问题补充
     */
    *supplement ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const putData = {
        probId:payload.probId,
        probDescribe:payload.probDescribe,
      }
      const data1 = yield call(supplement, putData)
      const data = yield call(findByProbId,parse(payload))
      if (data1) {
        if(data1.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        message.success('问题补充成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
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
      if (data1) {
        if(data1.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        message.success('入池成功！');
        yield put({
          type: 'querySuccess',
          payload: {
            probItem:data,
           },
        })
       }
      }
    },   
    
  },

  reducers: {
    querySuccess (state, action) {
      const { probItem } = action.payload
      console.log(probItem)
      return {  ...state,
        probItem,
         }
    },
    commentList (state, action){
      const { commentlist } = action.payload
      console.log(commentlist)
      return {  
        ...state,
        commentlist,
      }
    },
    showModal (state, action) {
      const { str } = action.payload
      if(str == '1'){
        //处理问题页面
        return { ...state, modalVisible: true}  
       }else if(str == '2'){
        //转交
        return { ...state, transferVisble: true}  
     }else if (str == '3'){
      //问题未解决 
      return { ...state,  unresolved: true}   
     }else if (str == '4'){
      //  出池
      return { ...state,  outpoolVisble: true}   
     }
    },
    showModal2 (state, action) {
      const { str } = action.payload
      if(str == '3'){
        //问题未解决 
        return { ...state, unresolved: true}  
       }else if (str == '4'){
      //  出池
      return { ...state,  outpoolVisble: true}   
     }else if (str == '5'){
      //  入集市
      return { ...state,  marketVisble: true}   
     }else if (str == '6'){
      //  已解决
      return { ...state,  evaluateVisble: true}   
     }else if (str == '7') {
      //问题补充
      return { ...state,  supplementVisble: true}   
     }
    },
    hideModal (state) {
      return { ...state, 
        modalVisible: false,
        transferVisble: false,
        unresolved: false,
        outpoolVisble: false,
        marketVisble: false,
        evaluateVisble: false,
        supplementVisble:false,
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
