import {
  GET_FAIL,
  GET_REQUEST,
  GET_SUCCESS,
  REMOVE_DATA,
  PUT_FAIL,
  PUT_REQUEST,
  PUT_SUCCESS,
} from './constant';

export const putRequest = (data, date) => {
  return {
    type: PUT_REQUEST,
    data,
    date,
  };
};
export const putSuccess = () => {
  return {
    type: PUT_SUCCESS,
  };
};
export const putFail = () => {
  return {
    type: PUT_FAIL,
  };
};

export const getData = () => {
  return {
    type: GET_REQUEST,
  };
};

export const getDataSuccess = () => {
  return {
    type: GET_SUCCESS,
  };
};

export const getDataFail = () => {
  return {
    type: GET_FAIL,
  };
};

export const removeData = () => {
  return {
    type: REMOVE_DATA,
  };
};
