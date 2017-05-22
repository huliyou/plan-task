
import React, { PropTypes } from 'react';
import { Button, Modal, Collapse, Form, Input, Icon, Table, Tabs, Timeline, Row, Col } from 'antd';
import * as Styles from './task.less';
import TaskInfoEdit from './TaskInfoEdit';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const columns = [{
  title: '上传人',
  dataIndex: 'uploadName',
  key: 'uploadName',
}, {
  title: '上传时间',
  dataIndex: 'uploadDate',
  key: 'uploadDate',
}, {
  title: '附件类型',
  dataIndex: 'fileTypeId',
  key: 'fileTypeId',
}, {
  title: '文件名称',
  dataIndex: 'fileName',
  key: 'fileName',
  render: (type) => <a href="#">{type}</a>,
}, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => (
        <span>
          <a href="#" className="ant-dropdown-link">
            <Icon type="delete" />
          </a>
        </span>
      )
}];
// 关联任务
const relateColumns = [{
  title: '编号',
  dataIndex: 'procId',
  key: 'procId',
}, {
  title: '标题',
  dataIndex: 'themeName',
  key: 'themeName',
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '关联时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '负责人',
  dataIndex: 'pDuty',
  key: 'pDuty',
}, {
  title: '流程状态',
  dataIndex: 'status',
  key: 'status',
  render: (type) => <span>{type}</span>,
}];

class TaskInfoSee extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    parentTaskList: PropTypes.array,
    filesList: PropTypes.array,
    relationTaskList: PropTypes.array,
    getTaskInfo: PropTypes.object,
    commentList: PropTypes.array,
    logList: PropTypes.array,
  };
  getLogList(logList) {
    const view = [];
    if(logList) {
      logList.forEach((value) => {
        view.push(
          <Timeline.Item>
            <Row gutter={16}>
              <Col span={6}><span>{value.operationDate}</span></Col>
              <Col span={2}>{value.logId}楼</Col>
              <Col span={2}><span>{value.operationName}</span></Col>
            </Row>
            <Row gutter={16}>
              <Col span={22}>{value.operationDesc}</Col>
              <Col span={2}><a href="#">回复</a></Col>
            </Row>
          </Timeline.Item>
        );
      });
    }
    return view;
  }
  getCommentList(commentList) {
    const view = [];
    if(commentList) {
      commentList.forEach((value) => {
        view.push(
          <Timeline.Item>
            <Row gutter={16}>
              <Col span={6}><span>{value.commentdate}</span></Col>
              <Col span={2}>{value.commentId}楼</Col>
              <Col span={2}><span>{value.commentName}</span></Col>
            </Row>
            <Row gutter={16}>
              <Col span={22}>{value.commentDesc}</Col>
              <Col span={2}><a href="#">回复</a></Col>
            </Row>
          </Timeline.Item>
        );
      });
    }
    return view;
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const taskInfo = this.props.getTaskInfo;
    return (
      <Modal
        visible={true}
        onCancel={() => this.props.handleCancel()}
        closable
        footer={null}
        style={{ marginLeft: '25vw' }}
        width={'65vw'}
      >
      <div style={{ padding: '5vh' }}>
        <Row gutter={16} style={{ fontSize: '20px', fontWeight: 'bold' }}>
          <Col span={1}>#{taskInfo.procId}</Col>
          <Col span={20}>【需求】</Col>
          <Col span={3}>
            <Button
               className={Styles.buttonStyle}
               onClick={() => {
                  this.props.handleOk();
                }}
            >
              编辑
            </Button>
          </Col>
          <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
          <Col span={24}>业务需求评审</Col>
        </Row>
        <Row gutter={16} style={{ fontSize: '15px', margin: '10px', color: '#ccc' }}>
          <Col span={2}>{taskInfo.createName}</Col>
          <Col span={8}>创建与 {taskInfo.createTime}</Col>
        </Row>
        <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
        <Collapse defaultActiveKey={['1']}>
          <Panel header={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>字段</span>} key="1">
            <Row gutter={16} style={{ fontSize: '15px', lineHeight: '2' }}>
              <Col span={3}>流程状态</Col>
              <Col span={5}>{taskInfo.phase || '无'}</Col>
              <Col span={3}>负责人</Col>
              <Col span={5}>{taskInfo.pDuty || '无'}</Col>
              <Col span={3}>优先级</Col>
              <Col span={5}>{taskInfo.priority || '无'}</Col>
              <Col span={3}>截止时间</Col>
              <Col span={5}>{taskInfo.dataTo || '无'}</Col>
              <Col span={3}>所属计划</Col>
              <Col span={5}>{taskInfo.planId || '无'}</Col>
              <Col span={3}>上级任务</Col>
              <Col span={5}>{taskInfo.prjId || '无'}</Col>
              <Col span={3}>估算工时</Col>
              <Col span={5}>{taskInfo.workDay || '无'}</Col>
              <Col span={3}>所属集成</Col>
              <Col span={5}>{taskInfo.rPocId || '无'}</Col>
              <Col span={3}>占整个项目比例</Col>
              <Col span={5}>{taskInfo.weight || '无'}</Col>
            </Row>
          </Panel>

          <Panel header={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>内容</span>} key="2">
            <FormItem
              {...formItemLayout}
              label="任务描述"
            >
              <Input type="textarea" value={taskInfo.themeDesc} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="验证标准"
            >
              <Input type="textarea" />
            </FormItem>
          </Panel>

          <Panel header={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>附件</span>} key="5">
            <Table columns={columns} dataSource={this.props.filesList} pagination={false} />
          </Panel>
          <Panel header={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>关联任务</span>} key="3">
            <Table columns={relateColumns} dataSource={this.props.relationTaskList} pagination={false} />
          </Panel>
          <Panel header={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>任务层级</span>} key="4">
            <Table columns={relateColumns} dataSource={this.props.parentTaskList} pagination={false} />
          </Panel>

          <Panel header={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>动态</span>} key="6">
            <Tabs defaultActiveKey="1">
              <TabPane tab="操作记录" key="1">
                <Timeline>
                 {this.getLogList(this.props.logList)}
                </Timeline>
              </TabPane>
              <TabPane tab="评论" key="2">
                <Row>
                  <Col span={18}><Input /></Col>
                  <Col span={4} offset={1}><Button>评论</Button></Col>
                </Row>
                <div style={{ marginTop: '10px' }}>
                  <Timeline>
                    {this.getCommentList(this.props.commentList)}
                  </Timeline>
                </div>
              </TabPane>
            </Tabs>
          </Panel>
        </Collapse>
      </div>
    </Modal>
    );
  }
}
export default TaskInfoSee;
