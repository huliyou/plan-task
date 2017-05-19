import React, { PropTypes } from 'react';
import Styles from './task.less';

class Card extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    const data = this.props.data;
    return (
      <div style={{ border: '1px solid #ccc', width: '120px', height: '120px',
      margin: '10px 0 5px 10px' }}>
        <div>{data.procId}</div>
        <div>{data.planName}</div>
        <div>{data.createTime}</div>
        <div>{data.pDuty}</div>
      </div>
    )
  }
}

export default Card;
