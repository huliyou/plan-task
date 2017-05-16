import { queryTempletPlanList,createTempletPlan } from '../../../services/pub/templetplan/templetplan'
import { parse } from 'qs'

export default {

  namespace: 'templetplan',
 //初始化参数
  state: {
  foo:'open',
  templetPlanList:[],
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
        if (location.pathname === '/systemconf/templetconf') {
          dispatch({
            type: 'queryTempletPlanList',
            payload: location.query,
          })
        }
      })
    },
  },
 //定义的一般方法
  effects: {
    *queryTempletPlanList ({ payload }, { call, put }) {
      const data = yield call(queryTempletPlanList, parse(payload))//回调函数
      if (data) {
    	  console.log(1,data.resultValue.items[0]);
        yield put({
          type: 'querySuccess',
          payload: {
            foo: 'close',
            templetPlanList:data.resultValue.items[0],// 将返回的数据赋值给templetPlanList
            
          },
        });
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
