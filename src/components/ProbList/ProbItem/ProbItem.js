import {config} from '../../../utils'
import React, {PropTypes} from 'react';
import styles from './probs.less';
import { routerRedux,Link } from 'dva/router'
import {Card,Button,Row,Col,Badge, Tooltip, Tag} from 'antd';

//显示 post 单个组件 显示文章列表的一个项
function ProbItem({
    pathname,
    probId,
    probItem
}) {

    return (
        <Card>
            <li className={styles.todo}>
                <ul className={styles.clearfix}>
                <Row>
                    <Col span={2} className={styles.avatar}>
                    <img className="avatar" src={config.imgURL+"/assets/u817.png"} alt="" />
                    </Col>
                    <Col span={20}>
                        <Row className={styles.title}>
                            <Link  to={{ pathname, query: { probId } }}>
                                {probItem.probTitle}
                            </Link>
                        </Row>
                        <Row className={styles.subTitle}>{probItem.presentUser}</Row>
                    </Col>
                    <Col span={2} className={styles.statusText}>{probItem.probStatus}</Col>
                </Row>
                </ul>
                <ul className={styles.content}>
                    {probItem.probDescribe}
                </ul>
                <ul className={styles.toolBar}>
                    <li>评论<Badge count={probItem.disCount} style={{ backgroundColor: '#87d068' }} showZero/>条</li>
                    <li>督办</li>
                    <li>浏览 <Badge count={probItem.browserCount} showZero/> 次</li>
                </ul>
            </li>
        </Card>
    );
}

ProbItem.propTypes = {
    probItem: PropTypes.object.isRequired,
    pathname:PropTypes.string.isRequired,
    probId:PropTypes.string.isRequired
};

export default ProbItem;
