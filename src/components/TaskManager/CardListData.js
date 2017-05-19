import React, { PropTypes } from 'react';
import Styles from './task.less';
import Card from './Card';

class CardListData extends React.PureComponent {
  static propTypes = {
    taskListCard: PropTypes.array,
  }
  showCardType() {
    const taskListCard = this.props.taskListCard;
    const view = [];
    if (taskListCard) {
      // TODO 遍历
      taskListCard.forEach((value) => {
        view.push(
          <div style={{ border: '1px solid #ccc', width: '150px', height: '50vh' }}>
            <div style={{ width: '100%', height: '30px', backgroundColor: '#eee', borderBottom: '1px solid #ccc' }}>
              {value.procType}
            </div>
            <div>{this.showCard(value.data)}</div>
          </div>
        );
      })
    }
    return view;
  }
  showCard(data) {
    const view = [];
    if (data) {
      data.forEach((value) => {
        view.push(
          <Card data={value} />
        );
      })
    }
    return view;
  }
  render () {
    return (
      <div style={{ display: 'flex', padding: '20px' }}>
        {this.showCardType()}
      </div>
    )
  }
}

export default CardListData;
