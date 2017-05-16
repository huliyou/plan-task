import { create, remove, update, query, outpool ,findProjectPerson} from '../services/pond'
import { findByProb } from '../services/communicate'
import { parse } from 'qs'
import { message } from 'antd'

export default {

  namespace: 'pond',

  state: {
    list: [],
    dictItems:[],
    solveUser:[],
    tableData:[],
    currentItem: {},
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
        if (location.pathname === '/probs/pond') {
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
    //新建问题 编辑问题请求后台 获取数据字典
    *findByProb ({ payload }, { call, put }) {
      const tempModalType  = payload.modalType;
      const data = yield call(findByProb, parse(payload))
      const findProjectPersons = yield call(findProjectPerson, parse(payload))
      if (data) {
        if(data.items.length==0){
          yield put({
            type: 'showModal',
            payload: {
              dictItems: data.dicItems,
              modalType: tempModalType,
              solveUser: findProjectPersons.data// [{"value":"34ecb6ae67184750a0bb34e59d6d6a28","children":[],"label":"111111","key":"34ecb6ae67184750a0bb34e59d6d6a28"},{"value":"4028b4b15aeee0d9015aef7abfe60003","children":[{"value":"gaoyan","label":"高岩","key":"gaoyan"},{"value":"linzhengyu","label":"林政燏","key":"linzhengyu"},{"value":"wangpeng","label":"王鹏","key":"wangpeng"},{"value":"weixiaojun","label":"魏晓俊","key":"weixiaojun"},{"value":"sunbaoran","label":"孙宝然","key":"sunbaoran"},{"value":"ipm_zhaozhenlu","label":"赵振鲁","key":"ipm_zhaozhenlu"},{"value":"ipm_luxiangyu","label":"路翔宇","key":"ipm_luxiangyu"},{"value":"ipm_shenweiwei","label":"申玮玮","key":"ipm_shenweiwei"},{"value":"ipm_lirongjiao","label":"李荣娇","key":"ipm_lirongjiao"},{"value":"ipm_baijinlong","label":"白金龙","key":"ipm_baijinlong"},{"value":"ipm_yanfazhongxin","label":"研发中心","key":"ipm_yanfazhongxin"},{"value":"ipm_zhuyuanchun","label":"朱元春","key":"ipm_zhuyuanchun"},{"value":"ipm_xujiushan","label":"徐九山","key":"ipm_xujiushan"},{"value":"ipm_liuyanming","label":"刘雁鸣","key":"ipm_liuyanming"},{"value":"ipm_gongfu","label":"龚夫","key":"ipm_gongfu"},{"value":"ipm_zhengwanli","label":"郑万里","key":"ipm_zhengwanli"},{"value":"ipm_shaopeng","label":"邵鹏","key":"ipm_shaopeng"},{"value":"ipm_tianweipeng","label":"田伟鹏","key":"ipm_tianweipeng"},{"value":"ipm_hanyu","label":"韩宇","key":"ipm_hanyu"},{"value":"ipm_mochenyang","label":"莫晨阳","key":"ipm_mochenyang"},{"value":"ipm_shenjian","label":"沈坚","key":"ipm_shenjian"}],"label":"信息化建设现场管理系统","key":"4028b4b15aeee0d9015aef7abfe60003"},{"value":"924e9bc3a1e44012b32146c8a57c4aad","children":[],"label":"1","key":"924e9bc3a1e44012b32146c8a57c4aad"},{"value":"ba4fc3a3b4c8470290b85a3428175129","children":[],"label":"国网黑龙江电力-全业务统一数据中心数据分析域建设项目","key":"ba4fc3a3b4c8470290b85a3428175129"}],
            },
          })
        }
      }
    },
    //出池
    *outpool({ payload }, { call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({
          type: 'hideModal',
          payload: {
            modalType: 'outPool',
           }, 
        })
      const data = yield call(outpool, payload)
      if ( data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else {
          message.success('问题出池成功！');
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
      }
      }
    },
    *create ({ payload }, { call, put }) {
      message.config({
         top: 200,
         duration: 3,
        });
      yield put({ 
        type: 'hideModal',
        payload: {
            modalType: 'outPool',
           }, 
         })
      const data1 = yield call(create, payload)
      const data = yield call(query)
      if ( data) {
        if(data.successful == false){
          message.error('系统异常！请稍后再试！');  
        }else {
          message.success('新建问题成功！');
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
      }
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
      const { list, pagination } = action.payload
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    showModal (state, action) {
      if(action.payload.modalType==='outpool'){
        return { ...state, ...action.payload, outModalVisible: true }
      }else if(action.payload.modalType==='create'){
        const { dictItems,modalType } = action.payload
        return { ...state, ...action.payload,dictItems,modalType, modalVisible: true }
      }
      
    },
    setTableData(state, action){
        const { tableData,currentItem } = action.payload
        return { ...state, ...action.payload,tableData,currentItem}
    },
    hideModal (state,action) {
        return { ...state, modalVisible: false,outModalVisible:false }
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },
}
