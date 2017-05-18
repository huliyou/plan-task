import React, { PropTypes } from 'react';
import Styles from './task.less';

class CardListData extends React.PureComponent {
  static propTypes = {
    taskList: PropTypes.array,
  }
  render () {
    return (
      <div>
        card
      </div>
    )
  }
}

export default CardListData;
