import {removeData} from '../Profile/action';
import {
  GET_DATA_FAIL,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  DELETE_FAIL,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  PUT_DATA_FAIL,
  PUT_DATA_REQUEST,
  PUT_DATA_SUCCESS,
  POST_DATA_FAIL,
  POST_DATA_REQUEST,
  POST_DATA_SUCCESS,
  REMOVE_DATA,
} from './constant';

export function getData() {
  return {
    type: GET_DATA_REQUEST,
  };
}

export function getDataSuccess() {
  return {
    type: GET_DATA_SUCCESS,
  };
}

export function getDataFail() {
  return {
    type: GET_DATA_FAIL,
  };
}

export function deleteDataRequest(id) {
  return {
    type: DELETE_REQUEST,
    id,
  };
}
export function deleteDataSuccess(id) {
  return {
    type: DELETE_SUCCESS,
    id,
  };
}
export function deleteDataFail() {
  return {
    type: DELETE_FAIL,
  };
}

export function putDataRequest(data, date, gender) {
  return {
    type: PUT_DATA_REQUEST,
    data,
    date,
    gender,
  };
}
export function putDataSucces() {
  return {
    type: PUT_DATA_SUCCESS,
  };
}
export function putDataFail() {
  return {
    type: PUT_DATA_FAIL,
  };
}

export function remove() {
  return {
    type: REMOVE_DATA,
  };
}

export function postDataRequest(data, date, gender) {
  return {
    type: POST_DATA_REQUEST,
    data,
    date,
    gender,
  };
}
export function postDataSucces() {
  return {
    type: POST_DATA_SUCCESS,
  };
}
export function postDataFail() {
  return {
    type: POST_DATA_FAIL,
  };
}
