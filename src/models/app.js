import { login, userInfo, logout } from '../services/app'
import { parse } from 'qs'

export default {
  namespace: 'app',
  state: {
    login: false,
    user: {
      name: '吴彦祖',
      userId :'',
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'queryUser' })
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' })
      }
    },
  },
  effects: {
    *login ({
      payload,
    }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' })
      const data = yield call(login, parse(payload))
      if (data.successful) {    
	        yield put({
	          type: 'loginSuccess',
	          payload: {
	        	  login:true,// 将返回的数据赋值给login
	        	  user: {
	        	      name: data.resultValue.items[0].name,
	        	      userId: data.resultValue.items[0].id,
	        	    },
	          },
	        });
          localStorage.setItem('userId', data.resultValue.items[0].id);
          localStorage.setItem('baseOrgId', data.resultValue.items[0].baseOrgId);
          localStorage.setItem('name', data.resultValue.items[0].name);
          localStorage.setItem('userName', data.resultValue.items[0].userName);
          localStorage.setItem('mobile', data.resultValue.items[0].mobile);
	        console.log("user 1:",data);
      }
      else
	  {
    	  yield put({
            type: 'loginFail',            
          })
	  }
    },
    *queryUser ({
      payload,
    }, { call, put }) {

      console.log('dff1f');
        let userId = localStorage.getItem('userId');
        if(userId!=''){
      console.log('dffd2f'+userId);
         yield put({
            type: 'loginSuccess',
            payload: {
              login: true,
              user: {
                userId: userId,
              },
            }
          })
        }
//      const data = yield call(userInfo, parse(payload))
//      if (data.successful) {
//        yield put({
//          type: '',
//          payload: {
//            user: {
//              name: data.resultValue.items[0].name,
//            },
//          },
//        })
//      }
    },
    *logout ({
      payload,
    }, { call, put }) {
      yield put({
          type: 'logoutSuccess',
          payload: {
              login:false,// 将返回的数据赋值给login
              user: {
                  name: '',
                  userId: '',
                },
            },
        })  
      localStorage.setItem('userId', '');
    },
    *switchSider ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false,
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
