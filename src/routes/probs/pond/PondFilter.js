import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Switch } from 'antd'
import { Search } from '../../../components'

const CommFilter = ({
  field,
  keyword,
  onSearch,
  onAdd,
  onOutPool,
  isMotion,
  switchIsMotion,
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'probTitle', name: '标题' }],
    selectProps: {
      defaultValue: field || 'probTitle',
    },
    onSearch: (value) => {
      onSearch(value)
    },
  }
  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
        <Search {...searchGroupProps}/>
      </Col>
      <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button size="large" type="ghost" onClick={onAdd}>新建问题</Button>
      </Col>
    </Row>
  )
}

CommFilter.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
}

export default Form.create()(CommFilter)
