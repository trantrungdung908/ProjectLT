import {
  GET_FAIL,
  GET_SUCCESS,
  GET_REQUEST,
  REMOVE_DATA,
  PUT_FAIL,
  PUT_REQUEST,
  PUT_SUCCESS,
} from './constant';

export const initialState = {
  profiledata: [],
  isLoading: false,
  error: null,
  isFetech: false,
};

export default function reducerProfile(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        isFetech: true,
      };
    case GET_SUCCESS:
      return {
        ...state,
        profiledata: action.payload,
        isLoading: false,
        isFetech: false,
      };
    case GET_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false,
        isFetech: false,
      };

    case REMOVE_DATA:
      return {
        ...state,
        error: null,
        isLoading: null,
      };
    case PUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PUT_SUCCESS:
      return {
        ...state,
        profiledata: action.payload,
        isLoading: false,
        error: false,
      };
    case PUT_FAIL:
      return {
        ...state,
        error: true,
        isLoading: false,
      };

    default:
      return state;
  }
}
