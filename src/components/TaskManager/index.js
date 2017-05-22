
import { connect } from 'dva'
import TaskManager from './TaskManager';

function mapStateToProps(state) {
  return ({
    planItems: state.TaskManager.planItems,
    taskListCard: state.TaskManager.taskListCard,
    taskList: state.TaskManager.taskList,
    taskMenu: state.TaskManager.taskMenu,
    taskCardData: state.TaskManager.taskCardData,
    selectPlanId: state.TaskManager.selectPlanId,
    dispatch: state.dispatch,
    relationPlanList: state.TaskManager.relationPlanList,
    planInfo: state.TaskManager.planInfo,
  });
}
export default connect(mapStateToProps)(TaskManager);
