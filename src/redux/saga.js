import {all} from 'redux-saga/effects';
import addProjectSaga from '../screens/Manage/saga';
import ProfileSaga from '../screens/Profile/saga';
import InfoSaga from '../screens/Login/saga';

export default function* rootSaga() {
  yield all([addProjectSaga(), ProfileSaga(), InfoSaga()]);
}
