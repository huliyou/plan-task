/**
 * 评论列表
 *
 * @module CommentList
 */

import React, {PropTypes} from 'react';
import styles from './comment.less';
/**
 * 子组件，单个的评论
 */
import CommentDetail from './CommentDetail';

class CommentList extends React.Component{

    /**
     * 设定props检查，无需关注
     * 表示当前组件需要且必须(isRequired)要传递 dataSource,status
     */
    static get propTypes(){
        return {
            dataSource : PropTypes.array.isRequired,
        };
    }

    /**
     * status的渲染函数
     */
    renderStatus(){
       
    }

    render(){
        return(
            <ul className={styles.todos}> 
               
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
                        return <CommentDetail key={index} data={item} />;
                    })
                }
            </ul>
        );
    }
}

export default CommentList;