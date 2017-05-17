
import { connect } from 'dva'
import TaskManager from './TaskManager';

function mapStateToProps(state) {
  // !!!: 绑定Modal的这两部分数据
  return ({
    // searchData: state.MyDuty.searchData,
    // tasks: state.MyDuty.tasks,
  });
}
export default connect(mapStateToProps)(TaskManager);
