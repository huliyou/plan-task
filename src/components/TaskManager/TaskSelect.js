/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Select, Row, Col, DatePicker } from 'antd';
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
      wrapperCol: { span: 14 },
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
      <div style={{ height: '60px', backgroundColor: '#fff', width: '100%' }}>
      <Form horizontal>
        <div className={Styles.bodyContent}>
          <Row>
          { /*<Col span={6}>
              <FormItem
                {...formItemLayout}
                label="类型"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Select
                  // showSearch
                  // filterOption={false}
                  // optionFilterProp="children"
                  // notFoundContent="无匹配项"
                  // onSearch={(value) => {
                  //   // TODO 搜索接口
                  // }}
                  onSelect={() => {}}
                >
                  <Option>选项</Option>
                </Select>
              )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="负责人"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Select showSearch
                  filterOption={false}
                  optionFilterProp="children"
                  notFoundContent="无匹配项"
                  onSearch={(value) => {
                    // TODO 搜索接口
                  }}
                  onSelect={() => {}}
                >
                  <Option>选项</Option>
                </Select>
              )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="关键字"
                hasFeedback
              >
              {getFieldDecorator('title')(
                <Select showSearch
                  filterOption={false}
                  optionFilterProp="children"
                  notFoundContent="无匹配项"
                  onSearch={(value) => {
                    // TODO 搜索接口
                  }}
                  onSelect={() => {}}
                >
                  <Option>选项</Option>
                </Select>
              )}
              </FormItem>
            </Col> */}
            <Col span={6}>
              <div>查询</div>
            </Col>
          </Row>
        </div>
      </Form>
      </div>
    )
  }
}
export default Form.create()(TaskSelect);
