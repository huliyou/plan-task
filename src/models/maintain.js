import { queryPlanList,query} from '../services/maintain'
import { parse } from 'qs'

export default {

  namespace: 'maintain',
 //初始化参数
  state: {
  foo:'open',
  planList:[],
  visible:true,

  list: [],
  currentItem: {},
  modalVisible: false,
  modalType: 'create',
  isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    current: 1,
    total: null,
  },

  },
 //定义的初始化方法
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/maintain') {
          dispatch({
            type: 'queryPlanList',
            payload: location.query,
          })
        }
      })
    },
  },
 //定义的一般方法
  effects: {
    
    *query ({ payload }, { call, put }) {
        const data = yield call(query, parse(payload))
        if (data.data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: {
            	  total: data.total,
            	  current:data.current,            	  
              },
            },
          })
        }
      },
    
    *'delete' ({ payload }, { call, put }) {
        const data = yield call(remove, { id: payload })
        if (data && data.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: {
                total: data.page.total,
                current: data.page.current,
              },
            },
          })
        }
      },
      
      *create ({ payload }, { call, put }) {
    	  console.log("payload",payload);
        yield put({ type: 'hideModal' })
        const data = yield call(create, payload)
        if (data && data.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: {
                total: data.page.total,
                current: data.page.current,
              },
            },
          })
        }
      },
      *update ({ payload }, { select, call, put }) {
        yield put({ type: 'hideModal' })
        const id = yield select(({ users }) => users.currentItem.id)
        const newUser = { ...payload, id }
        const data = yield call(update, newUser)
        if (data && data.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: {
                total: data.page.total,
                current: data.page.current,
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
    return {...state, ...action.payload, loading: true};
      const { list, pagination } = action.payload
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    
    //弹出页面方法
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
