/**
 * 单个待办事项
 *
 * @module ProbDetail
 */

import React, {PropTypes} from 'react';
import {Row,Col,Badge} from 'antd'
import styles from './probs.less';
class ProbDetail extends React.Component{

    //props检查
    static get propTypes(){
        return {
            data : PropTypes.object.isRequired
        };
    }

    render(){

        //这里相当于  var data = this.props.data;
        //对应dataSource中的每一个子项
        const { data } = this.props;

        /**
         * 这里应该都看得懂了吧 <img className="avatar" src={data.avatar} alt="" />
         * dataSource 流到这里就是终点了，其每一项会都被渲染到页面上
         * 因为数据与视图是绑定的，dataSource如果有改变，页面上的内容也会立即改变
         */
        return(
            <li className={styles.todo}>
                <ul className={styles.clearfix}>
                <Row>
                    <Col span={2} className={styles.avatar}></Col>
                    <Col span={20}>
                      
                        <Row className={styles.title}>{data.probTitle}</Row>
                        <Row className={styles.subTitle}>{data.presentUser}</Row>
                    </Col>
                    <Col span={2} className={styles.statusText}>待关闭</Col>
                </Row>
                </ul>
                <ul className={styles.content}>
                    {data.probDescribe}
                </ul>
                <ul className={styles.toolBar}>
                    <li>评论<Badge count={probItem.disCount} style={{ backgroundColor: '#87d068' }} showZero/>条</li>
                    <li>督办</li>
                    <li>浏览<Badge count={probItem.browserCount} showZero/>次</li>
                </ul>
            </li>
        );
    }
}

export default ProbDetail;





