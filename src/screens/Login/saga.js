import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_FAIL_INFO, GET_REQUEST_INFO, GET_SUCCESS_INFO} from './constant';

async function getDataInfoApi() {
  try {
    const response = await fetch(
      'https://62a16869cd2e8da9b0f0a097.mockapi.io/info',
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}
function* getDataInfo(action) {
  data = action.payload;
  try {
    const getDataInfo = yield call(getDataInfoApi);
    if (getDataInfo) {
      yield put({
        type: GET_SUCCESS_INFO,
        payload: getDataInfo,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FAIL_INFO,
    });
  }
}

function* InfoSaga() {
  yield takeEvery(GET_REQUEST_INFO, getDataInfo);
}

export default InfoSaga;
