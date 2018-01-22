import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { saveAuth, saveOrdersHistory } from './middlewares';
import getInitialState from './initialState';

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = applyMiddleware(
    thunk,
    saveAuth,
    saveOrdersHistory,
  );
  return createStore(reducer, getInitialState(), composeEnhancers(middlewares));
}
