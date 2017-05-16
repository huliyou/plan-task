/**
 * 评论框标签页项
 *
 * @createAt 2017-05-06
 */

import React from 'react';

class CommentTab extends React.Component{

    constructor(props){
        super(props);

        this.state = {

        };
    }

    _onClick(){
        const active = this.props.active === this.props.index ? null : this.props.index;
        this.props.setActive(active);
    }

    componentDidMount(){
        this.props.addTab(<div style={{cursor:'pointer'}} onClick={this._onClick.bind(this)}>{this.props.title}</div>);
    }

    render(){
        return(
            <div style={{
                display : this.props.active === this.props.index ? 'block' : 'none',
            }}>
                { this.props.children }
            </div>
        );
    }

}

export default CommentTab;


