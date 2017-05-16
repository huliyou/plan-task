/**
 * 待办事项
 *
 * @module IncomingPoolList
 */

import React, {PropTypes} from 'react';
import styles from './probs.less';
/**
 * 子组件，单个的待办事项
 */
import IncomingPoolDetail from './IncomingPoolDetail';

class IncomingPoolList extends React.Component{

    /**
     * 设定props检查，无需关注
     * 表示当前组件需要且必须(isRequired)要传递 dataSource,status
     */
    static get propTypes(){
        return {
            dataSource : PropTypes.array.isRequired,
            status : PropTypes.string.isRequired
        };
    }

    /**
     * status的渲染函数
     */
    renderStatus(){
        const { status } = this.props;
        let text = '';

        switch(status){
            case 'init':
                text = '正在初始化';
                break;
            case 'loading':
                text = '正在载入...';
                break;
            case 'error':
                text = '发生错误。';
                break;
            default:
                text='';
        }

        const statusComponent = <div className="statusText">{ text }</div>;

        //if(status === 'done'){
            return null;
       // }else{
            //return statusComponent;
       // }
    }

    render(){
        return(
            <ul className={styles.todos}> 

                {
                    //将status渲染到页面上，不重要
                    this.renderStatus()
                }

                {
                    /**
                     * 重点
                     * 这里用的是es6的map迭代,用for语句替代也可以,重要的是输出一堆子组件
                     */ 
                    this.props.dataSource.map((item,index)=>{

                        /**
                         * item - 将dataSource数组中的每一个子项都传递给子组件
                         * key - react用来区分每一个子组件用的，如果是迭代数据，必须设置key
                         */
                        return <IncomingPoolDetail key={index} data={item} />;
                    })
                }
            </ul>
        );
    }
}

export default IncomingPoolList;