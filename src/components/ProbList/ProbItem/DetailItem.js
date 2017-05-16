import {config} from '../../../utils'
import React, {PropTypes} from 'react';
import styles from './probs.less';
import { routerRedux,Link } from 'dva/router'
import {Card,Button,Row,Col, Badge,Tooltip, Tag} from 'antd';
import {
    CommentTabs,
    CommentTab
} from '../../CommentTabs';
//显示 post 单个组件 显示文章列表的一个项
function DetailItem({
    pathname,
    probId,
    probItem,
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
                <CommentTabs rightText={<div>浏览<Badge count={probItem.browserCount} showZero/>次</div>}>
                    <CommentTab title={<div> 评论<Badge count={probItem.disCount} style={{ backgroundColor: '#87d068' }} showZero/>条</div>}>
                        评论评论评论评论评论评论评论评论评论评论
                    </CommentTab>
                    <CommentTab title={<div> 督办</div>}>
                        督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办督办
                    </CommentTab>
                </CommentTabs>

                
            </li>
        </Card>
    );
}

DetailItem.propTypes = {
    pathname:PropTypes.string.isRequired,
    probId:PropTypes.string.isRequired
};

export default DetailItem;
