import { create, remove, update, query, queryHistory} from '../services/probs'
import { parse } from 'qs'
import { message } from 'antd'; 
export default {

  namespace: 'probs',
 
  state: {
    postsList: [],
    closedList:[],
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
        if (location.pathname === '/probs/') {
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
      if (data.data) {
        yield put({
          type: 'querySuccess',
          payload: {
            postsList: data.data,
            flag:1,
            pagination:{ 
              total: data.total,
              current: data.current
            },
          },
        })
      }
    },

    *queryHistory ({ payload }, { call, put }) {
      const data = yield call(queryHistory, parse(payload))
      if (data.data) {
        yield put({
          type: 'querySuccess',
          payload: {
            postsList: data.data,
            pagination:{ 
              total: data.total,
              current: data.current
            },
          },
        })
      }
    },
    
    *'logout' ({ payload }, { call, put }){
      console.log("chengg"+JSON.stringify(payload))
    },

    *'delete' ({ payload }, { call, put }) {      
      const saveData = yield call(remove, { probId: payload })
      if(saveData.result==true){
        message.success('删除成功！')
      }
      const data = yield call(query, parse(payload))
      if (data.data) {
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
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      const saveData = yield call(create, payload)
      if(saveData.result==true){
        message.success('保存成功！')
      }
      const data = yield call(query, parse(payload))
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
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      const id = yield select(({ probs }) => probs.currentItem.id)
      const newUser = { ...payload, id }
      const saveData = yield call(create, newUser)
      if(saveData.result==true){
        message.success('保存成功！')
      }
      const data = yield call(query, parse(payload))
      if (data) {
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
      const { postsList, pagination } = action.payload
      return { 
        postsList,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
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
