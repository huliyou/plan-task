
import React, { PropTypes } from 'react';
import { Button, Modal, Collapse, Form, Input, Icon, Table, Tabs, Timeline, Row, Col } from 'antd';
import * as Styles from './task.less';
import TaskInfoEdit from './TaskInfoEdit';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


const columns = [{
  title: '上传人',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '上传时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '附件类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '文件名称',
  dataIndex: 'file',
  key: 'file',
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
  dataIndex: 'id',
  key: 'id',
}, {
  title: '标题',
  dataIndex: 'title',
  key: 'title',
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
  dataIndex: 'name',
  key: 'name',
}, {
  title: '流程状态',
  dataIndex: 'status',
  key: 'status',
  render: (type) => <span>{type}</span>,
}];
const relateData = [{
  key: '1',
  id: '1',
  title: '题目',
  name: 'name',
  time: 'time',
  type: 32,
  status: '完成',
}, {
  key: '2',
  id: '3',
  title: '题目',
  name: 'name',
  time: 'time',
  type: 32,
  status: '完成',
}, {
  key: '3',
  id: '3',
  title: '题目',
  name: 'name',
  time: 'time',
  type: 32,
  status: '完成',
}];

const data = [{
  key: '1',
  name: 'name',
  time: 'time',
  type: 32,
  file: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'name',
  time: 'time',
  type: 32,
  file: 'New York No. 1 Lake Park',
}, {
  key: '3',
  name: 'name',
  time: 'time',
  type: 32,
  file: 'New York No. 1 Lake Park',
}];
class TaskInfoSee extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    edit: PropTypes.bool,
    procId: PropTypes.number,
    handleCancel: PropTypes.func,
  };
  state = {
    edit: false,
  }
  componentWillMount() {
    // 按任务序号获取任务详细信息
  }
  showTaskEdit(procId) {
    if (this.state.edit) {
      return (
        <TaskInfoEdit
          procId={procId}
          visible={this.state.edit}
          handleCancel={() => this.setState({ edit: false })}
        />
      );
    }
    return <div />;
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    return (
      <Modal
        visible={this.props.visible}
        onCancel={() => this.props.handleCancel()}
        closable
        footer={null}
        style={{ marginLeft: '25vw' }}
        width={'65vw'}
      >
      {this.showTaskEdit(this.props.procId)}
      <div style={{ padding: '5vh' }}>
        <Row gutter={16}>
          <Col span={1}>#1</Col>
          <Col span={20}>【需求】</Col>
          <Col span={3}>
            <Button onClick={() => {
                console.log(this.state);
                this.setState({ edit: true });
              }}
            >
              编辑
            </Button>
          </Col>
          <Col span={24}>业务需求评审</Col>
        </Row>
        <Row gutter={16}>
          <Col span={2}>dsfsd</Col>
          <Col span={8}>创建与 2017-04-02</Col>
        </Row>
        <div />
        <Collapse defaultActiveKey={['1']}>
          <Panel header="字段" key="1">
            <Row gutter={16}>
              <Col span={3}>流程状态</Col>
              <Col span={5}>新建</Col>
              <Col span={3}>负责人</Col>
              <Col span={5}>某某某</Col>
              <Col span={3}>优先级</Col>
              <Col span={5}>高</Col>
              <Col span={3}>截止时间</Col>
              <Col span={5}>2017-06-01</Col>
              <Col span={3}>所属计划</Col>
              <Col span={5}>需求确认</Col>
              <Col span={3}>流程状态</Col>
              <Col span={5}>流程状态</Col>

            </Row>
            <Row gutter={16}>
              <Col span={4} offset={16}>
                <a href="#" className="ant-dropdown-link">
                  显示更多<Icon type="down" />
                </a>
              </Col>
            </Row>

          </Panel>
          <Panel header="内容" key="2">
            <FormItem
              {...formItemLayout}
              label="任务描述"
            >
              <Input type="textarea" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="验证标准"
            >
              <Input type="textarea" />
            </FormItem>
          </Panel>
          <Panel header="附件" key="5">
            <Table columns={columns} dataSource={data} />
          </Panel>
          <Panel header="关联任务" key="3">
            <Table columns={relateColumns} dataSource={relateData} />
          </Panel>
          <Panel header="任务层级" key="4">
            <Table columns={relateColumns} dataSource={relateData} />
          </Panel>

          <Panel header="动态" key="6">
            <Tabs defaultActiveKey="1">
              <TabPane tab="操作记录" key="1">
                <Timeline>
                  <Row gutter={16}>
                    <Col span={6}><span>2015-09-01 10:40</span></Col>
                    <Col span={2}>1楼</Col>
                    <Col span={2}><span>XXX</span></Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={22}>sfsdfsdfsfsf</Col>
                    <Col span={2}><a href="#">详情</a></Col>
                  </Row>
                </Timeline>
              </TabPane>
              <TabPane tab="评论" key="2">
                <Row>
                  <Col span={18}><Input /></Col>
                  <Col span={4} offset={1}><Button>评论</Button></Col>
                </Row>
                <div style={{ marginTop: '10px' }}>
                  <Timeline>
                    <Timeline.Item>
                      <Row gutter={16}>
                        <Col span={6}><span>2015-09-01 10:40</span></Col>
                        <Col span={2}>1楼</Col>
                        <Col span={2}><span>XXX</span></Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={22}>sfsdfsdfsfsf</Col>
                        <Col span={2}><a href="#">回复</a></Col>
                      </Row>
                    </Timeline.Item>
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
