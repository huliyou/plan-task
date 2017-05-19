import React, { PropTypes } from 'react';
import Styles from './task.less';
import Card from './Card';

const cardStyles = ({
  cardList: {
    border: '1px solid #ccc', width: '200px', height: '55vh',
  },
  cardListHeader: {
    width: '100%', height: '35px', backgroundColor: '#EAEDF3',
    borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-around',
    alignItems: 'center', fontSize: '15px',
  },
  cardNum: {
    width: '50px',
    height: '20px',
    borderRadius: '20px',
    color: '#fff',
    backgroundColor: '#DD9222',
    textAlign: 'center',
    lineHeight: '20px',
  },
  cardBody: {
    height: '50vh',
    overflow: 'scroll'
  }
});

const typeColor = {
  设计: '#80E6BD',
  需求: '#E6BD1A',
  开发: '#2B91D5',
  测试: '#D88F7D',
  交付: '#BB8ADC',
  验收: '#7EB57E',
};

class CardListData extends React.PureComponent {
  static propTypes = {
    taskListCard: PropTypes.array,
  }
  showCardType() {
    const taskListCard = this.props.taskListCard;
    const view = [];
    if (taskListCard) {
      taskListCard.forEach((value) => {
        const color = typeColor[value.procType];
        view.push(
          <div style={cardStyles.cardList}>
            <div style={cardStyles.cardListHeader}>
              <div>{value.procType}</div>
              <div style={cardStyles.cardNum}>{value.data.length}</div>
            </div>
            <div style={cardStyles.cardBody}>{this.showCard(value.data, color)}</div>
          </div>
        );
      })
    }
    return view;
  }
  showCard(data, color) {
    const view = [];
    if (data) {
      data.forEach((value) => {
        view.push(
          <Card
            data={value}
            color={color}
          />
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
