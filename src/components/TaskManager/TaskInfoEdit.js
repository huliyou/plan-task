
import React, { PropTypes } from 'react';
import { Button, Modal, Collapse, Form, Input, Icon, Table, Tabs, Timeline, Row, Col, Radio, DatePicker} from 'antd';
import * as Styles from './task.less';
import { Editor } from 'react-draft-wysiwyg';
import moment from 'moment';

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

class TaskInfoEdit extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    parentTaskList: PropTypes.array,
    filesList: PropTypes.array,
    relationTaskList: PropTypes.array,
    getTaskInfo: PropTypes.object,
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
    const phase = getFieldsValue().phase ? getFieldsValue().phase : '';
    const themeName = getFieldsValue().themeName ? getFieldsValue().themeName : '';
    const procType = getFieldsValue().procType ? getFieldsValue().procType : '';
    const pDuty = getFieldsValue().remarks ? getFieldsValue().pDuty : '';
    const themeDesc = getFieldsValue().themeDesc ? getFieldsValue().themeDesc : '';
    const themeStandard = getFieldsValue().themeStandard ? getFieldsValue().themeStandard : '';
    const workDay = getFieldsValue().workDay ? getFieldsValue().workDay : '';
    const priority = getFieldsValue().priority ? getFieldsValue().priority : '';
    const weight = getFieldsValue().weight ? getFieldsValue().weight : '';
    const planId = getFieldsValue().planId ? getFieldsValue().planId : '';
    const rPocId = getFieldsValue().rPocId ? getFieldsValue().rPocId : '';
    const dateTo = getFieldsValue().dateTo ? moment(getFieldsValue().dateTo).format('YYYY-MM-DD') : '';
    const comment = getFieldsValue().comment ? getFieldsValue().comment : '';
    const params = {
      phase,
      themeName,
      procType,
      pDuty,
      themeDesc,
      themeStandard,
      workDay,
      priority,
      weight,
      planId,
      rPocId,
      dateTo,
      comment
    };
    const handleSubmit = () => {
      this.props.handleOk(3, params);
    };
    const taskInfo = this.props.getTaskInfo;
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
            {getFieldDecorator('themeName', {
              initialValue: taskInfo.themeName,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="故事描述"
          >
            {/* <Editor /> */}
            {getFieldDecorator('themeDesc', {
              initialValue: taskInfo.themeDesc,
            })(
              <Input type="textarea" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="验证标准"
          >
            {/* <Editor /> */}
            {getFieldDecorator('themeStandard', {
              initialValue: taskInfo.themeStandard,
            })(
              <Input type="textarea" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="流程状态"
          >
          {getFieldDecorator('phase', {
            initialValue: taskInfo.phase,
          })(
              <RadioGroup>
                <Radio value="新建">新建</Radio>
                <Radio value="开发中">开发中</Radio>
                <Radio value="验证">验证</Radio>
                <Radio value="已完成">已完成</Radio>
              </RadioGroup>
          )}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="负责人"
              >
              {getFieldDecorator('pDuty', {
                initialValue: taskInfo.pDuty,
              })(
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
              {getFieldDecorator('priority', {
                initialValue: taskInfo.priority,
              })(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="占整个项目比例"
              >
              {getFieldDecorator('weight', {
                initialValue: taskInfo.weight,
              })(
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
              {getFieldDecorator('planId', {
                initialValue: taskInfo.planId,
              })(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="上级任务"
              >
              {getFieldDecorator('rPocId', {
                initialValue: taskInfo.rPocId,
              })(
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
              {getFieldDecorator('dateTo', {
                initialValue: taskInfo.dateTo ? moment(taskInfo.dateTo, 'YYYY/MM/DD') : undefined
              })(
                <DatePicker format={'YYYY/MM/DD'} />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="所属集成"
              >
              {getFieldDecorator('procType', {
                initialValue: taskInfo.procType,
              })(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <FormItem
            {...formItemLayout1}
            label="评论"
          >
            {getFieldDecorator('comment', {
              initialValue: taskInfo.comment,
            })(
              <Input type="textarea" />
            )}
          </FormItem>
          </div>
          { /* 附件展示 */ }
          <div style={relationStyles.title}>附件</div>
          <div style={{ marginBottom: '20px' }}>
            <Table columns={columns} dataSource={this.props.filesList} pagination={false} />
          </div>
          { /* 关联任务展示 */ }
          <div style={relationStyles.title}>关联的任务</div>
          <div style={{ marginBottom: '20px' }}>
            <Table columns={relateColumns} dataSource={this.props.relationTaskList} pagination={false} />
          </div>
          { /* 上级任务展示 */ }
          <div style={relationStyles.title}>上级任务</div>
          <div style={{ marginBottom: '20px' }}>
            <Table columns={relateColumns} dataSource={this.props.parentTaskList} pagination={false} />
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
