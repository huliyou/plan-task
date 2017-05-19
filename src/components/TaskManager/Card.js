import React, { PropTypes } from 'react';
import Styles from './task.less';

class Card extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    color: PropTypes.string,
  }

  render () {
    const data = this.props.data;
    return (
      <div style={{ width: '180px', height: '120px', fontSize: '13px',
        margin: '10px 0 5px 10px', border: `1px solid ${this.props.color}` }}>
        <div style={{
          width: '100%', height: '25px', backgroundColor: `${this.props.color}`,
          color: '#fff', paddingRight: '5px', fontSize: '15px', lineHeight: '25px',
        }}>&nbsp;&nbsp;#{data.procId}</div>
        <div style={{ margin: '10px', fontWeight: 'bold' }}>
          <div style={{ height: '40px' }}>{data.planName}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{data.createTime}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{data.pDuty}</div>
        </div>
      </div>
    )
  }
}

export default Card;
