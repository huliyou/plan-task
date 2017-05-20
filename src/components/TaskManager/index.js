
import { connect } from 'dva'
import TaskManager from './TaskManager';

function mapStateToProps(state) {
  // !!!: 绑定Modal的这两部分数据
  return ({
    planItems: state.TaskManager.planItems,
    taskListCard: state.TaskManager.taskListCard,
    taskList: state.TaskManager.taskList,
    taskMenu: state.TaskManager.taskMenu,
    taskCardData: state.TaskManager.taskCardData,
  });
}
export default connect(mapStateToProps)(TaskManager);
