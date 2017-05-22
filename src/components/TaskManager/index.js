
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
    selectProcId: state.TaskManager.selectProcId,
    dispatch: state.dispatch,
    relationPlanList: state.TaskManager.relationPlanList,
    planInfo: state.TaskManager.planInfo,
    selectParams: state.TaskManager.selectParams,
    parentTaskList: state.TaskManager.parentTaskList,
    filesList: state.TaskManager.filesList,
    relationTaskList: state.TaskManager.relationTaskList,
    getTaskInfo: state.TaskManager.getTaskInfo,
    commentList: state.TaskManager.commentList,
    logList: state.TaskManager.logList,
  });
}
export default connect(mapStateToProps)(TaskManager);
