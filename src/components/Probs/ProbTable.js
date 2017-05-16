
import React, {PropTypes} from 'react';
import {Table} from 'antd'
class ProbTable extends React.Component{
    static get propTypes(){
        return {
            //dataSource : PropTypes.arry.isRequired
        };
    }

    render(){
        const { dataSource,tableColums } = this.props;

        /**
         * 这里应该都看得懂了吧 <img className="avatar" src={data.avatar} alt="" />
         * dataSource 流到这里就是终点了，其每一项会都被渲染到页面上
         * 因为数据与视图是绑定的，dataSource如果有改变，页面上的内容也会立即改变
         */
        return(
             <Table columns={tableColums} dataSource={dataSource} />
        );
    }
}

export default ProbTable;





