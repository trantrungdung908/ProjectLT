import {createSelector} from 'reselect';

import {initialState} from './reducer';

const getDataSelector = state => state.reducerProfile || initialState;
const getProfileData = () =>
  createSelector(getDataSelector, state => state.profiledata);
const loadingData = () =>
  createSelector(getDataSelector, state => state.isLoading);
const errorData = () => createSelector(getDataSelector, state => state.error);
const fetchData = () =>
  createSelector(getDataSelector, state => state.isFetech);

export {getDataSelector, getProfileData, loadingData, errorData, fetchData};
