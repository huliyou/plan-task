/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import * as Styles from './task.less';

const FormItem = Form.Item;
const Option = Select.Option;

class CreatePlan extends React.PureComponent {
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
    const title = getFieldsValue().title ? getFieldsValue().title : '';
    const content = getFieldsValue().content ? getFieldsValue().content : '';
    const doctorName = getFieldsValue().doctorName ? getFieldsValue().doctorName : '';
    const remark = getFieldsValue().remarks ? getFieldsValue().remarks : '';
    const params = {
      title,
      content,
      doctorName,
      remark,
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
            <Col span={23}>新建任务</Col>
          </Row>
        </div>
        <div className={Styles.bodyContent}>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="项目"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="类型"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem
              {...formItemLayout1}
              label="标题"
              hasFeedback
            >
            {getFieldDecorator('title')(
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
                label="负责人"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="所属项目"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
        </div>
        <div className={Styles.bottomText}>
          默认邮件通知报告人和负责人
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
export default Form.create()(CreatePlan);
