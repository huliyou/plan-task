/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Button, Switch, DatePicker } from 'antd';
import * as Styles from './task.less';

const FormItem = Form.Item;

class ChangePlan extends React.PureComponent {
  static propTypes = {
    form: PropTypes.any,
    submitPlan: PropTypes.func,
    addPlan: PropTypes.func,
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
    const planBeginDate = getFieldsValue().planBeginDate ? getFieldsValue().planBeginDate : '';
    const planEndDate = getFieldsValue().planEndDate ? getFieldsValue().planEndDate : '';
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
      this.props.form.validateFieldsAndScroll((errors, values) => {
        if (!!errors) {
          return;
        }
        // TODO 确定提交新建任务
      });
    };
    return (
      <div>
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
              hasFeedback
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
                hasFeedback
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
                hasFeedback
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
                hasFeedback
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
                hasFeedback
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
            hasFeedback
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
            hasFeedback
          >
          {getFieldDecorator('title')(
            <Switch defaultChecked={false} />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="通知接收人"
            hasFeedback
          >
          {getFieldDecorator('title')(
            <Input />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="审批"
            hasFeedback
          >
          {getFieldDecorator('title')(
            <Switch defaultChecked={false} />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout1}
            label="包含子计划"
            hasFeedback
          >
          {getFieldDecorator('title')(
            <Switch defaultChecked={false} />
          )}
          </FormItem>
        </div>
        <div className={Styles.bottomButton}>
           <div>
              <Button
                type="primary"
                style={{ height: '40px', fontSize: '1.5rem' }}
              >继续添加</Button>
           </div>
           <div>
              <Button
                type="primary"
                style={{ height: '40px', fontSize: '1.5rem', marginRight: '3vw' }}
              >确定</Button>
              <Button
                type="primary"
                style={{ height: '40px', fontSize: '1.5rem' }}
              >取消</Button>
           </div>
        </div>
      </Form>
      </div>
    );
  }
}
export default Form.create()(ChangePlan);
