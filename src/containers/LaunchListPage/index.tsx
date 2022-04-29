import { connect, useDispatch } from 'react-redux'
import { getLaunchesAction, addLaunchAction } from '../../actions';
import LaunchListView from '../../components/LaunchListView';
import { LaunchListState } from '../../reducers';
import { Launch, NewLaunch } from '../../types';

function mapStateToProps(state: LaunchListState) {
  return {
    launches: state.launches,
    launchError: state.launchError?.message,
  }
}

// TODO: Strongly type dispatch - this shouldn't be an any object
const mapDispatchToProps = (dispatch: any) => {
  return {
    // dispatching plain actions
    getLaunches: () => dispatch(getLaunchesAction()),
    addLaunch: (launch: NewLaunch) => dispatch(addLaunchAction(launch)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchListView)