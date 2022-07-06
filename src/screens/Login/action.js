import {GET_FAIL_INFO, GET_REQUEST_INFO, GET_SUCCESS_INFO} from './constant';
export const getInfoRequest = () => {
  return {
    type: GET_REQUEST_INFO,
  };
};

export const getInfoSuccess = () => {
  return {
    type: GET_SUCCESS_INFO,
  };
};

export const getInfoFail = () => {
  return {
    type: GET_FAIL_INFO,
  };
};
