/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
import * as Styles from './task.less';

const FormItem = Form.Item;

class CreateChildPlan extends React.PureComponent {
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
      idArr: this.props.idArr,
      creatorId: this.props.userId,
      sendall: this.props.getValue('SendGroupReducer/sendChecked'),
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
            <Col span={23}>新建子任务</Col>
          </Row>
        </div>
        <div className={Styles.bodyContent}>
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
                label="开始时间"
                hasFeedback
              >
              {getFieldDecorator('title')(
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
              {getFieldDecorator('title')(
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
              {getFieldDecorator('title')(
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
              {getFieldDecorator('title')(
                <Input
                  placeholder="输入标题"
                  type="text"
                  autoComplete="off"
                />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
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
          </Row>
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
export default Form.create()(CreateChildPlan);
