/**
 * 评论框标签页
 *
 * @createAt 2017-05-06
 */

import React,{PropTypes} from 'react';
import CommentTab from './CommentTab';


const styles = {
    commentTabBar : {
        marginLeft:10,
        marginRight:10,
        borderBottomWidth: 1,
        borderBottomColor: '#e8edf2',
    },
    li : {
        display: 'inline-block',
        minWidth: 100,
        color: 'gray',
    },
    active : {
        display: 'inline-block',
        minWidth: 100,
        color: 'red',
    },
    last_child : {
        float: 'right',
        textAlign: 'right',
    }
};

class CommentTabs extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            tabs : [],
            active : null
        };
    }

    addTab(ele){
        this.state.tabs.push(ele);
        const tabs = this.state.tabs;
        this.setState({
            tabs
        });
    }

    setActive(index){
        this.setState({
            active : index
        });
    }

    render(){
        return(
            <div>
                <ul style={ styles.commentTabBar }>
                    {
                        this.state.tabs.map((tab,i)=><li style={this.state.active === i ? styles.active : styles.li } key={'commentTab_'+i}>{tab}</li>)
                    }
                    <li style={ styles.last_child }>{ this.props.rightText }</li>
                </ul>
                <div>
                {
                    React.Children.map(this.props.children, (child,index) => {
                        return React.cloneElement(child, {
                            //赋值Prop给每个子组件
                            addTab: this.addTab.bind(this),
                            setActive : this.setActive.bind(this),
                            active : this.state.active,
                            index,
                        });
                    })
                }
                </div>
            </div>
        );
    }
}



export {
    CommentTabs,
    CommentTab
};


