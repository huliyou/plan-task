import React, { PropTypes } from 'react';
import { Form, Input, Button, Modal, Table } from 'antd';
import * as Styles from './task.less';

const FormItem = Form.Item;

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
  title: '编号',
  dataIndex: 'procId',
  key: 'procId',
}, {
  title: '标题',
  dataIndex: 'themeName',
  key: 'themeName',
}, {
  title: '类型',
  dataIndex: 'procType',
  key: 'procType',
}, {
  title: '关联时间',
  dataIndex: 'relationTime',
  key: 'relationTime',
},{
  title: '负责人',
  dataIndex: 'pDuty',
  key: 'pDuty',
},{
  title: '流程状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
}];

class RelationTask extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    form: PropTypes.any,
    handleCancel: PropTypes.func,
    relationPlanList: PropTypes.array,
  };
  render() {
    const formItemLayout1 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const prjId = getFieldsValue().prjId ? getFieldsValue().prjId : ''; // 项目序号
    const procId = getFieldsValue().procId ? getFieldsValue().procId : ''; // 任务序号
    const rProcId = getFieldsValue().rProcId ? getFieldsValue().rProcId : ''; // 关联任务序号
    const planTitle = getFieldsValue().planTitle ? getFieldsValue().planTitle : ''; // 计划标题
    const params = {
      prjId,
      procId,
      rProcId,
      planTitle,
    };
    const handleSubmit = () => {
      // 关联任务
      this.props.handleCancel(9, {});
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
            <div className={Styles.bodyContent}>
              <div style={relationStyles.title}>添加关联任务</div>
              <FormItem
                {...formItemLayout1}
                require
                label="计划标题"
              >
              {getFieldDecorator('planTitle')(
                <Input />
              )}
              </FormItem>
              <FormItem
                {...formItemLayout1}
                require
                label="任务编号"
              >
              {getFieldDecorator('themeCode')(
                <Input />
              )}
              </FormItem>
            <div style={relationStyles.title}>已关联的任务</div>
            <div style={{ marginBottom: '20px' }}>
              <Table columns={columns} dataSource={this.props.relationPlanList} pagination={false} />
            </div>
            <div style={relationStyles.button}>
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
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(RelationTask);
