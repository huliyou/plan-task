import { create, remove, queryDetail,findByProbId, transfer, unresolved,enterMarket,outEvaluate } from '../services/probs' 
import { enterpool } from '../services/pond'
import { parse } from 'qs'
import { message } from 'antd'

export default {

  namespace: 'probDetailClose',


  state: {
    probItem:{},
    modalVisible:false,
    transferVisble:false,
    unresolved:false,
    outpoolVisble:false,
    marketVisble:false,
    evaluateVisble:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/prob_detail/to_close') {
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
            probItem: data,
          },
        })
      }
    },
  
    //   /*
    //    * 评价
    //  */
    // *outEvaluate ({ payload }, { select, call, put }) {
    //   message.config({
    //      top: 200,
    //      duration: 3,
    //     });
    //   yield put({ type: 'hideModal' })
    //   const putData = {
    //     probId:payload.probId,
    //     satisfaction:payload.satisfaction,
    //     quality:payload.quality,
    //     timely:payload.timely,
    //   }
    //   const data1 = yield call(outEvaluate, putData)
    //   const data = yield call(findByProbId, parse(payload))
    //   if (data) {
    //     if(data.successful == false){
    //       message.error('系统异常！请稍后再试！');  
    //     }else  {  
    //     message.success('评价成功！');
    //     yield put({
    //       type: 'querySuccess',
    //       payload: {
    //         probItem:data,
    //        },
    //     })
    //    }
    //   }
    // },

    //  /*
    //    * 入集市
    //  */
    // *enterMarket ({ payload }, { select, call, put }) {
    //   message.config({
    //      top: 200,
    //      duration: 3,
    //     });
    //   yield put({ type: 'hideModal' })
    //   const putData = {
    //     probId:payload.probId,
    //     remark:payload.remark,
    //   }
    //   const data1 = yield call(enterMarket, putData)
    //   const data = yield call(findByProbId, parse(payload))
    //   if (data) {
    //     if(data.successful == false){
    //       message.error('系统异常！请稍后再试！');  
    //     }else  {  
    //     message.success('入集市成功！');
    //     yield put({
    //       type: 'querySuccess',
    //       payload: {
    //         probItem:data,
    //        },
    //     })
    //    }
    //   }
    // },

     /*
       * 未解决问题
     */
    // *unresolved ({ payload }, { select, call, put }) {
    //   message.config({
    //      top: 200,
    //      duration: 3,
    //     });
    //   yield put({ type: 'hideModal' })
    //   const putData = {
    //     probId:payload.probId,
    //     probSolution:payload.probSolution,
    //   }
    //   const data1 = yield call(unresolved, putData)
    //   const data = yield call(findByProbId, parse(payload))
    //   if (data) {
    //     if(data.successful == false){
    //       message.error('系统异常！请稍后再试！');  
    //     }else  {  
    //     message.success('提交成功！');
    //     yield put({
    //       type: 'querySuccess',
    //       payload: {
    //         probItem:data,
    //        },
    //     })
    //    }
    //   }
    // },
    // /*
    // * 入池 
    //  */
    // *enterpool ({ payload }, { select, call, put }) {
    //   message.config({
    //      top: 200,
    //      duration: 3,
    //     });
    //   yield put({ type: 'hideModal' })
    //   const putData = {
    //     probId:payload.probId,
    //     remark:payload.remark,
    //   }
    //   const data1 = yield call(enterpool, putData)
    //   const data = yield call(findByProbId,parse(payload))
    //   if (data1) {
    //     if(data1.successful == false){
    //       message.error('系统异常！请稍后再试！');  
    //     }else  {
    //     message.success('入池成功！');
    //     yield put({
    //       type: 'querySuccess',
    //       payload: {
    //         probItem:data,
    //        },
    //     })
    //    }
    //   }
    // },   
  
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
      const { probItem } = action.payload
      return { ...state,
        probItem,
         }
    },
    showModal (state, action) {
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
      //  评价
      return { ...state,  evaluateVisble: true}   
     }
    },
    hideModal (state) {
      return { ...state, unresolved :false,marketVisble : false,evaluateVisble:false, outpoolVisble:false}
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
