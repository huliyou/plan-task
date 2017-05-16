import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router';
import {Button, Tabs, Collapse, Icon, Row, Pagination } from 'antd';
import ProbsListBody from '../../components/ProbList/ProbListBoby';
import SearchFilter from './SearchFilter'

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

//003.png
function ProbListPage({
    postsList,
    pagination,
    dispatch,
    isMotion,
    loadingPostsList
}) {

    function callback(key) {
         switch(key){
            case '1':
              dispatchTo('query');
              break;
            case '2':
              dispatchTo('queryHistory');
              break;
         }
    }

  function dispatchTo(pathname){
    dispatch({
        type: `probs/${pathname}`,
      })
  }

  function onChange(current, pageSize) {
    const { query, pathname } = location
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        page:current,
        pageSize: pageSize,
      },
    }))
  }

  function onChangeHistory(current, pageSize) {
    const { query, pathname } = location
    dispatch({
        type: 'probs/queryHistory',
        payload: {
          page:current,
          pageSize: pageSize,
        },
    })
  }

  const searchFilterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/probs',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/probs',
      }))
    },
    onAdd () {
      dispatch({
        type: 'probs/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'probs/switchIsMotion' })
    },
  }

    return ( 
      <div className="content-inner" style={{ minHeight:500 }}>
          <Collapse bordered={false} defaultActiveKey={['0']} >
            <Panel header="筛选" key="1">
              <SearchFilter {...searchFilterProps} />
            </Panel>
          </Collapse>
        <div style={{ margin:20 }}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="沟通中" key="1">
                <div>
                <Row>
                    <ProbsListBody
                        probsList={postsList}
                        pathname={ '/prob_detail/to_close'}
                    />
                </Row>  
                <Row>
                 <Pagination 
                     showSizeChanger 
                     defaultCurrent={1}  
                     onShowSizeChange={onChange}
                     onChange={onChange} 
                     defaultCurrent={pagination.current} 
                     total={pagination.total}
                   />
                   </Row>
                </div>
            </TabPane>
            <TabPane tab="沟通历史" key="2">
                <div>
                <Row>
                    <ProbsListBody
                        probsList={postsList}
                        pathname={ '/prob_detail/to_close'}
                    />
                </Row>  
                <Row>
                 <Pagination 
                     showSizeChanger 
                     defaultCurrent={1}  
                     onShowSizeChange={onChangeHistory}
                     onChange={onChangeHistory} 
                     defaultCurrent={pagination.current} 
                     total={pagination.total}
                   />
                   </Row>
                </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
}

ProbListPage.propTypes = {
    postsList: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        postsList: state.probs.postsList,
        pagination: state.probs.pagination
    };
}

export default connect(mapStateToProps)(ProbListPage);