/**
 * 单个评论
 *
 * @module CommentsSimple
 */

import React, {PropTypes} from 'react';
import {Row,Col,Collapse,Input,Button} from 'antd'
import moment from 'moment';
import {config} from '../../utils'
import styles from './comment.less';
const Panel = Collapse.Panel;
  const customPanelStyle = {
    background: '#ffffff',
    borderRadius: 0,
    margin: 0,
    border: 0,
    padding: 0,
  };
class CommentsSimple extends React.Component{


    //comment检查
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
	                    <Col span={2} >
                           <img className="avatar" src={config.imgURL+"/assets/u817.png"} alt="" />
                        </Col>
	                    <Col span={22}>
	                        <Row className={styles.person}>{data.discussUser}</Row>
	                        <Row className={styles.content}>{data.discussCentent}</Row>
	                    </Col>
	                </Row>
                </ul>
                <ul className={styles.toolBar}>
                    <Row gutter={24}>
                        <Col span={22}>{moment(data.discussDate).fromNow()}</Col>
                        <Col span={2} style={{ textAlign: 'right' }}>10赞</Col>
                    </Row>
                </ul>
            </li>
        );
    }
}

export default CommentsSimple





