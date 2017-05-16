import { connect } from 'dva'
import MyDuty from './MyDuty';
function mapStateToProps(state) {
  // !!!: 绑定Modal的这两部分数据
  return ({
    searchData: state.MyDuty.searchData,
    tasks: state.MyDuty.tasks,
  });
}
export default connect(mapStateToProps)(MyDuty);
