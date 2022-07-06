import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import rootSaga from './saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = compose(applyMiddleware(sagaMiddleware))(createStore)(
  rootReducer,
);

sagaMiddleware.run(rootSaga);

export default configureStore;
