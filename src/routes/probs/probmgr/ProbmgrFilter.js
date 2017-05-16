import React, { PropTypes } from 'react'
import { Form, Button, Row, Col } from 'antd'
import { routerRedux,Link } from 'dva/router'
import { Search } from '../../../components'

const ProbmgrFilter = ({
  field,
  keyword,
  onSearch,
  onAdd,
  isMotion,
  switchIsMotion,
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'default',
    select: false,
    onSearch: (value) => {
      onSearch(value)
    },
  }
  return (
    <Row gutter={24}>
      <Col lg={6} md={12} sm={18} xs={24} style={{ marginBottom: 16 }}>
        <Search {...searchGroupProps}/>
      </Col>

      <Col lg={{ offset: 12, span: 2 }} md={12} sm={6} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="ghost" onClick={onAdd}>新建问题</Button>
      </Col>

      <Col lg={2} md={12} sm={6} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="ghost"><Link to={'/probs/pond'}>问题池</Link></Button>
      </Col>

      <Col lg={2} md={12} sm={6} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="ghost">统计分析</Button>
      </Col>
    </Row>
  )
}

ProbmgrFilter.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
}

export default Form.create()(ProbmgrFilter)
