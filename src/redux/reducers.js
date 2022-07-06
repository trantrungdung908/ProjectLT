import {combineReducers} from 'redux';

import reducerManage from '../screens/Manage/reducer';
import reducerProfile from '../screens/Profile/reducer';
import reducerInfo from '../screens/Login/reducer';

const RootReducer = combineReducers({
  reducerManage: reducerManage,
  reducerProfile: reducerProfile,
  reducerInfo: reducerInfo,
});

export default RootReducer;
