/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Button, Switch, DatePicker, Modal } from 'antd';
import * as Styles from './task.less';
import moment from 'moment';

const FormItem = Form.Item;

class ChangePlan extends React.PureComponent {
  static propTypes = {
    form: PropTypes.any,
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const formItemLayout1 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const themeName = getFieldsValue().themeName ? getFieldsValue().themeName : '';
    const planBeginDate = getFieldsValue().planBeginDate ? moment(getFieldsValue().planBeginDate).format('YYYY-MM-DD') : '';
    const planEndDate = getFieldsValue().planEndDate ? momnet(getFieldsValue().planEndDate).format('YYYY-MM-DD') : '';
    const parentPlanCode = getFieldsValue().parentPlanCode ? getFieldsValue().parentPlanCode : '';
    const planWorkload = getFieldsValue().planWorkload ? getFieldsValue().planWorkload : '';
    const params = {
      themeName,
      planBeginDate,
      planEndDate,
      parentPlanCode,
      planWorkload
    };
    const handleSubmit = () => {
      this.props.handleOk(2, params);
    };
    return (
      <div>
      <Modal
        visible={this.props.visible}
        closable
        onCancel={() => this.props.handleCancel()}
        footer={null}
        style={{ marginLeft: '25vw' }}
        width={'65vw'}
      >
      <Form horizontal>
        <div className={Styles.titleContent}>
          <Row>
            <Col span={23}>变更计划</Col>
          </Row>
        </div>
        <div className={Styles.bodyContent}>
          <Row>
            <FormItem
              {...formItemLayout1}
              label="标题"
            >
            {getFieldDecorator('themeName')(
              <Input
                placeholder="仅支持中英文"
                type="text"
              />
            )}
            </FormItem>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="开始时间"
              >
              {getFieldDecorator('planBeginDate')(
                <DatePicker format={'YYYY/MM/DD'} />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="结束时间"
              >
              {getFieldDecorator('planEndDate')(
                <DatePicker format={'YYYY/MM/DD'} />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="父计划"
              >
              {getFieldDecorator('parentPlanCode')(
                <Input
                  placeholder="输入标题"
                  type="text"
                  autoComplete="off"
                />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="预计投入天数"
              >
              {getFieldDecorator('planWorkload')(
                <Input
                  placeholder="输入标题"
                  type="text"
                  autoComplete="off"
                />
              )}
              </FormItem>
            </Col>
          </Row>
          <FormItem
            {...formItemLayout1}
            label="计划描述"
          >
          {getFieldDecorator('title')(
            <Input
              type="textarea" rows={7}
            />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="计划范围变更通知"
          >
          {getFieldDecorator('title')(
            <Switch defaultChecked={false} />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="通知接收人"
          >
          {getFieldDecorator('title')(
            <Input />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="审批"
          >
          {getFieldDecorator('title')(
            <Switch defaultChecked={false} />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="包含子计划"
          >
          {getFieldDecorator('title')(
            <Switch defaultChecked={false} />
          )}
          </FormItem>
        </div>
        <div className={Styles.bottomButton}>
           <div>
              <Button
                className={Styles.buttonStyle}
                onClick={() => handleSubmit()}
              >继续添加</Button>
           </div>
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
      </Modal>
      </div>
    );
  }
}
export default Form.create()(ChangePlan);
