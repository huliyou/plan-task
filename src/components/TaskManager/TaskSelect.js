/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Select, Row, Col, Input } from 'antd';
import * as Styles from './task.less';

const FormItem = Form.Item;
const Option = Select.Option;

class TaskSelect extends React.PureComponent {
  static propTypes = {
    form: PropTypes.any,
    submitPlan: PropTypes.func,
    addPlan: PropTypes.func,
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
    };
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const procId = getFieldsValue().procId ? getFieldsValue().procId : '';
    const themeName = getFieldsValue().themeName ? getFieldsValue().themeName : '';
    const themeCode = getFieldsValue().themeCode ? getFieldsValue().themeCode : '';
    const pDuty = getFieldsValue().pDuty ? getFieldsValue().pDuty : '';
    const priority = getFieldsValue().priority ? getFieldsValue().priority : '';
    const planId = getFieldsValue().procId ? getFieldsValue().planId : '';
    const params = {
      procId,
      themeName,
      themeCode,
      pDuty,
      priority,
      planId,
    };
    const handleSubmit = () => {
      // TODO 任务查询
    };
    return (
      <div className={Styles.selectStyle}>
      <Form horizontal>
        <div>
          <Row>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="任务序号"
              >
              {getFieldDecorator('procId')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="任务标题"
                hasFeedback
              >
              {getFieldDecorator('themeName')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="任务编码"
                hasFeedback
              >
              {getFieldDecorator('themeCode')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="负责人"
                hasFeedback
              >
              {getFieldDecorator('pDuty')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="优先级"
                hasFeedback
              >
              {getFieldDecorator('priority')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="计划项序号"
                hasFeedback
              >
              {getFieldDecorator('planId')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={6} />
            <Col span={6}>
              <div className={Styles.selectButton}>查询</div>
            </Col>
          </Row>
        </div>
      </Form>
      </div>
    )
  }
}
export default Form.create()(TaskSelect);
