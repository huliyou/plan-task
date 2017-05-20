/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Button, DatePicker, Modal } from 'antd';
import * as Styles from './task.less';
import moment from 'moment';

const FormItem = Form.Item;

class CreateChildPlan extends React.PureComponent {
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
    const themeName = getFieldsValue().themeName ? getFieldsValue().themeName : '';
    const planBeginDate = getFieldsValue().planBeginDate ? moment(getFieldsValue().planBeginDate).format('YYYY-MM-DD') : '';
    const planEndDate = getFieldsValue().planEndDate ? moment(getFieldsValue().planEndDate).format('YYYY-MM-DD') : '';
    const parentPlanCode = getFieldsValue().parentPlanCode ? getFieldsValue().parentPlanCode : '';
    const planWorkload = getFieldsValue().planWorkload ? getFieldsValue().planWorkload : '';
    const planDesc = getFieldsValue().planDesc ? getFieldsValue().planDesc : '';

    const params = {
      themeName,
      planBeginDate,
      planEndDate,
      parentPlanCode,
      planWorkload,
      planDesc,
    };
    const handleSubmit = () => {
      this.props.handleOk(1, params)
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
            <Col span={23}>新建子任务</Col>
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
                  type="text"
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
                  type="text"
                />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem
              {...formItemLayout1}
              label="计划描述"
            >
            {getFieldDecorator('planDesc')(
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
export default Form.create()(CreateChildPlan);
