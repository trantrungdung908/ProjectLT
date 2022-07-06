import moment from 'moment';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  DELETE_FAIL,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  PUT_DATA_FAIL,
  PUT_DATA_REQUEST,
  PUT_DATA_SUCCESS,
  POST_DATA_FAIL,
  POST_DATA_REQUEST,
  POST_DATA_SUCCESS,
} from './constant';

var data = {};
var date = {};
var gender = {};
async function getDataProjectApi() {
  try {
    const response = await fetch(
      'https://62a16869cd2e8da9b0f0a097.mockapi.io/users',
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}

async function deleteDataProjectApi(id) {
  try {
    const response = await fetch(
      `https://62a16869cd2e8da9b0f0a097.mockapi.io/users/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    const responseJson = await response.json();
    // console.log('RES' + JSON.stringify(responseJson));
    return responseJson;
  } catch (error) {
    throw error;
  }
}

async function putDataProjectApi(data, date, gender) {
  try {
    const response = await fetch(
      `https://62a16869cd2e8da9b0f0a097.mockapi.io/users/${data.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          birthday: moment(date).toDate().valueOf(),
          gender: gender,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    const responseJson = await response.json();
    console.log('RES', responseJson);
    return responseJson;
  } catch (error) {
    throw error;
  }
}
async function postDataProjectApi(data, date, gender) {
  console.log('postData', data);

  try {
    const response = await fetch(
      `https://62a16869cd2e8da9b0f0a097.mockapi.io/users`,
      {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          birthday: moment(date).toDate().valueOf(),
          gender: gender,
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
function* getDataProject(action) {
  data = action.payload;
  try {
    const getProjectData = yield call(getDataProjectApi);
    if (getProjectData) {
      yield put({
        type: GET_DATA_SUCCESS,
        payload: getProjectData,
      });
    }
  } catch (error) {
    yield put({
      type: GET_DATA_FAIL,
    });
  }
}
function* deleteDataProject(action) {
  data = action.payload;
  id = action.id;
  try {
    const deleteData = yield call(deleteDataProjectApi, id);
    if (deleteData) {
      yield put({
        type: DELETE_SUCCESS,
        payload: deleteData,
      });
    }
  } catch (error) {
    yield put({
      type: DELETE_FAIL,
    });
  }
}
function* putDataProject(action) {
  data = action.data;
  date = action.date;
  gender = action.gender;
  try {
    const putData = yield call(putDataProjectApi, data, date, gender);
    if (putData) {
      yield put({
        type: PUT_DATA_SUCCESS,
        payload: putData,
      });
    }
  } catch (error) {
    yield put({
      type: PUT_DATA_FAIL,
    });
  }
}
function* postDataProject(action) {
  data = action.data;
  date = action.date;
  gender = action.gender;
  try {
    const postData = yield call(postDataProjectApi, data, date, gender);

    if (postData) {
      yield put({
        type: POST_DATA_SUCCESS,
        payload: postData,
      });
    }
  } catch (error) {
    yield put({
      type: POST_DATA_FAIL,
    });
  }
}
function* addProjectSaga() {
  yield takeEvery(GET_DATA_REQUEST, getDataProject);
  yield takeEvery(DELETE_REQUEST, deleteDataProject);
  yield takeEvery(PUT_DATA_REQUEST, putDataProject);
  yield takeEvery(POST_DATA_REQUEST, postDataProject);
}

export default addProjectSaga;
