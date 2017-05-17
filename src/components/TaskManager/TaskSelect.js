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
    const params = {
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
      <div className={Styles.selectStyle}>
      <Form horizontal>
        <div>
          <Row>
            <Col span={7}>
              <FormItem
                {...formItemLayout}
                label="类型"
              >
              {getFieldDecorator('title')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={7}>
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
            <Col span={7}>
              <FormItem
                {...formItemLayout}
                label="关键字"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={3}>
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
