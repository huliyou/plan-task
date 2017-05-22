
import { connect } from 'dva'
import TaskManager from './TaskManager';

function mapStateToProps(state) {
  {console.log('procId', state.TaskManager.selectProcId)}
  return ({
    planItems: state.TaskManager.planItems,
    taskListCard: state.TaskManager.taskListCard,
    taskList: state.TaskManager.taskList,
    taskMenu: state.TaskManager.taskMenu,
    taskCardData: state.TaskManager.taskCardData,
    selectPlanId: state.TaskManager.selectPlanId,
    selectProcId: state.TaskManager.selectProcId,
    dispatch: state.dispatch,
    relationPlanList: state.TaskManager.relationPlanList,
    planInfo: state.TaskManager.planInfo,
    selectParams: state.TaskManager.selectParams,
    parentTaskList: state.TaskManager.parentTaskList,
    filesList: state.TaskManager.filesList,
    relationTaskList: state.TaskManager.relationTaskList,
    planInfo: state.TaskManager.planInfo,
  });
}
export default connect(mapStateToProps)(TaskManager);
