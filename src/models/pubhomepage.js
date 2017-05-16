import { query } from '../services/pubhomepage'
import { parse } from 'qs'

export default {

  namespace: 'homepage',
  
  state: {
	    list: [],
	    modalVisible: false,
	    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
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
        if (location.pathname === '/homepage') {
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
        console.log(22,data.items);
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.items,
              pagination: data.page,
            },
          })
        }
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
