/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';
import * as Styles from './task.less';

const FormItem = Form.Item;
const Option = Select.Option;

class CreatePlan extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    visible: PropTypes.bool,
    form: PropTypes.any,
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
            <Col span={23}>新建任务</Col>
          </Row>
        </div>
        <div className={Styles.bodyContent}>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="项目"
              >
              {getFieldDecorator('prjId')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="类型"
              >
              {getFieldDecorator('themeName')(
                <Input />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem
              {...formItemLayout1}
              label="标题"
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
              >
              {getFieldDecorator('pDuty')(
                <Input />
              )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="所属项目"
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
export default Form.create()(CreatePlan);
