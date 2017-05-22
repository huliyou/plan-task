
import React, { PropTypes } from 'react';
import { Button, Modal, Collapse, Form, Input, Icon, Table, Tabs, Timeline, Row, Col, Radio } from 'antd';
import * as Styles from './task.less';
import { Editor } from 'react-draft-wysiwyg';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

const relationStyles = ({
  title: {
    width: '100%',
    height: '40px',
    lineHeight: '40px',
    fontSize: '20px',
    backgroundColor: '#eee',
    margin: '20px 0',
    padding: '0 10px',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
});

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

class TaskInfoEdit extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    parentTaskList: PropTypes.array,
    filesList: PropTypes.array,
    relationTaskList: PropTypes.array,
    planInfo: PropTypes.object,
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    const formItemLayout1 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const prjId = getFieldsValue().prjId ? getFieldsValue().prjId : '';
    const themeName = getFieldsValue().themeName ? getFieldsValue().themeName : '';
    const title = getFieldsValue().title ? getFieldsValue().title : '';
    const pDuty = getFieldsValue().remarks ? getFieldsValue().pDuty : '';
    const params = {
      prjId,
      themeName,
      title,
      pDuty,
    };
    const handleSubmit = () => {
      this.props.handleOk(3, params);
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
      <div style={{ padding: '5vh' }}>
        {/* 任务编辑 */}
        <Form horizontal>
          <div className={Styles.titleContent}>
            <Row>
              <Col span={23}>编辑任务</Col>
            </Row>
          </div>
          <div className={Styles.bodyContent}>
          <FormItem
            {...formItemLayout1}
            label="标题"
          >
            {getFieldDecorator('prjId')(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="故事描述"
          >
            {/* <Editor /> */}
            {getFieldDecorator('prjId')(
              <Input type="textarea" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="验证标准"
          >
            {/* <Editor /> */}
            {getFieldDecorator('prjId')(
              <Input type="textarea" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="流程状态"
          >
          {getFieldDecorator('prjId')(
              <RadioGroup onChange="" value="">
                <Radio value={1}>新建</Radio>
                <Radio value={2}>开发中</Radio>
                <Radio value={3}>验证</Radio>
                <Radio value={4}>已完成</Radio>
              </RadioGroup>
          )}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="负责人"
              >
              {getFieldDecorator('prjId')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="估算工时"
              >
              {getFieldDecorator('themeName')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="优先级"
              >
              {getFieldDecorator('prjId')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="占整个项目比例"
              >
              {getFieldDecorator('themeName')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="所属计划"
              >
              {getFieldDecorator('prjId')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="上级任务"
              >
              {getFieldDecorator('themeName')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="截止时间"
              >
              {getFieldDecorator('prjId')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="所属集成"
              >
              {getFieldDecorator('themeName')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <FormItem
            {...formItemLayout1}
            label="评论"
          >
            {getFieldDecorator('prjId')(
              <Input />
            )}
          </FormItem>
          </div>
          { /* 附件展示 */ }
          <div style={relationStyles.title}>附件</div>
          <div style={{ marginBottom: '20px' }}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          { /* 关联任务展示 */ }
          <div style={relationStyles.title}>关联的任务</div>
          <div style={{ marginBottom: '20px' }}>
            <Table columns={relateColumns} dataSource={data} pagination={false} />
          </div>
          { /* 上级任务展示 */ }
          <div style={relationStyles.title}>上级任务</div>
          <div style={{ marginBottom: '20px' }}>
            <Table columns={relateColumns} dataSource={data} pagination={false} />
          </div>
         <div className={Styles.bottomButton}>
           <div />
           <div>
              <Button
                className={Styles.buttonStyle}
                onClick={() => handleSubmit()}
              >确定</Button>
              <Button
                className={Styles.buttonStyle}
                onClick={() => this.props.handleCancel()}
              >取消</Button>
           </div>
        </div>
        </Form>
      </div>
      </Modal>
    );
  }
}
export default Form.create()(TaskInfoEdit);
