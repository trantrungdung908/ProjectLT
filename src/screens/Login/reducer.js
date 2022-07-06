import {GET_FAIL_INFO, GET_REQUEST_INFO, GET_SUCCESS_INFO} from './constant';

export const initialState = {
  infoData: [],
  loading: false,
  error: null,
};

export default function reducerInfo(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST_INFO:
      return {
        ...state,
      };
    case GET_SUCCESS_INFO:
      return {
        ...state,
        infoData: action.payload,
      };
    case GET_FAIL_INFO:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
}
