import { queryPlanList,create,query,delet,update,queryAddInfo } from '../services/proc'
import { parse } from 'qs'
import { message } from 'antd'; 


export default {

  namespace: 'proc',
 //初始化参数
  state: {
  foo:'open',
  planList:[],
  addTreeList:[],
  visible:true,

  list: [],
  currentItem: {},
  modalVisible: false,
  modalVisible2: false,

  modalType: 'create',
  isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    current:1,
    total: null,
  },

  },
 //定义的初始化方法
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        
        dispatch({
            type: 'query',
            payload: location.query,
          })
      })
    },
  
  },
  
  
  
 //定义的一般方法
  effects: {
    *queryPlanList ({ payload }, { call, put }) {
      const data = yield call(queryPlanList, parse(payload))//回调函数
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            foo: 'close',
            planList:data.resultValue.items[0],// 将返回的数据赋值给planList
          },
        });
      }
    },
    
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
      
      *queryAddInfo ({ payload }, { call, put }) {
          const data = yield call(queryAddInfo, parse(payload))
          console.log(2,data);
          console.log(3,data.items);
          if (data.data) {
            yield put({
              type: 'querySuccess',
              payload: {
            	  addTreeList: data.items,
              },
            })
          }
        },
    
    *'delete' ({ payload }, { call, put }) {
    	  message.config({
              top: 200,
              duration: 3,
             });
        const data = yield call(delet, { id: payload })
        if (data ) {  
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
        
        const data = yield call(create, payload)
        if(data){
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
              message.success('添加成功！');
             }
        }
      },
      *update ({ payload }, { select, call, put }) {
    	  message.config({
              top: 200,
              duration: 3,
             });
    	  console.log(7,payload);
        yield put({ type: 'hideModal' })                                    
        const data = yield call(update, payload)
        if (data) {
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
          message.success('编辑成功！');
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
    
    //弹出新建任务页面方法
    showModal (state, action) {
    	console.log("...action.payload",...action.payload);
        return { ...state, ...action.payload, modalVisible: true,modalVisible2:false}
      },
      //弹出任务关联页面
      showModal2 (state, action) {
      	console.log("...action.payload",...action.payload);
          return { ...state, ...action.payload, modalVisible2:true,modalVisible: false}
        },
     //隐藏新建任务页面方法   
      hideModal (state) {
        return { ...state, modalVisible: false }
      },
      //隐藏任务关联页面方法
      hideModal2 (state) {
          return { ...state, modalVisible2: false }
        },
      handleSwitchIsMotion (state) {
        localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
        return { ...state, isMotion: !state.isMotion }
      },  
  },
}
