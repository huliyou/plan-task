import { create, remove, update, query,findByProb } from '../services/communicate'
import {findProjectPerson} from '../services/pond'
import { parse } from 'qs'
import { message } from 'antd'; 

export default {

  namespace: 'communicate',
  
  state: {
    list: [],
    currentItem: {},
    dictItems:[],
    solveUser:[],
    modalVisible: false, 
    modalType: 'create',
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
        if (location.pathname === '/probs/communicate') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination:{ 
              total: data.total,
              current: data.current
            },
          },
        })
      }
    },

    //新建问题 编辑问题请求后台 获取数据字典
    *findByProb ({ payload }, { call, put }) {
      const tempModalType  = payload.modalType;
      const data = yield call(findByProb, parse(payload))
      const findProjectPersons = yield call(findProjectPerson, parse(payload))
      if (data) {
        console.log("data.items.length",data.items.length)
        if(data.items.length==0){
          yield put({
            type: 'showModal',
            payload: {
              modalType: tempModalType,
              currentItem: {},
              dictItems: data.dicItems,
              solveUser: findProjectPersons.data
            },
          })
        }else{
          let tempItem ={}
          data.items.map((item,index)=>{
            tempItem = item
          })
          yield put({
            type: 'showModal',
            payload: {
              modalType: tempModalType,
              currentItem: tempItem,
              dictItems: data.dicItems,
              solveUser: findProjectPersons.data
            },
          })
        }
      }
    },
    *'delete' ({ payload }, { call, put }) {
       message.config({
         top: 200,
         duration: 3,
        });
       yield put({ type: 'hideModal' })
      const data1 = yield call(remove, { probId: payload })
      const data = yield call(query)
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.total,
              current: data.current,
            },
          },
        })
        message.success('删除成功！');
       }
      }
    },
    *create ({ payload }, { call, put }) {
       message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
       const data1 = yield call(create, payload)
       const data = yield call(query)
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else  {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.total,
              current: data.current,
            },
          },
        })
        message.success('添加成功！');
       }
      }
    },
    *update ({ payload }, { select, call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ type: 'hideModal' })
      const id = yield select(({ communicate }) => communicate.currentItem.id)
      const newUser = { ...payload, id }
      const data1 = yield call(update, newUser)
      const data = yield call(query)
      if (data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else{
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.total,
              current: data.current,
            },
          },
        })
        message.success('修改成功！');
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
      const { list, pagination } = action.payload
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    showModal (state, action) {   
      const { currentItem, dictItems,solveUser,modalType } = action.payload
      console.log('tempItem',currentItem)
      return {...state,...action.payload, currentItem,solveUser,dictItems,modalType, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
