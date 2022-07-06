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

export const initialState = {
  data: [],
  loading: false,
  error: null,
  delete: null,
};
export default function reducerManage(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        // loading: true,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        // loading: false,
      };

    case GET_DATA_FAIL:
      return {
        ...state,
        error: true,
        // loading: false,
      };

    case DELETE_REQUEST:
      return {
        ...state,
        delete: true,
        // loading: true,
      };
    case DELETE_SUCCESS:
      const newState = state.filter(dataId => dataId.id !== action.payload.id);
      return {
        ...state,
        data: newState,
        delete: false,
        // loading: false,
      };
    case DELETE_FAIL:
      return {
        ...state,
        error: true,
        delete: false,
        // loading: false,
      };

    case PUT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PUT_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case PUT_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case REMOVE_DATA:
      return {
        ...state,
        error: null,
      };

    case POST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case POST_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
