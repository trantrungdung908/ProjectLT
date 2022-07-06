import {createSelector} from 'reselect';

import {initialState} from './reducer';

const getDataSelector = state => state.reducerInfo || initialState;
const getInfoData = () =>
  createSelector(getDataSelector, state => state.infoData);
const loadingData = () =>
  createSelector(getDataSelector, state => state.loading);
export {getDataSelector, getInfoData, loadingData};
