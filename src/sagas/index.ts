import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { getLaunchesRequest, addLaunchRequest } from '../api/index'
import { getLaunchesFailedAction, receivedLaunchesAction } from '../actions';
import { ResponseGenerator, Launch } from '../types';

function* getLaunches(action: any) {
    try {
        // TODO strongly type this
       const json = yield call(getLaunchesRequest); 
       let formattedLaunchList: Launch[] = [];
       json.forEach((launchRaw: any) => formattedLaunchList.push({ launch_image: launchRaw.links.mission_patch_small, details: launchRaw.details, mission_name: launchRaw.mission_name }));
       yield put(receivedLaunchesAction(formattedLaunchList));
    } catch (e: any) {
        console.log(e);
       yield put(getLaunchesFailedAction(e));
    }
}

function* addLaunch(action: any) {
    // this should call a POST endpoint that will add the launch, and then return the list
}

function* watchGetLaunches() {
    yield takeLatest('GET_LAUNCHES', getLaunches);
}

function* watchAddLaunch() {
    yield takeLatest('ADD_LAUNCH', addLaunch);
}

export default function* rootSaga() {
    yield all([
        watchGetLaunches(),
        watchAddLaunch(),
    ]);
 }