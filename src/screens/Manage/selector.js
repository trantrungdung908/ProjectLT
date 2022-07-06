import {createSelector} from 'reselect';

import {initialState} from './reducer';

const getDataSelector = state => state.reducerManage || initialState;
const getDataState = () => createSelector(getDataSelector, state => state.data);
const loadingData = () =>
  createSelector(getDataSelector, state => state.loading);
const errorData = () => createSelector(getDataSelector, state => state.error);
const deleteData = () => createSelector(getDataSelector, state => state.delete);
const fetchData = () =>
  createSelector(getDataSelector, state => state.isFetech);

export {
  getDataSelector,
  getDataState,
  loadingData,
  errorData,
  deleteData,
  fetchData,
};
