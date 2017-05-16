import React, { PropTypes } from 'react'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, Input, Cascader, Switch } from 'antd'

const Search = Input.Search

const ColProps = {
  xs: 12,
  sm: 6,
  style: {
    marginBottom: 16,
  },
}

const SearchFilter = ({
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    console.log(fields)
    onFilterChange(fields)
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
	const { pType ,pSource ,name } = filter

	//问题类型
	const proType = [
	{
	  label: 'ALL',
	  value: 'ALL',
	  key: 'ALL',
	},
	{
	  label: '咨询',
	  value: '咨询',
	  key: '咨询',
	},
	{
	  label: 'BUG',
	  value: 'BUG',
	  key: 'BUG',
	},
	{
	  label: '投诉',
	  value: '投诉',
	  key: '投诉',
	},
	{
	  label: '需求',
	  value: '需求',
	  key: '需求',
	},
	];

	//问题来源
	const proSource = [
	{
	  label: '问题状态',
	  value: '问题状态',
	  key: '问题状态',
	},
	{
	  label: '处理人',
	  value: '处理人',
	  key: '处理人',
	},
	];


  return (
    <Row>
      <Col span={1}>类型</Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
        {getFieldDecorator('pType', { initialValue: pType })(
          <Cascader
            size="small"
            style={{ width: 120 }}
            options={proType}
            placeholder='ALL'
            onChange={handleChange.bind(null, 'pType')}
          />)}
      </Col>
      <Col span={1}>来源</Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
        {getFieldDecorator('pSource', { initialValue: pSource })(
          <Cascader
            size="small"
            style={{ width: 120 }}
            options={proSource}
            placeholder="问题状态"
            onChange={handleChange.bind(null, 'pSource')}
          />)}
      </Col>
      <Col span={1}>关键字</Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
		{getFieldDecorator('name', { initialValue: name })(
		  <Search 
			size="small"
			style={{ width: 120 }}
			placeholder="支持回车查询" 
			onSearch={handleSubmit}
		  />)}
      </Col>
      <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
           <Button type="primary" size="small" onClick={handleSubmit}>查询</Button>
      </Col>
    </Row>
  )
}

SearchFilter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(SearchFilter)
