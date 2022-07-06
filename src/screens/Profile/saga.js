import moment from 'moment';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAIL,
  PUT_FAIL,
  PUT_REQUEST,
  PUT_SUCCESS,
} from './constant';

var data = {};
var date = {};
async function getDataProjectApi() {
  try {
    const response = await fetch(
      'https://62a16869cd2e8da9b0f0a097.mockapi.io/profile',
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}
function* getDataProject(action) {
  data = action.payload;
  try {
    const getProjectData = yield call(getDataProjectApi);
    if (getProjectData) {
      yield put({
        type: GET_SUCCESS,
        payload: getProjectData,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FAIL,
    });
  }
}

async function putDataProfileApi(data, date) {
  try {
    const response = await fetch(
      `https://62a16869cd2e8da9b0f0a097.mockapi.io/profile/${data.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          // ...date,
          birthday: moment(date).toDate().valueOf(),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}
function* putDataProfile(action) {
  data = action.data;
  date = action.date;
  try {
    const putProfile = yield call(putDataProfileApi, data, date);
    if (putProfile) {
      yield put({
        type: PUT_SUCCESS,
        payload: putProfile,
      });
    }
  } catch (error) {
    yield put({
      type: PUT_FAIL,
    });
  }
}
function* ProfileSaga() {
  yield takeEvery(GET_REQUEST, getDataProject);
  yield takeEvery(PUT_REQUEST, putDataProfile);
}

export default ProfileSaga;
